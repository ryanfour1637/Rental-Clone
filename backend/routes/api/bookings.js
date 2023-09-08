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

router.get("/current", requireAuth, async (req, res) => {
   const id = parseInt(req.user.dataValues.id);

   const currUserBookings = await Booking.findAll({
      where: {
         userId: id,
      },
      include: [
         {
            model: Spot,
            attributes: [
               "id",
               "ownerId",
               "address",
               "city",
               "state",
               "country",
               "name",
               "price",
            ],
         },
      ],
   });
   let jsonArr = [];
   for (let i = 0; i < currUserBookings.length; i++) {
      const userBooking = currUserBookings[i];
      jsonArr.push(userBooking.toJSON());
   }

   for (let i = 0; i < jsonArr.length; i++) {
      const booking = jsonArr[i];

      const spotId = booking.spotId;
      const imgUrl = await SpotImage.findOne({
         where: {
            spotId,
            preview: true,
         },
      });

      if (!imgUrl) {
         booking.Spot.previewImage = "no preview image available";
      } else {
         booking.Spot.previewImage = imgUrl.url;
      }
   }

   const finalObj = {};
   finalObj.Bookings = jsonArr;

   res.json(finalObj);
});

router.put("/:bookingId", requireAuth, async (req, res) => {
   const bookingId = req.params.bookingId;
   const id = parseInt(req.user.dataValues.id);
   const { startDate, endDate } = req.body;

   const start = new Date(startDate).getTime();
   const end = new Date(endDate).getTime();
   const currentDate = new Date().getTime();

   const findBooking = await Booking.findByPk(bookingId);

   if (!findBooking) {
      res.status(404);
      res.json({
         message: "Booking could not be found",
      });
      return;
   }

   if (findBooking.userId !== id) {
      res.status(401);
      res.json({
         message: "Unauthorized, booking must belong to the current user",
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

   if (end < currentDate) {
      res.status(403);
      res.json({
         message: "Past bookings cannot be modified",
      });
      return;
   }

   const currBookStart = new Date(findBooking.startDate).getTime();
   const currBookEnd = new Date(findBooking.endDate).getTime();

   if (
      start >= currBookStart &&
      start <= currBookEnd &&
      end >= currBookStart &&
      end <= currBookEnd
   ) {
      res.status(403);
      res.json({
         message: "Sorry, this spot is already booked for the specified dates",
         errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking",
         },
      });
      return;
   } else if (start >= currBookStart && start <= currBookEnd) {
      res.status(403);
      res.json({
         message: "Sorry, this spot is already booked for the specified dates",
         errors: {
            startDate: "Start date conflicts with an existing booking",
         },
      });
      return;
   } else if (end >= currBookStart && end <= currBookEnd) {
      res.status(403);
      res.json({
         message: "Sorry, this spot is already booked for the specified dates",
         errors: {
            endDate: "End date conflicts with an existing booking",
         },
      });
      return;
   }

   findBooking.startDate = startDate;
   findBooking.endDate = endDate;

   await findBooking.save();

   res.json(findBooking);
});

router.delete("/:bookingId", requireAuth, async (req, res) => {
   const bookingId = parseInt(req.params.bookingId);
   const id = parseInt(req.user.dataValues.id);
   const currentDate = new Date().getTime();

   let bookingToDelete = await Booking.findByPk(bookingId, {
      include: {
         model: Spot,
      },
   });
   if (!bookingToDelete) {
      res.status(404),
         res.json({
            message: "Booking could not be found",
         });
      return;
   }

   let jsonBookingToDelete = bookingToDelete.toJSON();

   if (
      jsonBookingToDelete.userId !== id &&
      jsonBookingToDelete.Spot.ownerId !== id
   ) {
      res.status(401);
      res.json({
         message:
            "Unauthorized, booking must belong to the current user or the Spot must belong to the current user",
      });
      return;
   }

   const startDate = new Date(jsonBookingToDelete.startDate).getTime();

   if (startDate < currentDate) {
      res.status(403);
      res.json({
         message: "Bookings that have been started cannot be deleted",
      });
      return;
   }

   bookingToDelete.destroy();
   res.json({
      message: "Successfully deleted",
   });
});

module.exports = router;
