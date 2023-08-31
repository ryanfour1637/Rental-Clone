import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./homepage.css";
import { thunkReadSpots } from "../../store/spots";
import { Link, Switch, Route, NavLink } from "react-router-dom";

// function HomePage() {
//    const dispatch = useDispatch();
//    const spots = useSelector((state) => state.spots.allSpots);

//    useEffect(() => {
//       dispatch(thunkReadSpots());
//    }, [dispatch]);

//    if (Object.keys(spots).length === 0) {
//       return null;
//    }
//    const spotsArr = Object.values(spots);

//    return (
//       <div className="totalDiv">
//          {spotsArr &&
//             spotsArr.map((spot) => (
//                <div key={spot.id} className="tileDivs">
//                   <NavLink to={`/spots/${spot.id}`}>
//                      <img className="imageTile" src={spot.previewImage} />
//                   </NavLink>

//                   <div className="topTextDiv">
//                      <p>{`${spot.city}, ${spot.state}`}</p>
//                      <div className="ratingDiv">
//                         <i className="fa-solid fa-star"></i>
//                         <p>{spot.avgRating || "New"}</p>
//                      </div>
//                   </div>
//                   <div>
//                      <p>{`$${spot.price} night`}</p>
//                   </div>
//                </div>
//             ))}
//       </div>
//    );
// }

function HomePage() {
   const dispatch = useDispatch();
   const spots = useSelector((state) => state.spots.allSpots);
   const [showToolTip, setShowToolTip] = useState({});

   useEffect(() => {
      dispatch(thunkReadSpots());
   }, [dispatch]);

   if (Object.keys(spots).length === 0) {
      return null;
   }
   const spotsArr = Object.values(spots);
   const setVisibility = (id, visible) => {
      setShowToolTip((prevState) => ({ ...prevState, [id]: visible }));
   };
   return (
      <div className="totalDiv">
         {spotsArr &&
            spotsArr.map((spot) => (
               <div
                  key={spot.id}
                  className="tileDivs"
                  onMouseOver={() => setVisibility(spot.id, true)}
                  onMouseOut={() => setVisibility(spot.id, false)}
               >
                  <NavLink to={`/spots/${spot.id}`}>
                     <img className="imageTile" src={spot.previewImage} />
                  </NavLink>

                  {/* Tooltip */}
                  {showToolTip[spot.id] && (
                     <div className="toolTip">{spot.name}</div>
                  )}

                  <div className="topTextDiv">
                     <p>{`${spot.city}, ${spot.state}`}</p>
                     <div className="ratingDiv">
                        <i className="fa-solid fa-star"></i>
                        <p>{spot.avgRating || "New"}</p>
                     </div>
                  </div>
                  <div>
                     <p>{`$${spot.price} night`}</p>
                  </div>
               </div>
            ))}
      </div>
   );
}

export default HomePage;
