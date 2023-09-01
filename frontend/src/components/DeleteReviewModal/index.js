import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { thunkDeleteReview } from "../../store/reviews";
import "./delete.css";

function DeleteReviewModal({ reviewId }) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();

   const clickedYes = () => {
      dispatch(thunkDeleteReview(reviewId));
      closeModal();
   };

   const clickedNo = () => {
      closeModal();
   };

   return (
      <>
         <h2>Confirm Delete</h2>
         <h5>Are you sure you want to delete this review?</h5>
         <div>
            <button className="yesButton" onClick={clickedYes}>
               Yes (Delete Review)
            </button>
            <button className="noButton" onClick={clickedNo}>
               No (Keep Review)
            </button>
         </div>
      </>
   );
}

export default DeleteReviewModal;
