import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./newSpotComponent.css";

function createNewSpot() {
   const dispatch = useDispatch();
   const [country, setCountry] = useState();
   const [address, setAddress] = useState();
   const [city, setCity] = useState();
   const [state, setState] = useState();
   const [description, setDescription] = useState();
   const [title, setTitle] = useState();
   const [price, setPrice] = useState();
   const [previewImage, setPreviewImage] = useState();
   const [image2, setImage2] = useState();
   const [image3, setImage3] = useState();
   const [image4, setImage4] = useState();
   const [image5, setImage5] = useState();

   return (
      <>
         <h1>Create a new Spot</h1>
         <h2>Where's your place located?</h2>
         <h4>
            Guests will only get your exact address once they booked a
            reservation.
         </h4>
         <form onSubmit={handleSubmit}>
            <label>
               Country
               <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
               />
            </label>
            <label>
               Street Address
               <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
               />
            </label>
            <label>
               City
               <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
               />
            </label>
            <label>
               State
               <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
               />
            </label>
            <h2>Describe your place to guests</h2>
            <h4>
               Mention the best features of your space, any special amenities
               like fast wifi or parking, and what you love about the
               neighborhood
            </h4>
            <textarea></textarea>
         </form>
      </>
   );
}
