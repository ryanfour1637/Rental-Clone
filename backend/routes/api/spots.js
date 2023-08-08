const express = require("express");
const { Op } = require("sequelize");
const { Spot, SpotImage, Review, User } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");
const { reviewAvg, reviewAvgObj, validateNewSpot } = require("./helpersApi");

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

   const jsonSpots = reviewAvg(spotsArr);

   jsonSpots.forEach((spot) => {
      spot.SpotImages.forEach((image) => {
         if (image.preview === true) {
            spot.previewImage = image.url;
         } else {
            spot.previewImage = "no preview image found";
         }
      });
      delete spot.SpotImages;
   });

   res.json(jsonSpots);
});

router.post("/", restoreUser, validateNewSpot, async (req, res) => {
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

router.get("/current", restoreUser, async (req, res, next) => {
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

   const jsonSpots = reviewAvg(spotsArr);

   jsonSpots.forEach((spot) => {
      spot.SpotImages.forEach((image) => {
         if (image.preview === true) {
            spot.previewImage = image.url;
         } else {
            spot.previewImage = "no preview image found";
         }
      });
      delete spot.SpotImages;
   });

   res.json(jsonSpots);
});

router.get("/:spotId", async (req, res) => {
   const { spotId } = req.params;

   parseInt(spotId);

   try {
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

      const jsonSpots = reviewAvgObj(detailsSpot);

      res.json(jsonSpots);
   } catch (error) {
      res.status(404);
      res.json({
         message: "Spot could not be found",
      });
   }
});

module.exports = router;
