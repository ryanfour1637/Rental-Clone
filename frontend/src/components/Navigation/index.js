import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
   const sessionUser = useSelector((state) => state.session.user);

   return (
      <div className="navMainDiv">
         <NavLink exact to="/">
            <img
               src="https://static-00.iconduck.com/assets.00/airbnb-icon-512x512-d9grja5t.png"
               alt="Home"
               width="24"
               height="24"
            />
         </NavLink>
         <div className="navRightSide">
            {sessionUser && (
               <div className="createSpotDiv">
                  <NavLink exact to="/spots">
                     Create new spot
                  </NavLink>
               </div>
            )}
            {isLoaded && (
               <div className="loginDiv">
                  <ProfileButton user={sessionUser} />
               </div>
            )}
         </div>
      </div>
   );
}

export default Navigation;
