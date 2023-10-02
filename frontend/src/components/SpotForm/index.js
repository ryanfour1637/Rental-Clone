import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
   thunkCreateSpot,
   thunkAddImage,
   thunkUpdateSpot,
   thunkReadSpots,
   thunkReadOneSpot,
} from "../../store/spots";
import { checkForInputErrorsCreate } from "./helpers";

import "./newSpotComponent.css";
import { checkForInputErrorsNoImages } from "./helpers";

function SpotForm() {
   const history = useHistory();
   const dispatch = useDispatch();
   const { id } = useParams();
   const theSpot = useSelector((state) => state.spots.allSpots[id]);

   const [update, setUpdate] = useState(false);
   const [country, setCountry] = useState("");
   const [address, setAddress] = useState("");
   const [city, setCity] = useState("");
   const [state, setState] = useState("");
   const [description, setDescription] = useState("");
   const [name, setName] = useState("");
   const [price, setPrice] = useState("");
   const [previewImage, setPreviewImage] = useState("");
   const [image2, setImage2] = useState("");
   const [image3, setImage3] = useState("");
   const [image4, setImage4] = useState("");
   const [image5, setImage5] = useState("");
   const [errors, setErrors] = useState({});

   // console.log(id);
   // getting my spot data out of the store if there is an id
   // but I think I need a useEffect to populate the data in my store I think

   // using this to track if a parameter is coming in. If there is a param its an update spot and if not its a new spot
   useEffect(() => {
      if (id !== undefined && theSpot !== undefined) {
         setUpdate(true);
         setCountry(theSpot.country);
         setAddress(theSpot.address);
         setCity(theSpot.city);
         setState(theSpot.state);
         setDescription(theSpot.description);
         setName(theSpot.name);
         setPrice(theSpot.price);
      } else if (id == undefined) {
         setUpdate(false);
         setCountry("");
         setAddress("");
         setCity("");
         setState("");
         setDescription("");
         setName("");
         setPrice("");
      }
   }, [id, theSpot]);

   if (id !== undefined && !theSpot) {
      dispatch(thunkReadOneSpot(id));
      return null;
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!update) {
         const errors = checkForInputErrorsCreate(
            country,
            address,
            city,
            state,
            description,
            name,
            price,
            previewImage,
            image2,
            image3,
            image4,
            image5
         );
         setErrors(errors);
         if (Object.values(errors).length > 0) {
         } else {
            const newSpot = {
               address,
               city,
               state,
               country,
               name,
               description,
               price,
            };
            const returnSpot = await dispatch(thunkCreateSpot(newSpot));

            // make these an array and modify backend to accept an array of images and put them in the DB. which index I want as a preview
            if (previewImage.length > 0) {
               const createPreviewImage = {
                  url: previewImage,
                  preview: true,
               };
               dispatch(thunkAddImage(createPreviewImage, returnSpot.id));
            }

            if (image2.length > 0) {
               const img = {
                  url: image2,
                  preview: false,
               };
               dispatch(thunkAddImage(img, returnSpot.id));
            }
            if (image3.length > 0) {
               const img = {
                  url: image3,
                  preview: false,
               };
               dispatch(thunkAddImage(img, returnSpot.id));
            }
            if (image4.length > 0) {
               const img = {
                  url: image4,
                  preview: false,
               };
               dispatch(thunkAddImage(img, returnSpot.id));
            }
            if (image5.length > 0) {
               const img = {
                  url: image5,
                  preview: false,
               };
               dispatch(thunkAddImage(img, returnSpot.id));
            }
            history.push(`/spots/${returnSpot.id}`);
         }
      } else if (update) {
         const errors = checkForInputErrorsNoImages(
            country,
            address,
            city,
            state,
            description,
            name,
            price
         );
         setErrors(errors);
         if (Object.values(errors).length > 0) {
         } else {
            const newSpot = {
               id,
               address,
               city,
               state,
               country,
               name,
               description,
               price,
            };
            await dispatch(thunkUpdateSpot(newSpot));
            history.push(`/spots/${id}`);
         }
      }
   };
   return (
      <>
         <div className="aboveFormDiv">
            <h2>{update ? "Update your Spot" : "Create a new Spot"}</h2>
            <h3>Where's your place located?</h3>
            <h4>
               Guests will only get your exact address once they booked a
               reservation.
            </h4>
         </div>
         <form className="formClass" onSubmit={handleSubmit}>
            <div className="oneAcross">
               <label>
                  Country
                  <input
                     type="text"
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                     placeholder="Country"
                  />
               </label>
               {errors.country && <p>{errors.country}</p>}
            </div>
            <div className="oneAcross">
               <label>
                  Street Address
                  <input
                     type="text"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     placeholder="Address"
                  />
               </label>
               {errors.address && <p>{errors.address}</p>}
            </div>
            <div className="sameLine">
               <div className="cityDiv">
                  <label>
                     City
                     <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                     />
                  </label>
                  {errors.city && <p>{errors.city}</p>}
               </div>
               <div className="commaDiv">,</div>
               <div className="stateDiv">
                  <label>
                     State
                     <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="STATE"
                     />
                  </label>
                  {errors.state && <p>{errors.state}</p>}
               </div>
            </div>

            <h3 className="noMargin">Describe your place to guests</h3>
            <h4 className="lessMargin">
               Mention the best features of your space, any special amenities
               like fast wifi or parking, and what you love about the
               neighborhood
            </h4>
            <textarea
               className="textArea"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               placeholder="Please write at least 30 characters"
               rows="5"
            ></textarea>
            {errors.description && <p>{errors.description}</p>}

            <div className="bottomDiv">
               <div className="bottomDiv2">
                  <h3>Create a title for your spot</h3>
                  <label>
                     Catch guests' attention with a spot title that highlights
                     what makes your place special.
                     <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name of your spot"
                     />
                  </label>
                  {errors.name && <p>{errors.name}</p>}
               </div>
            </div>
            <div className="mostBottom">
               <h3>Set a base price for your spot</h3>
               <h4>
                  Competitive pricing can help your listing stand out and rank
                  higher in search results.
               </h4>
               <div className="priceDiv">
                  <label>
                     $
                     <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price per night (USD)"
                     />
                  </label>
                  {errors.price && <p>{errors.price}</p>}
               </div>
            </div>
            {!update && (
               <div className="lastDiv">
                  <h3 className="photoH3">Liven up your spot with photos</h3>
                  <div className="oneAcross">
                     <label>
                        Submit a link to at least one photo to publish your
                        spot.
                        <input
                           className="topInput"
                           type="url"
                           value={previewImage}
                           onChange={(e) => setPreviewImage(e.target.value)}
                           placeholder="Preview Image URL"
                        />
                     </label>
                     {errors.previewImage && <p>{errors.previewImage}</p>}
                  </div>
                  <div className="oneAcross">
                     <input
                        type="url"
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                        placeholder="Image URL"
                     />
                     {errors.image2 && <p>{errors.image2}</p>}
                  </div>
                  <div className="oneAcross">
                     <input
                        type="url"
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                        placeholder="Image URL"
                     />
                     {errors.image3 && <p>{errors.image3}</p>}
                  </div>
                  <div className="oneAcross">
                     <input
                        type="url"
                        value={image4}
                        onChange={(e) => setImage4(e.target.value)}
                        placeholder="Image URL"
                     />
                     {errors.image4 && <p>{errors.image4}</p>}
                  </div>
                  <div className="oneAcross">
                     <input
                        type="url"
                        value={image5}
                        onChange={(e) => setImage5(e.target.value)}
                        placeholder="Image URL"
                     />
                     {errors.image5 && <p>{errors.image5}</p>}
                  </div>
               </div>
            )}
            <button className="button" type="submit">
               {update ? "Update your Spot" : "Create Spot"}
            </button>
         </form>
      </>
   );
}

export default SpotForm;
