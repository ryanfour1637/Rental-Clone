import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import {
   thunkCreateSpot,
   thunkAddImage,
   thunkUpdateSpot,
   thunkReadSpots,
   thunkReadOneSpot,
} from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import DeleteModal from "../DeleteSpotModal";

function ManageSpots() {
   const dispatch = useDispatch();
   const history = useHistory();
   const { userId } = useParams();

   const spots = useSelector((state) => state.spots.allSpots);

   useEffect(() => {
      dispatch(thunkReadSpots());
   }, [dispatch]);

   if (Object.keys(spots).length === 0) {
      return null;
   }
   const spotsArr = Object.values(spots);
   const ownerSpotArr = spotsArr.filter((spot) => spot.ownerId == userId);

   const navToNewSpot = () => {
      history.push("/spots");
   };

   const clickedDelete = () => {};

   return (
      <>
         <h2>Manage Your Spots</h2>
         {ownerSpotArr.length === 0 && (
            <button onClick={navToNewSpot}>Create a New Spot</button>
         )}
         {ownerSpotArr.length > 0 &&
            ownerSpotArr.map((spot) => (
               <div key={spot.id}>
                  <NavLink to={`/spots/${spot.id}`}>
                     <img src={spot.previewImage} />
                  </NavLink>
                  <div>
                     <p>{`${spot.city}, ${spot.state}`}</p>
                     <p>{spot.avgRating || "New"}</p>
                  </div>
                  <div>
                     <p>{`$${spot.price} night`}</p>
                  </div>
                  <div>
                     <NavLink to={`/spots/${spot.id}/edit`}>
                        <button>Update</button>
                     </NavLink>
                     <div>
                        <OpenModalButton
                           buttonText="Delete"
                           onButtonClick={clickedDelete}
                           modalComponent={
                              <DeleteModal
                                 spotId={spot.id}
                                 ownerId={spot.ownerId}
                              />
                           }
                        />
                     </div>
                  </div>
               </div>
            ))}
      </>
   );
}

export default ManageSpots;
