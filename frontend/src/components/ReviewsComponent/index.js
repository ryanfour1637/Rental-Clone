import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkReadReviewsOneSpot } from "../../store/reviews";
import { reviewCalc, easierDate } from "./helpers";

function Reviews() {
   const dispatch = useDispatch();
   const { spotId } = useParams();
   const reviews = useSelector((state) => state.reviews.spot);

   useEffect(() => {
      dispatch(thunkReadReviewsOneSpot);
   }, [dispatch]);
}

if (Object.keys(reviews).length === 0) return null;
const reviewsArr = Object.values(reviews);
const avgReview = reviewCalc(reviewsArr);
const updatedReviewsArr = easierDate(reviewsArr);
console.log(updatedReviewsArr);

return (
   <>
      <div>
         <p>{avgReview}</p>
         <p>{`${reviewsArr.length} reviews`}</p>
      </div>
      {updatedReviewsArr &&
         updatedReviewsArr.map((review) => (
            <div>
               <p>{review.user.firstName}</p>
               <p>{review.monthyear}</p>
            </div>
         ))}
   </>
);
