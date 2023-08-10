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
               "lat",
               "lng",
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
      console.log(booking);
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

   res.json(jsonArr);
});

module.exports = router;
