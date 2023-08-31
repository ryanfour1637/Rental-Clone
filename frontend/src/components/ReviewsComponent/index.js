import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkReadReviewsOneSpot } from "../../store/reviews";
import { thunkReadSpots } from "../../store/spots";
import { reviewCalc, easierDate } from "./helpers";
import PostReviewButton from "./postReviewButton";
import OpenModalButton from "../OpenModalButton";

function ReviewsComponent() {
   const dispatch = useDispatch();
   const { spotId } = useParams();
   const reviews = useSelector((state) => state.reviews.spot);
   const user = useSelector((state) => state.session);
   const spotInfo = useSelector((state) => state.spots.allSpots[spotId]);

   useEffect(() => {
      dispatch(thunkReadReviewsOneSpot(spotId));
      dispatch(thunkReadSpots());
   }, [dispatch]);

   if (Object.values(reviews).length === 0) return null;
   console.log(reviews, user);

   const reviewsArr = Object.values(reviews);
   const avgReview = reviewCalc(reviewsArr);
   const updatedReviewsArr = easierDate(reviewsArr);

   const userHasReview = [];
   updatedReviewsArr.forEach((review) => {
      if (review.userId == user.user.id) {
         userHasReview.push(review);
      }
   });

   const result = spotInfo.ownerId == user.user.id;

   const clickedPostReview = () => {};

   return (
      <>
         <div>
            <p>{avgReview}</p>
            <p>
               {reviewsArr.length < 1
                  ? "new"
                  : reviewsArr.length === 1
                  ? `${reviewsArr.length} review`
                  : `${reviewsArr.length} reviews`}
            </p>
            <div>
               {!userHasReview.length === 0 && !result && (
                  <OpenModalButton
                     buttonText="Post Your Review"
                     onButtonClick={clickedPostReview}
                     modalComponent={<PostReviewButton spotId={spotId} />}
                  />
               )}
            </div>
         </div>
         {updatedReviewsArr &&
            updatedReviewsArr.map((review) => (
               <div key={review.id}>
                  <p>{user.firstName}</p>
                  <p>{review.monthyear}</p>
                  <p>{review.review}</p>
               </div>
            ))}
      </>
   );
}

export default ReviewsComponent;
