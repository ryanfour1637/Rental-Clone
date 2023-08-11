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

router.delete("/:imageId", requireAuth, async (req, res) => {
   const imageId = parseInt(req.params.imageId);
   const id = parseInt(req.user.dataValues.id);

   const findImg = await ReviewImage.findByPk(imageId, {
      include: {
         model: Review,
      },
   });

   if (!findImg) {
      res.status(404);
      res.json({
         message: "Review Image could not be found",
      });
      return;
   }

   const jsonFoundImg = findImg.toJSON();

   if (id !== jsonFoundImg.Review.userId) {
      res.status(401);
      res.json({
         message: "Unauthorized, spot must belong to the current user",
      });
      return;
   }

   findImg.destroy();

   res.json({
      message: "Successfully deleted",
   });
});

module.exports = router;
