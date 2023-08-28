import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./homepage.css";
import { thunkReadSpots } from "../../store/spots";
import { Link, Switch, Route, NavLink } from "react-router-dom";
import SingleSpot from "../SingleSpot";

function HomePage() {
   const dispatch = useDispatch();
   const spots = useSelector((state) => state.spots.allSpots);

   useEffect(() => {
      dispatch(thunkReadSpots());
   }, [dispatch]);

   if (!spots || Object.keys(spots).length === 0) {
      return null;
   }
   let spotsArr = Object.values(spots);

   return (
      <div>
         <h2>HOME</h2>
         {spotsArr.map((spot) => (
            <div key={spot.id}>
               <NavLink to={`/spots/${spot.id}`}>
                  <img src={spot.previewImage} />
               </NavLink>
               <div>
                  <p>{`${spot.city}, ${spot.state}`}</p>
                  <p>{spot.avgRating || "Be the first to review!"}</p>
               </div>
               <p>{`$${spot.price} night`}</p>
            </div>
         ))}
      </div>
   );
}

export default HomePage;
