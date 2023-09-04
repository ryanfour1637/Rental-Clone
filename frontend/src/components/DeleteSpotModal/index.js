import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { thunkDeleteSpot } from "../../store/spots";
import "./delete.css";

function DeleteModal({ spotId, ownerId }) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();

   const clickedYes = () => {
      dispatch(thunkDeleteSpot(spotId));
      closeModal();
   };

   const clickedNo = () => {
      closeModal();
   };

   return (
      <div className="deleteDiv">
         <div className="topDeleteDiv">
            <h3>Confirm Delete</h3>
            <h4>
               Are you sure you want to remove this spot from the listings?
            </h4>
         </div>
         <div className="buttonsDiv">
            <button className="yesButton" onClick={clickedYes}>
               Yes (Delete Spot)
            </button>
            <button className="noButton" onClick={clickedNo}>
               No (Keep Spot)
            </button>
         </div>
      </div>
   );
}

export default DeleteModal;
