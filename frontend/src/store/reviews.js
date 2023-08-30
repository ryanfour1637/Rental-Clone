import { csrfFetch } from "./csrf";

const READ_ALL_REVIEWS = "reviews/actionReadReviewsOneSpot";

const actionReadReviewsOneSpot = (reviews) => {
   return {
      type: READ_ALL_REVIEWS,
      payload: reviews,
   };
};

export const thunkReadReviewsOneSpot = (spotId) => async (dispatch) => {
   const res = await csrfFetch(`/api/spots/${spotId}`);

   if (res.ok) {
      const data = await res.json();
      dispatch(actionReadReviewsOneSpot(data));
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
};

const initialState = {
   spot: {},
   user: {},
};

const reviewsReducer = (state = initialState, action) => {
   let newState;
   switch (action.type) {
    case READ_ALL_REVIEWS:
        
   }
};
