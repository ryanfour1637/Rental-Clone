import { csrfFetch } from "./csrf";

const READ_ALL_SPOTS = "spots/actionReadSpots";
const READ_ONE_SPOT = "spots/actionReadOneSpot";

const actionReadSpots = (spots) => {
   return {
      type: READ_ALL_SPOTS,
      payload: spots,
   };
};

const actionReadOneSpot = (spot) => {
   return {
      type: READ_ONE_SPOT,
      payload: spot,
   };
};

export const thunkReadSpots = () => async (dispatch) => {
   const res = await csrfFetch("/api/spots");
   const data = await res.json();
   dispatch(actionReadSpots(data.Spots));
};

export const thunkReadOneSpot = () => async (dispatch) => {
   const res = await c;
};

const initialState = { Spots: {} };

const spotsReducer = (state = initialState, action) => {
   let newState;
   switch (action.type) {
      case READ_SPOTS:
         // make it into an object and normalize
         newState = Object.assign({}, state);
         action.payload.forEach((spot) => (newState[spot.id] = spot));
         return newState;
      default:
         return state;
   }
};

export default spotsReducer;
