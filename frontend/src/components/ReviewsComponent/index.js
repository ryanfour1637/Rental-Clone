import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkReadReviewsOneSpot } from "../../store/reviews";
import { thunkReadSpots } from "../../store/spots";
import { reviewCalc, easierDate } from "./helpers";
import PostReviewButton from "./postReviewButton";
import OpenModalButton from "../OpenModalButton";
import "./reviews.css";

function ReviewsComponent() {
   const dispatch = useDispatch();
   const { spotId } = useParams();
   const reviews = useSelector((state) => state.reviews.spot);
   const user = useSelector((state) => state.session);
   const spotInfo = useSelector((state) => state.spots.allSpots[spotId]);
   // when there is no logged in user, an error gets thrown because it says the user is unauthorized fix it later

   useEffect(() => {
      dispatch(thunkReadReviewsOneSpot(spotId));
      dispatch(thunkReadSpots());
   }, [dispatch]);

   const reviewsArr = Object.values(reviews);
   const avgReview = reviewCalc(reviewsArr);
   const updatedReviewsArr = easierDate(reviewsArr);

   const userHasReview = [];
   updatedReviewsArr.forEach((review) => {
      if ((review.userId || 5000) == (user.user.id || 6000)) {
         userHasReview.push(review);
      }
   });

   const clickedPostReview = () => {};

   return (
      <>
         <div>
            <div className="avgReviewDiv">
               <i className="fa-solid fa-star"></i>
               <p>{avgReview || "New"}</p>
            </div>
            <p>
               {reviewsArr.length < 1
                  ? "new"
                  : reviewsArr.length === 1
                  ? `${reviewsArr.length} review`
                  : `${reviewsArr.length} reviews`}
            </p>
            <div>
               {!userHasReview.length === 0 &&
                  spotInfo.ownerId !== user.user.id && (
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
