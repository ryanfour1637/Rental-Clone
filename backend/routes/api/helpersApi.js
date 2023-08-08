const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const reviewAvg = function (spotsArr) {
   const jsonSpots = [];

   spotsArr.forEach((spot) => {
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
      spot.numReviews = count;
      spot.avgRating = avg;
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
   check("lat")
      .exists({ checkFalsy: true })
      .withMessage("Latitude is not valid"),
   check("lng")
      .exists({ checkFalsy: true })
      .withMessage("Longitude is not valid"),
   check("name")
      .exists({ checkFalsy: true })
      .isLength({ min: 1, max: 50 })
      .withMessage("Name must be less than 50 characters"),
   check("description")
      .exists({ checkFalsy: true })
      .withMessage("Description is required"),
   check("price")
      .exists({ checkFalsy: true })
      .withMessage("Price per day is required"),
   handleValidationErrors,
];

module.exports = { reviewAvg, reviewAvgObj, validateNewSpot };
