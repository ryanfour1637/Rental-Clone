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

   const jsonArr = [];
   const finalArr = [];
   for (let review of reviewsForUserArr) {
      jsonArr.push(review.toJSON());
   }
   try {
      for (let i = 0; i < jsonArr.length; i++) {
         const reviewObj = jsonArr[i];
         if (reviewObj.ReviewImages.length < 1) {
            reviewObj.Spot.previewImage = "no images for this review yet";
            finalArr.push(reviewObj);
         } else {
            let imgUrl = reviewObj.ReviewImages[0].url;
            reviewObj.Spot.previewImage = imgUrl;
            finalArr.push(reviewObj);
         }
      }
   } catch {}

   res.json(finalArr);
});

router.post("/:reviewId/images", requireAuth, async (req, res) => {
   const id = parseInt(req.user.dataValues.id);
   const reviewId = parseInt(req.params.reviewId);
   const { url } = req.body;

   const findReview = await Review.findByPk(reviewId);

   if (!findReview) {
      res.status(404);
      res.json({
         message: "Review could not be found",
      });
   } else {
      if (findReview.userId !== id) {
         res.status(401);
         res.json({
            message:
               "Unauthorized, only the owner of the review can add a photo",
         });
      } else {
         const getReviewPhotos = await ReviewImage.findAll({
            where: {
               reviewId,
            },
         });

         if (getReviewPhotos.length >= 10) {
            res.status(403);
            res.json({
               message:
                  "Maximum number of images for this resource was reached",
            });
         } else {
            const createReviewPhoto = await ReviewImage.create({
               reviewId,
               url,
            });

            const findLastReview = await ReviewImage.findAll({
               where: {
                  reviewId,
               },
               attributes: ["id", "url"],
            });

            res.json(findLastReview[findLastReview.length - 1]);
         }
      }
   }
});

router.put("/:reviewId", requireAuth, async (req, res) => {
   const id = parseInt(req.user.dataValues.id);
   const reviewId = parseInt(req.params.reviewId);
   const { review, stars } = req.body;

   const currReview = await Review.findByPk(reviewId);

   if (!currReview) {
      res.status(404);
      res.json({
         message: "Review could not be found.",
      });
   } else {
      if (currReview.userId !== id) {
         res.status(401);
         res.json({
            message: "Unauthorized, only owner of review can edit it",
         });
      } else {
         (currReview.review = review), (currReview.stars = stars);
         res.json(currReview);
      }
   }
});

module.exports = router;
