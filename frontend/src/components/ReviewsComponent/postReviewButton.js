import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { thunkCreateReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import StarRating from "./stars";

function PostReviewButton({ spotId }) {
   const dispatch = useDispatch();
   // add

   const user = useSelector((state) => state.session);
   const { closeModal } = useModal();
   const [reviewText, setReviewText] = useState("");
   const [ratingNotSelected, setRatingNotSelected] = useState(null);

   const clickedSubmit = async (e) => {
      console.log("this is the user", user);
      e.preventDefault();
      const reviewToPost = {
         review: reviewText,
         stars: ratingNotSelected,
         User: user,
      };
      const res = await dispatch(thunkCreateReview(reviewToPost, spotId));
      closeModal();
   };

   return (
      <>
         <h2>How was your stay?</h2>
         <form onSubmit={clickedSubmit}>
            <textarea
               value={reviewText}
               onChange={(e) => setReviewText(e.target.value)}
               placeholder="Leave your review here..."
               rows="5"
            ></textarea>
            <StarRating
               stars={ratingNotSelected}
               setStars={setRatingNotSelected}
            />
            <button
               type="submit"
               disabled={reviewText.length < 10 || ratingNotSelected === null}
            >
               Submit Your Review
            </button>
         </form>
      </>
   );
}

export default PostReviewButton;
