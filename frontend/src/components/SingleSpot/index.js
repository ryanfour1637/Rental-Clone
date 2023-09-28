import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./singlespot.css";
import { useParams, NavLink } from "react-router-dom";
import { thunkReadOneSpot } from "../../store/spots";
import ReviewsComponent from "../ReviewsComponent";
import RatingBanner from "./starReviewBanner";

function SingleSpot() {
   const dispatch = useDispatch();
   const { spotId } = useParams();
   const spot = useSelector((state) => state.spots.singleSpot);
   const reviewsData = useSelector((state) => state.reviews.spot);

   useEffect(() => {
      dispatch(thunkReadOneSpot(spotId));
      console.log(reviewsData);
   }, [spotId, reviewsData]);

   if (!spot || Object.keys(spot).length === 0) {
      dispatch(thunkReadOneSpot(spotId));
      return null;
   }

   // need to figure out if I may need to get the data normalized for this array
   const images = spot.SpotImages;
   const rightImages = [];
   for (let i = 1; i < images.length; i++) {
      let imageToMove = images[i];
      rightImages.push(imageToMove);
   }

   const comingSoon = () => {
      alert("Feature coming soon.");
   };

   return (
      <div className="contentDiv">
         <h2>{spot.name}</h2>
         <p className="cityState">{`${spot.city}, ${spot.state}, ${spot.country}`}</p>
         <div className="imagesDiv">
            <div className="leftImageDiv">
               <img className="leftImage" src={images[0]?.url} />
            </div>
            <div>
               {rightImages.map((image, index) => (
                  <img
                     className="rightImages"
                     key={index}
                     src={image.url}
                     alt="Spot"
                  />
               ))}
            </div>
         </div>
         <div className="bottomDiv">
            <div>
               <h3>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h3>
               <p>{spot.description}</p>
            </div>
            <div className="rightBottomDiv">
               <div className="topRightBottomDiv">
                  <div>
                     <p>{`$${spot.price} / night`}</p>
                  </div>
                  <RatingBanner spot={spot} />
               </div>
               <button onClick={comingSoon}>Reserve</button>
            </div>
         </div>
         <ReviewsComponent />
      </div>
   );
}

export default SingleSpot;
