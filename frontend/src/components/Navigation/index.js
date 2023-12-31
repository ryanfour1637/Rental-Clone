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
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIAJbhm4yUZl6gN4WV89rflO2nTXWx7LS3g&usqp=CAU"
               alt="Home"
               width="24"
               height="24"
               className="airbnblogo"
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
