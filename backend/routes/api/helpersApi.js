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

module.exports = { reviewAvg, reviewAvgObj };
