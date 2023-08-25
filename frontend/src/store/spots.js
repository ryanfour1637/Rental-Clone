import { csrfFetch } from "./csrf";

const SET_SPOTS = "spots/setSpots";

const actionSetSpots = (spots) => {
   return {
      type: SET_SPOTS,
      payload: spots,
   };
};
