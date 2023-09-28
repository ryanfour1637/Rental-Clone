function RatingBanner({ spot }) {
   return (
      <div className="ratingDiv">
         <div className="starDiv">
            <span>
               <i className="fa-solid fa-star"></i>
            </span>
            <span>{spot.avgRating?.toFixed(1) || "New!"}</span>
         </div>
         <div className="starDiv">
            {spot.numReviews > 0 && <span className="smallDot">·</span>}
            <span>
               {spot.numReviews == 1
                  ? `${spot.numReviews} review`
                  : spot.numReviews > 1
                  ? `${spot.numReviews} reviews`
                  : ""}
            </span>
         </div>
      </div>
   );
}

export default RatingBanner;
