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
   // when there is no logged in user, an error gets thrown because it says the user is unauthorized fix it later.

   useEffect(() => {
      dispatch(thunkReadReviewsOneSpot(spotId));
      dispatch(thunkRestoreUser());
      dispatch(thunkReadOneSpot(spotId));
   }, [dispatch, spotId]);

   useEffect(() => {
      if (
         Object.values(reviews).length > 0 &&
         // Object.values(user).length > 0 &&
         Object.values(spotInfo).length > 0
      ) {
         const reviewsArr = Object.values(reviews);
         let isUser = user?.user?.id !== undefined;
         setIsLoggedIn(isUser);

         let review = reviewsArr.some(
            (review) => review.userId === user?.user?.id
         );

         setHasReview(review);

         let owner = user?.user?.id === spotInfo.ownerId;
         setIsOwner(owner);
      }
   }, [reviews, user, spotInfo]);

   useEffect(() => {
      if (hasReview || isOwner) {
         setShowPostReviewButton(false);
      } else {
         setShowPostReviewButton(true);
      }
   }, [hasReview, isOwner]);

   const clickedPostReview = () => {};
   const clickedDelete = () => {};
   const reviewsArr = Object.values(reviews);
   const avgReview = reviewCalc(reviewsArr);
   const updatedReviewsArr = easierDate(reviewsArr);
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
               {showPostReviewButton && isLoggedIn && (
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
               <>
                  <div key={review.id}>
                     <p>{review.User.firstName}</p>
                     <p>{review.monthyear}</p>
                     <p>{review.review}</p>
                  </div>
                  <div>
                     {isLoggedIn && review.User.id == user.user.id && (
                        <OpenModalButton
                           buttonText="Delete"
                           onButtonClick={clickedDelete}
                           modalComponent={
                              <DeleteReviewModal reviewId={review.id} />
                           }
                        />
                     )}
                  </div>
               </>
            ))}
      </>
   );
}

export default ReviewsComponent;
