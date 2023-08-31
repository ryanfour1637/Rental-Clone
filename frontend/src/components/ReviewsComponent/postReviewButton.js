import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

function PostReviewButton() {
   const [reviewText, setReviewText] = useState("");
   return (
      <>
         <h2>How was your stay?</h2>
         <form>
            <textarea
               value={reviewText}
               onChange={(e) => setReviewText(e.target.value)}
               placeholder="Leave your review here..."
               rows="5"
            ></textarea>

            <button type="submit" disabled={reviewText.length < 10}>
               Submit Your Review
            </button>
         </form>
      </>
   );
}

export default PostReviewButton;
