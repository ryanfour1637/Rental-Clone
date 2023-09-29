import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
   const dispatch = useDispatch();
   const [credential, setCredential] = useState("");
   const [password, setPassword] = useState("");
   const [errors, setErrors] = useState({});
   const { closeModal } = useModal();
   const history = useHistory();

   const demoUserSubmit = (e) => {
      e.preventDefault();
      return dispatch(
         sessionActions.thunkLogin({
            credential: "Demouser@aol.com",
            password: "password",
         })
      ).then(() => {
         closeModal();
         history.push("/");
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setErrors({});
      return dispatch(sessionActions.thunkLogin({ credential, password }))
         .then(() => {
            closeModal();
            history.push("/");
         })
         .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
               setErrors(data.errors);
            }
         });
   };

   return (
      <div className="loginPage">
         <h1 className="logInText">Log In</h1>
         <form onSubmit={handleSubmit}>
            <div className="userNameDiv">
               <label>
                  <input
                     type="text"
                     value={credential}
                     onChange={(e) => setCredential(e.target.value)}
                     required
                     placeholder="Username or Email"
                     className="userInput"
                  />
               </label>
               <label>
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     placeholder="Password"
                     className="userPassword"
                  />
               </label>
               {errors.credential && <p>{errors.credential}</p>}
            </div>
            <button
               type="submit"
               disabled={credential.length < 4 || password.length < 6}
               className="loginSubmitButton"
            >
               Log In
            </button>
         </form>

         <button
            type="submit"
            onClick={demoUserSubmit}
            className="demoUserButton"
         >
            Log in as Demo User
         </button>
      </div>
   );
}

export default LoginFormModal;
