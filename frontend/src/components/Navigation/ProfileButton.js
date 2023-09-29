import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import "./profileCSS.css";

function ProfileButton({ user }) {
   const history = useHistory();
   const dispatch = useDispatch();
   const [showMenu, setShowMenu] = useState(false);
   const ulRef = useRef();

   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
         if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
         }
      };

      document.addEventListener("click", closeMenu);

      return () => document.removeEventListener("click", closeMenu);
   }, [showMenu]);

   const closeMenu = () => setShowMenu(false);

   const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.thunkLogout());
      closeMenu();
      history.push("/");
   };

   const manageSpots = (e) => {
      history.push(`/spots/${user.id}/manage`);
   };

   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

   return (
      <>
         <button onClick={openMenu}>
            <i className="fas fa-user-circle" />
         </button>
         <ul className={ulClassName} ref={ulRef}>
            {user ? (
               <>
                  <li className="helloClass">{`Hello, ${user.firstName}`}</li>
                  <li className="emailClass">{user.email}</li>
                  <li className="manageSpotsLi">
                     <button onClick={manageSpots} className="manageButton">
                        Manage Spots
                     </button>
                  </li>
                  <li className="logoutLi">
                     <button onClick={logout} className="logoutButton">
                        Log Out
                     </button>
                  </li>
               </>
            ) : (
               <>
                  <OpenModalButton
                     buttonText="Log In"
                     onButtonClick={closeMenu}
                     modalComponent={<LoginFormModal />}
                  />

                  <OpenModalButton
                     buttonText="Sign Up"
                     onButtonClick={closeMenu}
                     modalComponent={<SignupFormModal />}
                  />
               </>
            )}
         </ul>
      </>
   );
}

export default ProfileButton;
