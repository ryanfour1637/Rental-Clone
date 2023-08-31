import React, { useEffect, useState } from "react";

function StarRating() {
   const [rating, setRating] = useState();
   return (
      <div>
         {[...Array(5)].map((star) => {
            return (
               <button type="button">
                  <span>
                     <i class="fa fa-star-o" aria-hidden="true"></i>
                  </span>
               </button>
            );
         })}
      </div>
   );
}
