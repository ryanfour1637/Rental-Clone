export function reviewCalc(reviewsArr) {
   let count = 0;
   for (let review of reviewsArr) {
      count += review.stars;
   }
   const avg = count / reviewsArr.length;
   return avg;
}

export function easierDate(reviewsArr) {
   console.log("inside easierDate", reviewsArr);
   const newArr = [];
   for (let review of reviewsArr) {
      const dateFromReview = review.updatedAt;
      const dateObj = new Date(dateFromReview);
      const months = [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
         "December",
      ];

      const monthForSite = months[dateObj.getUTCMonth()];
      const year = dateObj.getUTCFullYear();
      review.monthyear = `${monthForSite} ${year}`;
      newArr.unshift(review);
   }
   return newArr;
}
