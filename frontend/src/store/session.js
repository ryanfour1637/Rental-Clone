import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const actionSetUser = (user) => {
   return { type: SET_USER, payload: user };
};

const actionRemoveUser = () => {
   return { type: REMOVE_USER };
};

export const thunkLogin = (user) => async (dispatch) => {
   const { credential, password } = user;
   const res = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
         credential,
         password,
      }),
   });
   const data = await res.json();
   dispatch(actionSetUser(data.user));
   return res;
};

export const thunkRestoreUser = () => async (dispatch) => {
   const res = await csrfFetch("/api/session");
   const data = await res.json();
   dispatch(actionSetUser(data.user));
   return res;
};

export const thunkSignup = (user) => async (dispatch) => {
   const { username, firstName, lastName, email, password } = user;
   const res = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
         username,
         firstName,
         lastName,
         email,
         password,
      }),
   });
   const data = await res.json();
   dispatch(actionSetUser(data.user));
   return res;
};

export const thunkLogout = () => async (dispatch) => {
   const res = await csrfFetch("/api/session", {
      method: "DELETE",
   });
   dispatch(actionRemoveUser());
   return res;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
   let newState;
   switch (action.type) {
      case SET_USER:
         newState = Object.assign({}, state);
         newState.user = action.payload;
         return newState;
      case REMOVE_USER:
         newState = Object.assign({}, state);
         newState.user = null;
         return newState;
      default:
         return state;
   }
};

export default sessionReducer;
