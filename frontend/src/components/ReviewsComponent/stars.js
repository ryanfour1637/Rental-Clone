import React, { useEffect, useState } from "react";
import "./stars.css";

function StarRating({ stars, setStars }) {
   const [hover, setHover] = useState();
   return (
      <div>
         {[...Array(5)].map((star, i) => {
            i += 1;
            return (
               <button
                  onMouseEnter={() => setHover(i)}
                  type="button"
                  key={i}
                  className={i <= (hover || stars) ? "fillIn" : "leaveEmpty"}
                  onClick={() => setStars(i)}
                  onMouseLeave={() => setHover(stars)}
               >
                  <span>
                     <i className="fa-solid fa-star"></i>
                  </span>
               </button>
            );
         })}
         <p>Stars</p>
      </div>
   );
}

export default StarRating;
