const express = require("express");
const { Op } = require("sequelize");
const {
   Review,
   User,
   Spot,
   ReviewImage,
   SpotImage,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {
   reviewAvg,
   reviewAvgObj,
   validateNewSpot,
   addPreview,
   addPreviewImgToReview,
} = require("./helpersApi");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
   const id = parseInt(req.user.dataValues.id);

   const reviewsForUserArr = await Review.findAll({
      where: {
         userId: id,
      },
      include: [
         {
            model: User,
            attributes: ["id", "firstName", "lastName"],
         },
         {
            model: Spot,
            attributes: [
               "id",
               "ownerId",
               "address",
               "city",
               "state",
               "country",
               "lat",
               "lng",
               "name",
               "price",
            ],
         },
         {
            model: ReviewImage,
            attributes: ["id", "url"],
         },
      ],
   });

   const response = addPreviewImgToReview(reviewsForUserArr);

   res.json(response);
});

module.exports = router;
