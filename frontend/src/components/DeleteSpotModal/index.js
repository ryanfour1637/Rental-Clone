import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { thunkDeleteSpot } from "../../store/spots";

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
      <>
         <h2>Confirm Delete</h2>
         <h5>Are you sure you want to remove this spot from the listings?</h5>
         <div>
            <button onClick={clickedYes}>Yes (Delete Spot)</button>
            <button onClick={clickedNo}>No (Keep Spot)</button>
         </div>
      </>
   );
}

export default DeleteModal;
