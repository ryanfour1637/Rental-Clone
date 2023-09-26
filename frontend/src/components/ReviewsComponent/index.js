import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkReadReviewsOneSpot } from "../../store/reviews";
import { thunkReadSpots, thunkReadOneSpot } from "../../store/spots";
import { reviewCalc, easierDate } from "./helpers";
import { thunkRestoreUser } from "../../store/session";
import PostReviewButton from "./postReviewButton";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteSpotModal";
import "./reviews.css";
import DeleteReviewModal from "../DeleteReviewModal";

function ReviewsComponent() {
   const dispatch = useDispatch();
   const { spotId } = useParams();
   const reviews = useSelector((state) => state.reviews.spot);
   const user = useSelector((state) => state.session);
   const spotInfo = useSelector((state) => state.spots.singleSpot);
   const [hasReview, setHasReview] = useState(false);
   const [isOwner, setIsOwner] = useState(false);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [showPostReviewButton, setShowPostReviewButton] = useState(false);
   const [reviewArrLength, setReviewArrLength] = useState(0);
   const [avgRating, setAvgRating] = useState("new");
   const [updatedReviewArray, setUpdatedReviewArray] = useState([]);

   useEffect(() => {
      dispatch(thunkReadReviewsOneSpot(spotId));
      dispatch(thunkRestoreUser());
      dispatch(thunkReadOneSpot(spotId));
   }, [dispatch, spotId]);

   useEffect(() => {
      if (Object.values(spotInfo).length > 0) {
         const reviewsArr = Object.values(reviews);
         let isUser = user.user.id !== undefined;
         setIsLoggedIn(isUser);

         let review = reviewsArr.some(
            (review) => review.userId == user.user.id
         );

         setHasReview(review);

         let owner = user.user.id == spotInfo.ownerId;
         setIsOwner(owner);
      }
   }, [reviews, user, spotInfo]);

   // the problem is that updated review array is not being updated with the change from reviews
   useEffect(() => {
      const reviewsArr = Object.values(reviews);
      setReviewArrLength(reviewsArr.length);
      const avgReview = reviewCalc(reviewsArr);
      const avgReviewDec = Math.round(avgReview * 100) / 100;
      setAvgRating(avgReviewDec.toFixed(1));
      const updatedReviewsArr = easierDate(reviewsArr);
      setUpdatedReviewArray(updatedReviewsArr);
   }, [reviews]);

   useEffect(() => {
      if (hasReview || isOwner) {
         setShowPostReviewButton(false);
      } else {
         setShowPostReviewButton(true);
      }
   }, [hasReview, isOwner]);

   const clickedPostReview = () => {};
   const clickedDelete = () => {};

   return (
      <>
         <div>
            <div className="avgReviewDiv">
               <i className="fa-solid fa-star"></i>
               <p>{avgRating || "New"}</p>
            </div>
            <p>
               {reviewArrLength < 1
                  ? "new"
                  : reviewArrLength === 1
                  ? `${reviewArrLength} review`
                  : `${reviewArrLength} reviews`}
            </p>
            <div>
               {showPostReviewButton && isLoggedIn && (
                  <OpenModalButton
                     buttonText="Post Your Review"
                     onButtonClick={clickedPostReview}
                     modalComponent={<PostReviewButton spotId={spotId} />}
                  />
               )}
            </div>
            <div>
               {isLoggedIn && !isOwner && reviewArrLength < 1 && (
                  <p>Be the first to post a review!</p>
               )}
            </div>
         </div>
         {updatedReviewArray &&
            updatedReviewArray.map((review) => (
               <>
                  <div key={review.id}>
                     <p>{review.User.firstName}</p>
                     <p>{review.monthyear}</p>
                     <p>{review.review}</p>
                  </div>
                  {review.userId == user.user.id && (
                     <div>
                        <OpenModalButton
                           buttonText="Delete"
                           onButtonClick={clickedDelete}
                           modalComponent={
                              <DeleteReviewModal reviewId={review.id} />
                           }
                        />
                     </div>
                  )}
               </>
            ))}
      </>
   );
}

export default ReviewsComponent;
