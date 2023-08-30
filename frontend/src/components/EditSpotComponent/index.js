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
import { checkForInputErrors } from "../NewSpotComponent/helpers";

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
      if (update) {
         if (Object.values(errors).length > 0) {
         } else {
            const editedSpot = {
               id,
               address,
               city,
               state,
               country,
               name: title,
               description,
               price,
            };
            const res = await dispatch(thunkUpdateSpot(editedSpot));
            // i think this is how i get the error but will need to console log in the morning to be sure. Need to error handle on this side as well and display back to the user somehow.

            //also may not need to do this because if the person is never able to access the page at all to update it, it will not matter. check into if this is an option.
            history.push(`/spots/${id}`);
            // pick up here in the morning, I need to find out how to set an unauthorized error from the backend because I am the wrong user. In theory I shouldnt even be able to access this page at all. Figure out how to do that.
         }
      }
   };

   return (
      <>
         <div>
            <h1>Update your Spot</h1>
            <h2>Where's your place located?</h2>
            <h4>
               Guests will only get your exact address once they booked a
               reservation.
            </h4>
         </div>
         <form onSubmit={handleSubmit}>
            <div>
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
            <div>
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
            <div>
               <h2>Describe your place to guests</h2>
               <h4>
                  Mention the best features of your space, any special amenities
                  like fast wifi or parking, and what you love about the
                  neighborhood
               </h4>
               <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please write at least 30 characters"
                  rows="5"
               ></textarea>
               {errors.description && <p>{errors.description}</p>}
            </div>
            <div>
               <h2>Create a title for your spot</h2>
               <label>
                  Catch guests' attention with a spot title that highlights what
                  makes your place special.
                  <input
                     type="text"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     placeholder="Name of your spot"
                  />
               </label>
               {errors.title && <p>{errors.title}</p>}
            </div>
            <div>
               <h2>Set a base price for your spot</h2>
               <h4>
                  Competitive pricing can help your listing stand out and rank
                  higher in search results.
               </h4>
               <div>
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
            <div>
               <h2>Liven up your spot with photos</h2>
               <label>
                  Submit a link to at least one photo to publish your spot.
                  <input
                     type="url"
                     value={previewImage}
                     onChange={(e) => setPreviewImage(e.target.value)}
                     placeholder="Preview Image URL"
                  />
               </label>
               {errors.previewImage && <p>{errors.previewImage}</p>}
               <input
                  type="url"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                  placeholder="Image URL"
               />
               {errors.image2 && <p>{errors.image2}</p>}
               <input
                  type="url"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                  placeholder="Image URL"
               />
               {errors.image3 && <p>{errors.image3}</p>}
               <input
                  type="url"
                  value={image4}
                  onChange={(e) => setImage4(e.target.value)}
                  placeholder="Image URL"
               />
               {errors.image4 && <p>{errors.image4}</p>}
               <input
                  type="url"
                  value={image5}
                  onChange={(e) => setImage5(e.target.value)}
                  placeholder="Image URL"
               />
               {errors.image5 && <p>{errors.image5}</p>}
            </div>
            <button type="submit">Create spot</button>
         </form>
      </>
   );
}

export default EditSpot;
