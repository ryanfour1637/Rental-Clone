const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { json } = require("sequelize");

// switch all functions from using forEach to using For LET

const reviewAvg = function (spotsArr) {
   const jsonSpots = [];

   for (let spot of spotsArr) {
      jsonSpots.push(spot.toJSON());
   }

   jsonSpots.forEach((spot) => {
      let count = 0;
      let starCount = 0;
      spot.Reviews.forEach((review) => {
         count += 1;
         starCount += review.stars;
      });
      let avg = starCount / count;
      let avgRounded = Math.round(avg * 100) / 100;
      spot.avgRating = avgRounded;
      delete spot.Reviews;
   });
   return jsonSpots;
};

const reviewAvgObj = function (spotsObj) {
   const jsonSpots = [];

   jsonSpots.push(spotsObj.toJSON());

   jsonSpots.forEach((spot) => {
      let count = 0;
      let starCount = 0;
      spot.Reviews.forEach((review) => {
         count += 1;
         starCount += review.stars;
      });
      let avg = starCount / count;
      let avgRounded = Math.round(avg * 100) / 100;
      spot.numReviews = count;
      spot.avgRating = avgRounded;
      delete spot.Reviews;
   });
   return jsonSpots;
};

const validateNewSpot = [
   check("address")
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
   check("city").exists({ checkFalsy: true }).withMessage("City is required"),
   check("state")
      .exists({ checkFalsy: true })
      .isLength({ min: 2, max: 2 })
      .withMessage("State is required and should be 2 letters"),
   check("country")
      .exists({ checkFalsy: true })
      .withMessage("Country is required"),
   check("name")
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage("Name must be less than 50 characters"),
   check("price")
      .exists({ checkFalsy: true })
      .withMessage("Price per day is required"),
   handleValidationErrors,
];

const addPreview = function (jsonSpots) {
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
   return jsonSpots;
};

const validateReviews = [
   check("review")
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
   check("stars")
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })
      .withMessage("Stars must be an integer from 1 to 5."),
   handleValidationErrors,
];

module.exports = {
   reviewAvg,
   reviewAvgObj,
   validateNewSpot,
   addPreview,
   validateReviews,
};
