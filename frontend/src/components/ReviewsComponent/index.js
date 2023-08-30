import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkReadReviewsOneSpot } from "../../store/reviews";
import { reviewCalc, easierDate } from "./helpers";

function ReviewsComponent() {
   const dispatch = useDispatch();
   const { spotId } = useParams();
   const reviews = useSelector((state) => state.reviews.spot);

   useEffect(() => {
      dispatch(thunkReadReviewsOneSpot(spotId));
   }, [dispatch]);

   if (Object.values(reviews).length === 0) return null;

   const reviewsArr = Object.values(reviews);
   const avgReview = reviewCalc(reviewsArr);
   const updatedReviewsArr = easierDate(reviewsArr);

   return (
      <>
         <div>
            <p>{avgReview}</p>
            <p>{`${reviewsArr.length} reviews`}</p>
         </div>
         {updatedReviewsArr &&
            updatedReviewsArr.map((review) => (
               <div key={review.id}>
                  <p>{review.User.firstName}</p>
                  <p>{review.monthyear}</p>
                  <p>{review.review}</p>
               </div>
            ))}
      </>
   );
}

export default ReviewsComponent;
