import { checkForInputErrors } from "../NewSpotComponent/helpers";
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

function EditSpot() {
   const history = useHistory();
   const dispatch = useDispatch();

   const { id } = useParams();
   const singleSpot = useSelector((state) => state.spots.allSpots[id]);

   const [country, setCountry] = useState("");
   const [address, setAddress] = useState("");
   const [city, setCity] = useState("");
   const [state, setState] = useState("");
   const [description, setDescription] = useState("");
   const [title, setTitle] = useState("");
   const [price, setPrice] = useState("");
   const [previewImage, setPreviewImage] = useState("");
   const [image2, setImage2] = useState("");
   const [image3, setImage3] = useState("");
   const [image4, setImage4] = useState("");
   const [image5, setImage5] = useState("");
   const [errors, setErrors] = useState({});
   const [update, setUpdate] = useState(false);

   useEffect(() => {
      dispatch(thunkReadSpots());
   }, [dispatch]);

   useEffect(() => {
      if (!singleSpot) {
         console.log("no spot found");
      } else {
         setUpdate(true);
         setCountry(singleSpot.country);
         setAddress(singleSpot.address);
         setCity(singleSpot.city);
         setState(singleSpot.state);
         setDescription(singleSpot.description);
         setTitle(singleSpot.name);
         setPrice(singleSpot.price);
         setPreviewImage(singleSpot.previewImage);
      }
   }, [singleSpot]);
   const handleSubmit = async (e) => {
      // prevent the page from reloading
      e.preventDefault();

      //validate any errors
      const errors = checkForInputErrors(
         country,
         address,
         city,
         state,
         description,
         title,
         price,
         previewImage,
         image2,
         image3,
         image4,
         image5
      );
      setErrors(errors);

      // this is the post/put to the db depending on if its an update or not
      if (Object.values(errors).length > 0) {
      } else {
         const newSpot = {
            id,
            address,
            city,
            state,
            country,
            name: title,
            description,
            price,
         };
         await dispatch(thunkUpdateSpot(newSpot));

         if (previewImage.length > 0) {
            const createPreviewImage = {
               url: previewImage,
               preview: true,
            };
            dispatch(thunkAddImage(createPreviewImage, id));
         }

         if (image2.length > 0) {
            const img = {
               url: image2,
               preview: false,
            };
            dispatch(thunkAddImage(img, id));
         }
         if (image3.length > 0) {
            const img = {
               url: image3,
               preview: false,
            };
            dispatch(thunkAddImage(img, id));
         }
         if (image4.length > 0) {
            const img = {
               url: image4,
               preview: false,
            };
            dispatch(thunkAddImage(img, id));
         }
         if (image5.length > 0) {
            const img = {
               url: image5,
               preview: false,
            };
            dispatch(thunkAddImage(img, id));
         }
         history.push(`/spots/${id}`);
      }
   };

   return (
      <>
         <div className="aboveFormDiv">
            <h2>Update your Spot</h2>
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Name of your spot"
                     />
                  </label>
                  {errors.title && <p>{errors.title}</p>}
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
            <div className="lastDiv">
               <h3 className="photoH3">Liven up your spot with photos</h3>
               <div className="oneAcross">
                  <label>
                     Submit a link to at least one photo to publish your spot.
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
            <button
               className="button"
               type="submit"
               disabled={
                  country.length < 1 &&
                  address.length < 1 &&
                  city.length < 1 &&
                  state.length < 1 &&
                  description.length < 1 &&
                  title.length < 1 &&
                  price.length < 1 &&
                  previewImage.length < 1 &&
                  image2.length < 1 &&
                  image3.length < 1 &&
                  image4.length < 1 &&
                  image5.length < 1
               }
            >
               Update your Spot
            </button>
         </form>
      </>
   );
}

export default EditSpot;
