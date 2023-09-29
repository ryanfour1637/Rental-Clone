import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
   const dispatch = useDispatch();
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [errors, setErrors] = useState({});
   const { closeModal } = useModal();

   const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
         setErrors({});
         return dispatch(
            sessionActions.thunkSignup({
               email,
               username,
               firstName,
               lastName,
               password,
            })
         )
            .then(closeModal)
            .catch(async (res) => {
               const data = await res.json();
               if (data && data.errors) {
                  setErrors(data.errors);
               }
            });
      }
      return setErrors({
         confirmPassword:
            "Confirm Password field must be the same as the Password field",
      });
   };

   return (
      <div className="signupDiv">
         <h1 className="signup">Sign Up</h1>
         <form onSubmit={handleSubmit}>
            <div className="signupFormDiv">
               <label>
                  <input
                     type="text"
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     required
                     placeholder="First Name"
                     className="signupInputs"
                  />
               </label>
               {errors.firstName && <p>{errors.firstName}</p>}
               <label>
                  <input
                     type="text"
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                     required
                     placeholder="Last Name"
                     className="signupInputs"
                  />
               </label>
               {errors.lastName && <p>{errors.lastName}</p>}
               <label>
                  <input
                     type="text"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     placeholder="Email"
                     className="signupInputs"
                  />
               </label>
               {errors.email && <p>{errors.email}</p>}
               <label>
                  <input
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     required
                     placeholder="Username"
                     className="signupInputs"
                  />
               </label>
               {errors.username && <p>{errors.username}</p>}
               <label>
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     placeholder="Password"
                     className="signupInputs"
                  />
               </label>
               {errors.password && <p>{errors.password}</p>}
               <label>
                  <input
                     type="password"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     required
                     placeholder="Confirm Password"
                     className="signupInputs"
                  />
               </label>
               {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
            <button
               className="signupSubmitButton"
               type="submit"
               disabled={
                  email.length < 1 ||
                  username.length < 4 ||
                  firstName.length < 1 ||
                  lastName.length < 1 ||
                  password.length < 6 ||
                  confirmPassword.length < 6
               }
            >
               Sign Up
            </button>
         </form>
      </div>
   );
}

export default SignupFormModal;
