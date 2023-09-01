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
      <>
         <h1>Log In</h1>
         <form onSubmit={handleSubmit}>
            <label>
               Username or Email
               <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
               />
            </label>
            <label>
               Password
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </label>
            {errors.credential && <p>{errors.credential}</p>}
            <button
               type="submit"
               disabled={credential.length < 4 || password.length < 6}
            >
               Log In
            </button>
         </form>

         <button type="submit" onClick={demoUserSubmit}>
            Log in as Demo User
         </button>
      </>
   );
}

export default LoginFormModal;
