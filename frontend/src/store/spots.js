import { csrfFetch } from "./csrf";

const READ_ALL_SPOTS = "spots/actionReadSpots";
const READ_ONE_SPOT = "spots/actionReadOneSpot";
const CREATE_SPOT = "spots/actionCreateSpot";
const UPDATE_SPOT = "spots/actionUpdateSpot";
const DELETE_SPOT = "spots/actionDeleteSpot";
const ADD_IMAGE = "spots/actionAddImage";

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

const actionCreateSpot = (spot) => {
   return {
      type: CREATE_SPOT,
      payload: spot,
   };
};

const actionUpdateSpot = (spot) => {
   return {
      type: UPDATE_SPOT,
      payload: spot,
   };
};

const actionDeleteSpot = (spot) => {
   return {
      type: DELETE_SPOT,
      payload: spot,
   };
};

const actionAddImage = (img) => {
   return {
      type: ADD_IMAGE,
      payload: img,
   };
};

export const thunkReadSpots = () => async (dispatch) => {
   const res = await csrfFetch("/api/spots?size=8");
   const data = await res.json();
   dispatch(actionReadSpots(data.Spots));
};

export const thunkReadOneSpot = (spotId) => async (dispatch) => {
   const res = await csrfFetch(`/api/spots/${spotId}`);
   const data = await res.json();
   dispatch(actionReadOneSpot(data));
};

export const thunkCreateSpot = (spot) => async (dispatch) => {
   const { address, city, state, country, name, description, price } = spot;
   const res = await csrfFetch("/api/spots", {
      method: "POST",
      body: JSON.stringify({
         address,
         city,
         state,
         country,
         name,
         description,
         price,
      }),
   });

   if (res.ok) {
      const data = await res.json();
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
   // dispatch(actionCreateSpot(data));
};

export const thunkAddImage = (img, spot) => async (dispatch) => {
   const { url, preview } = img;
   const { id } = spot;
   const spotId = id;
   const res = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      body: JSON.stringify({ url, preview }),
   });
   const data = await res.json();
   // dispatch(actionAddImage(data));
};

// left off here on this page. Trying to figure out how I am going to set the spot but I think I can do it with the readonespot function above.
export const thunkUpdateSpot = (spot) => async (dispatch) => {
   const { address, city, state, country, name, description, price, id } = spot;
   const res = await csrfFetch(`/api/spots/${id}`, {
      method: "PUT",
      body: JSON.stringify({
         address,
         city,
         state,
         country,
         name,
         description,
         price,
      }),
   });

   const data = await res.json();
   // dispatch(actionCreateSpot(data));
};

const initialState = {
   allSpots: {},
   singleSpot: {},
};

const spotsReducer = (state = initialState, action) => {
   let newState;
   switch (action.type) {
      case READ_ALL_SPOTS:
         // make it into an object and normalize
         newState = { ...state, allSpots: {} };
         action.payload.forEach((spot) => (newState.allSpots[spot.id] = spot));
         return newState;
      case READ_ONE_SPOT:
         newState = { ...state, singleSpot: {} };
         newState.singleSpot = action.payload;
         return newState;
      case CREATE_SPOT:
         newState = { ...state, allSpots: { ...state.allSpots } };
         newState.allSpots[action.payload.id] = action.payload;
         return newState;
      case ADD_IMAGE:
         newState = {
            ...state,
            singleSpot: {
               SpotImages: [...state.singleSpot.SpotImages, ...action.payload],
            },
         };
         return newState;
      default:
         return state;
   }
};

export default spotsReducer;
