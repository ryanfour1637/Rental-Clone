import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./singlespot.css";
import { useParams } from "react-router-dom";
import { thunkReadOneSpot } from "../../store/spots";
import ReviewsComponent from "../ReviewsComponent";

function SingleSpot() {
   const dispatch = useDispatch();
   const { spotId } = useParams();
   const spot = useSelector((state) => state.spots.singleSpot);

   useEffect(() => {
      dispatch(thunkReadOneSpot(spotId));
   }, [dispatch, spotId]);

   if (!spot || Object.keys(spot).length === 0) {
      return null;
   }

   const images = spot.SpotImages;
   const rightImages = [];
   for (let i = 1; i < images.length; i++) {
      let imageToMove = images[i];
      rightImages.push(imageToMove);
   }

   return (
      <div>
         <h2>Name - figure out right thing here</h2>
         <p>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
         <div>
            <img src={images[0].url} />
         </div>
         <div>
            {rightImages.map((image, index) => (
               <img key={index} src={image.url} alt="Spot" />
            ))}
         </div>
         <div>
            <div>
               <h3>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h3>
               <p>{spot.description}</p>
            </div>
            <div>
               <div>
                  <p>{spot.price}</p>
                  <p>{spot.avgRating || "Be the first to review!"}</p>
                  <p>{spot.numReviews || ""}</p>
               </div>
               <button>Reserve</button>
            </div>
         </div>
         <ReviewsComponent />
      </div>
   );
}

export default SingleSpot;
