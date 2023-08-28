import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./homepage.css";
import { thunkReadSpots } from "../../store/spots";
import { Link } from "react-router-dom";

function HomePage() {
   console.log("component rendering");
   const dispatch = useDispatch();
   const spots = useSelector((state) => state.spots.allSpots);
   console.log("this is spots", spots);
   let spotsArr;
   if (Object.keys(spots).length !== 0) {
      spotsArr = Object.values(spots);
   }

   console.log("this is the spots array", spotsArr);

   useEffect(() => {
      console.log("use effect running?");
      dispatch(thunkReadSpots());
   }, [dispatch]);

   return (
      <div>
         <h2>HOME</h2>
         {spotsArr.map((spot) => (
            <div key={spot.id}>
               <Link to={`/api/spots/${spot.id}`}>
                  <img src={spot.previewImage} />
               </Link>
               <div>
                  <p>{`${spot.city}, ${spot.state}`}</p>
                  <p>{spot.avgRating}</p>
               </div>
               <p>{`$${spot.price} night`}</p>
            </div>
         ))}
      </div>
   );
}

export default HomePage;
