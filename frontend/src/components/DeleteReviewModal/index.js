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
      <div className="deleteDiv">
         <div className="topDeleteDiv">
            <h3>Confirm Delete</h3>
            <h4>Are you sure you want to delete this review?</h4>
         </div>
         <div className="buttonsDiv">
            <button className="yesButton" onClick={clickedYes}>
               Yes (Delete Review)
            </button>
            <button className="noButton" onClick={clickedNo}>
               No (Keep Review)
            </button>
         </div>
      </div>
   );
}

export default DeleteReviewModal;
