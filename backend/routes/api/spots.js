const express = require("express");
const { Op } = require("sequelize");
const {
   Spot,
   SpotImage,
   Review,
   User,
   ReviewImage,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {
   reviewAvg,
   reviewAvgObj,
   validateNewSpot,
   addPreview,
} = require("./helpersApi");

const router = express.Router();

router.get("/", async (req, res) => {
   const spotsArr = await Spot.findAll({
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

   res.json(jsonSpots);
});

router.post("/", requireAuth, validateNewSpot, async (req, res) => {
   const id = req.user.dataValues.id;
   const { address, city, state, country, lat, lng, name, description, price } =
      req.body;

   const newSpot = await Spot.create({
      ownerId: id,
      address,
      city,
      state,
      country,
      lat,
      lng,
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

   res.json(jsonSpots);
});

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
   const { url, preview } = req.body;
   const id = parseInt(req.user.dataValues.id);
   const spotId = parseInt(req.params.spotId);

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
   const { address, city, state, country, lat, lng, name, description, price } =
      req.body;

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
            lat,
            lng,
            name,
            description,
            price,
         });

         spotToEdit.save();
         res.json(spotToEdit);
      }
   }
});

router.get("/:spotId", async (req, res) => {
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
      res.json(jsonSpots);
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

   if (!reviewsForSpotArr) {
      res.status(404);
      res.json({
         message: "Spot could not be found",
      });
   } else {
      res.json(reviewsForSpotArr);
   }
});

module.exports = router;
