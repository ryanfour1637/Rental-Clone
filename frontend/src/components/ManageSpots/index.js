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
import "./manageSpots.css";

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
      <div>
         <h2>Manage Spots</h2>
         {ownerSpotArr.length === 0 && (
            <button onClick={navToNewSpot}>Create a New Spot</button>
         )}
         {ownerSpotArr.length > 0 &&
            ownerSpotArr.map((spot) => (
               <div className="tileDivs" key={spot.id}>
                  <NavLink to={`/spots/${spot.id}`}>
                     <img
                        src={spot.previewImage}
                        className="imageTile"
                        alt={spot.name}
                        title={spot.name}
                     />
                  </NavLink>
                  <div className="topTextDiv">
                     <p>{`${spot.city}, ${spot.state}`}</p>
                     <div className="ratingDiv">
                        <i className="fa-solid fa-star"></i>
                        <p>{spot.avgRating || "New"}</p>
                     </div>
                  </div>
                  <div>
                     <p>{`$${spot.price} / night`}</p>
                  </div>
                  <div className="buttonDiv">
                     <div>
                        <NavLink to={`/spots/${spot.id}/edit`}>
                           <button className="buttonUpdate">Update</button>
                        </NavLink>
                     </div>
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
      </div>
   );
}

export default ManageSpots;
