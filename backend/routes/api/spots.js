const express = require("express");
const { Op } = require("sequelize");
const {
   Spot,
   SpotImage,
   Review,
   User,
   ReviewImage,
   Booking,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {
   reviewAvg,
   reviewAvgObj,
   validateNewSpot,
   addPreview,
   validateReviews,
} = require("./helpersApi");

const router = express.Router();

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
   const id = parseInt(req.user.dataValues.id);
   const spotId = parseInt(req.params.spotId);

   const owner = await Booking.findAll({
      where: {
         spotId,
      },
      include: {
         model: User,
         attributes: ["id", "firstName", "lastName"],
      },
   });

   const nonOwner = await Booking.findAll({
      where: {
         spotId,
      },
      attributes: ["spotId", "startDate", "endDate"],
   });

   let finalObj = {};
   if (owner.length < 1) {
      res.status(404);
      res.json({
         message: "Spot could not be found",
      });
   } else {
      if (id === owner[0].userId) {
         finalObj.Bookings = owner;
         res.json(finalObj);
      } else {
         finalObj.Bookings = nonOwner;
         res.json(finalObj);
      }
   }
});

router.get("/", async (req, res) => {
   let { page, size } = req.query;

   if (page < 1 && size < 1) {
      res.status(400);
      res.json({
         message: "Bad Request",
         errors: {
            page: "Page must be greater than or equal to 1",
            size: "Size must be greater than or equal to 1",
         },
      });
      return;
   } else if (page < 1) {
      res.status(400);
      res.json({
         message: "Bad Request",
         errors: {
            page: "Page must be greater than or equal to 1",
         },
      });
      return;
   } else if (size < 1) {
      res.status(400);
      res.json({
         message: "Bad Request",
         errors: {
            size: "Size must be greater than or equal to 1",
         },
      });
      return;
   }

   if (!page) page = 1;
   if (!size) size = 20;
   page = parseInt(page);
   size = parseInt(size);

   if (page > 10) page = 10;
   if (size > 20) size = 20;

   const pagination = {};
   if (page >= 1 && size >= 1) {
      pagination.limit = size;
      pagination.offset = size * (page - 1);
   }

   spotsArr = await Spot.findAll({
      include: [
         {
            model: SpotImage,
         },
         {
            model: Review,
         },
      ],
      ...pagination,
   });

   const afterReview = reviewAvg(spotsArr);

   let finalObj = {};
   let jsonSpots = addPreview(afterReview);

   finalObj.Spots = jsonSpots;
   finalObj.page = page;
   finalObj.size = size;

   res.json(finalObj);
});

router.post("/", requireAuth, validateNewSpot, async (req, res) => {
   const id = req.user.dataValues.id;
   const { address, city, state, country, name, description, price } = req.body;

   const newSpot = await Spot.create({
      ownerId: id,
      address,
      city,
      state,
      country,
      name,
      description,
      price,
   });

   res.status(201);
   res.json(newSpot);
});

router.get("/current", requireAuth, async (req, res, next) => {
   const id = req.user.dataValues.id;

   const spotsArr = await Spot.findAll({
      where: {
         ownerId: id,
      },
      include: [
         {
            model: SpotImage,
         },
         {
            model: Review,
         },
      ],
   });

   const afterReview = reviewAvg(spotsArr);

   const jsonSpots = addPreview(afterReview);

   finalObj = {};
   finalObj.Spots = jsonSpots;

   res.json(finalObj);
});

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
   const { url, preview } = req.body;
   const id = parseInt(req.user.dataValues.id);
   const spotId = parseInt(req.params.spotId);

   console.log(req.params.spotId);
   console.log("is spotId working right?", spotId);
   const addToSpot = await Spot.findByPk(spotId, {
      include: {
         model: SpotImage,
      },
   });

   if (!addToSpot) {
      res.status(404);
      res.json({
         message: "Spot could not be found",
      });
   } else {
      if (id !== addToSpot.ownerId) {
         res.status(401);
         res.json({
            message: "Unauthorized. Spot does not belong to current user.",
         });
      } else {
         const jsonSpot = addToSpot.toJSON();
         const newImage = SpotImage.create({
            spotId,
            url,
            preview,
         });

         jsonSpot.SpotImages.push(newImage);

         let toSend = jsonSpot.SpotImages;
         let lastAdded = await toSend[toSend.length - 1];
         const finalJSON = lastAdded.toJSON();

         res.json({
            id: finalJSON.id,
            url: finalJSON.url,
            preview: finalJSON.preview,
         });
      }
   }
});

router.put("/:spotId", requireAuth, validateNewSpot, async (req, res) => {
   const spotId = parseInt(req.params.spotId);
   const id = parseInt(req.user.dataValues.id);
   const { address, city, state, country, name, description, price } = req.body;

   const spotToEdit = await Spot.findByPk(spotId);

   if (!spotToEdit) {
      res.json({
         message: "Spot could not be found",
      });
   } else {
      if (spotToEdit.ownerId !== id) {
         res.status(401);
         res.json({
            message: "Unauthorized. Spot does not belong to current user.",
         });
      } else {
         spotToEdit.set({
            address,
            city,
            state,
            country,
            name,
            description,
            price,
         });

         spotToEdit.save();
         res.json(spotToEdit);
      }
   }
});

router.get("/:spotId", requireAuth, async (req, res) => {
   const spotId = parseInt(req.params.spotId);

   const detailsSpot = await Spot.findByPk(spotId, {
      include: [
         {
            model: Review,
         },
         {
            model: SpotImage,
            attributes: ["id", "url", "preview"],
         },
         {
            model: User,
            as: "Owner",
            attributes: ["id", "firstName", "lastName"],
         },
      ],
   });

   if (!detailsSpot) {
      res.status(404);
      res.json({
         message: "Spot could not be found",
      });
   } else {
      const jsonSpots = reviewAvgObj(detailsSpot);
      res.json(jsonSpots[0]);
   }
});

router.delete("/:spotId", requireAuth, async (req, res) => {
   const spotId = parseInt(req.params.spotId);
   const id = parseInt(req.user.dataValues.id);

   const toDelete = await Spot.findByPk(spotId);

   if (!toDelete) {
      res.status(404);
      res.json({
         message: "Spot could not be found",
      });
   } else {
      if (toDelete.ownerId !== id) {
         res.status(401);
         res.json({
            message: "Unauthorized. Spot does not belong to current user.",
         });
      } else {
         await toDelete.destroy();
         res.json({
            message: "Successfully deleted",
         });
      }
   }
});

router.get("/:spotId/reviews", async (req, res) => {
   const spotId = req.params.spotId;

   const doesSpotExist = await Spot.findByPk(spotId);

   if (!doesSpotExist) {
      res.status(404);
      res.json({
         message: "Spot could not be found",
      });
   }

   const reviewsForSpotArr = await Review.findAll({
      where: {
         spotId,
      },
      include: [
         {
            model: User,
            attributes: ["id", "firstName", "lastName"],
         },
         {
            model: ReviewImage,
            attributes: ["id", "url"],
         },
      ],
   });

   let finalObj = {};
   finalObj.Reviews = reviewsForSpotArr;
   res.json(finalObj);
});

router.post(
   "/:spotId/reviews",
   requireAuth,
   validateReviews,
   async (req, res) => {
      const spotId = parseInt(req.params.spotId);
      const id = parseInt(req.user.dataValues.id);
      const { review, stars } = req.body;
      const user = await User.findByPk(id);

      const confirmSpot = await Spot.findByPk(spotId);

      if (!confirmSpot) {
         res.status(404);
         res.json({
            message: "Spot could not be found",
         });
      } else {
         const currReviewsOfSpot = await Review.findAll({
            where: {
               spotId,
               userId: id,
            },
         });

         if (currReviewsOfSpot.length > 0) {
            res.status(500);
            res.json({
               message: "User already has a review for this spot",
            });
         } else {
            const newReview = await Review.create({
               spotId,
               userId: id,
               review,
               stars,
            });

            newReview.User = user;

            res.json(newReview);
         }
      }
   }
);

router.post("/:spotId/bookings", requireAuth, async (req, res) => {
   const spotId = parseInt(req.params.spotId);
   const id = parseInt(req.user.dataValues.id);
   const { startDate, endDate } = req.body;

   const start = new Date(startDate).getTime();
   const end = new Date(endDate).getTime();

   const findSpot = await Spot.findByPk(spotId);

   if (!findSpot) {
      res.status(404);
      res.json({
         message: "Spot could not be found",
      });
      return;
   }

   findSpot.toJSON();

   if (findSpot.ownerId === id) {
      res.status(401);
      res.json({
         message: "Spot must NOT belong to the current user",
      });
      return;
   }

   if (end <= start) {
      res.status(400);
      res.json({
         message: "Bad Request",
         errors: {
            endDate: "endDate cannot be on or before startDate",
         },
      });
      return;
   }

   const bookingsForSpot = await Booking.findAll({
      where: {
         spotId,
      },
   });

   jsonBookingArr = [];
   for (let i = 0; i < bookingsForSpot.length; i++) {
      let booking = bookingsForSpot[i];
      jsonBookingArr.push(booking.toJSON());
   }

   for (let i = 0; i < jsonBookingArr.length; i++) {
      let booking = jsonBookingArr[i];
      const currBookStart = new Date(booking.startDate).getTime();
      const currBookEnd = new Date(booking.endDate).getTime();

      if (
         start >= currBookStart &&
         start <= currBookEnd &&
         end >= currBookStart &&
         end <= currBookEnd
      ) {
         res.status(403);
         res.json({
            message:
               "Sorry, this spot is already booked for the specified dates",
            errors: {
               startDate: "Start date conflicts with an existing booking",
               endDate: "End date conflicts with an existing booking",
            },
         });
         return;
      } else if (start >= currBookStart && start <= currBookEnd) {
         res.status(403);
         res.json({
            message:
               "Sorry, this spot is already booked for the specified dates",
            errors: {
               startDate: "Start date conflicts with an existing booking",
            },
         });
         return;
      } else if (end >= currBookStart && end <= currBookEnd) {
         res.status(403);
         res.json({
            message:
               "Sorry, this spot is already booked for the specified dates",
            errors: {
               endDate: "End date conflicts with an existing booking",
            },
         });
         return;
      }
   }

   const newBooking = await Booking.create({
      spotId,
      userId: id,
      startDate,
      endDate,
   });

   res.json(newBooking);
});

module.exports = router;
