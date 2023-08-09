const express = require("express");
const { Op } = require("sequelize");
const { Review, User, Spot, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const {
   reviewAvg,
   reviewAvgObj,
   validateNewSpot,
   addPreview,
} = require("./helpersApi");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
   const id = parseInt(req.user.dataValues.id);

   const reviewsForUser = await Review.findAll({
      where: {
         userId: id,
      },
      include: {
         model: User,
      },
      include: {
         model: Spot,
      },
      include: {
         model: ReviewImage,
         attributes: ["id", "url"],
      },
   });

   res.json(reviewsForUser);
});

module.exports = router;
