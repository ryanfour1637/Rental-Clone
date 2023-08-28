import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./singlespot.css";
import { useParams } from "react-router-dom";
import { thunkReadOneSpot } from "../../store/spots";

function SingleSpot() {
   const dispatch = useDispatch();
   const { spotId } = useParams();
   const spot = useSelector((state) => state.spots.singleSpot);

   useEffect(() => {
      dispatch(thunkReadOneSpot(spotId));
   }, [dispatch, spotId]);

   if (!spot || Object.keys(spot).length === 0) {
      return <div>Loading...</div>;
   }

   return (
      <div>
         <h2>Name - figure out right thing here</h2>
         <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
         <div>
            {spot.SpotImages.map((image, index) => (
               <img key={index} src={image.url} alt="Spot" />
            ))}
         </div>
         <div>
            <div>
               <h3>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h3>
               <p>{spot.description}</p>
            </div>
            <div>
               <p>{spot.price}</p>
               <p>{spot.avgRating || "Be the first to review!"}</p>
               <p>{spot.numReviews || ""}</p>
               <button>Reserve</button>
            </div>
         </div>
      </div>
   );
}

export default SingleSpot;
