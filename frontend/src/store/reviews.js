import { csrfFetch } from "./csrf";

const READ_ALL_REVIEWS = "reviews/actionReadReviewsOneSpot";
const CREATE_REVIEW = "reviews/actionCreateReview";

const actionReadReviewsOneSpot = (reviews) => {
   return {
      type: READ_ALL_REVIEWS,
      payload: reviews,
   };
};

const actionCreateReview = (review) => {
   return {
      type: CREATE_REVIEW,
      payload: review,
   };
};

export const thunkReadReviewsOneSpot = (spotId) => async (dispatch) => {
   const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

   if (res.ok) {
      const data = await res.json();
      dispatch(actionReadReviewsOneSpot(data.Reviews));
      return data;
   } else {
      const errors = await res.json();
      return errors;
   }
};

export const thunkCreateReview = (review, spotId) => async (dispatch) => {
   console.log("are we hitting 34");
   const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: "POST",
      body: JSON.stringify({
         review: review.review,
         stars: review.stars,
      }),
   });

   if (res.ok) {
      const data = await res.json();
      dispatch(actionCreateReview(data));
      console.log("this is the data", data);
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
         newState = { ...state, spot: {} };
         action.payload.forEach(
            (review) => (newState.spot[review.id] = review)
         );
         return newState;
      case CREATE_REVIEW:
         newState = { ...state, spot: { ...state.spot } };
         newState.spot[action.payload.id] = action.payload;
         return newState;
      default:
         return state;
   }
};

export default reviewsReducer;
