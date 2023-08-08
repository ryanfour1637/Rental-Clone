const express = require("express");
const { Op } = require("sequelize");
const { Spot, SpotImage, Review, User } = require("../../db/models");
const { restoreUser } = require("../../utils/auth");

const router = express.Router();

router.get("/", async (req, res) => {
   const spots = await Spot.findAll({
      include: [
         {
            model: SpotImage,
         },
         {
            model: Review,
         },
      ],
   });

   const jsonSpots = [];

   spots.forEach((game) => {
      jsonSpots.push(game.toJSON());
   });

   jsonSpots.forEach((spot) => {
      let count = 0;
      let starCount = 0;
      spot.Reviews.forEach((review) => {
         count += 1;
         starCount += review.stars;
      });
      let avg = starCount / count;
      spot.avgRating = avg;
      delete spot.Reviews;
   });

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
   

});

router.get("/current", restoreUser, async (req, res, next) => {
   const id = req.user.dataValues.id;

   const spots = await Spot.findAll({
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

   const jsonSpots = [];

   spots.forEach((spot) => {
      jsonSpots.push(spot.toJSON());
   });

   jsonSpots.forEach((spot) => {
      let count = 0;
      let starCount = 0;
      spot.Reviews.forEach((review) => {
         count += 1;
         starCount += review.stars;
      });
      let avg = starCount / count;
      spot.avgRating = avg;
      delete spot.Reviews;
   });

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

// router.post('/', async (req, res) => {

// })

module.exports = router;
