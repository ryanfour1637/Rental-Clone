import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./newSpotComponent.css";
import { thunkCreateSpot, thunkAddImage } from "../../store/spots";

function createNewSpot() {
   const dispatch = useDispatch();
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

   useEffect(() => {
      const errors = {};
      if (country.length < 1) errors["country"] = "Country is required";
      if (address.length < 1) errors["address"] = "Address is required";
      if (city.length < 1) errors["city"] = "City is required";
      if (state.length < 1) errors["state"] = "State is required";
      if (description.length < 30)
         errors["description"] = "Description needs a minimum of 30 characters";
      if (title.length < 1) errors["title"] = "Name is required";
      if (price.length < 1) errors["price"] = "Price is required";
      if (previewImage.length < 1)
         errors["previewImage"] = "Preview image is required.";
      if (
         image2.toLowerCase().endsWith(".png") ||
         image2.toLowerCase().endsWith(".jpeg") ||
         image2.toLowerCase().endsWith(".jpg")
      ) {
      } else if (image2.length < 1) {
      } else {
         errors["image2"] = "Image URL must end in .png, .jpg, or .jpeg";
      }
      if (
         image3.toLowerCase().endsWith(".png") ||
         image3.toLowerCase().endsWith(".jpeg") ||
         image3.toLowerCase().endsWith(".jpg")
      ) {
      } else if (image3.length < 1) {
      } else {
         errors["image3"] = "Image URL must end in .png, .jpg, or .jpeg";
      }
      if (
         image4.toLowerCase().endsWith(".png") ||
         image4.toLowerCase().endsWith(".jpeg") ||
         image4.toLowerCase().endsWith(".jpg")
      ) {
      } else if (image4.length < 1) {
      } else {
         errors["image4"] = "Image URL must end in .png, .jpg, or .jpeg";
      }
      if (
         image5.toLowerCase().endsWith(".png") ||
         image5.toLowerCase().endsWith(".jpeg") ||
         image5.toLowerCase().endsWith(".jpg")
      ) {
      } else if (image5.length < 1) {
      } else {
         errors["image5"] = "Image URL must end in .png, .jpg, or .jpeg";
      }
   }, [
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
      image5,
   ]);
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (Object.values(errors).length > 0) {
         setErrors(errors);
      } else {
         const newSpot = {
            address,
            city,
            state,
            country,
            name: title,
            description,
            price,
         };
         const returnSpot = await dispatch(thunkCreateSpot(newSpot));

         if (previewImage.length > 0) {
            const createPreviewImage = {
               url: previewImage,
               preview: true,
            };
            dispatch(thunkAddImage(createPreviewImage, returnSpot));
         }

         if (image2.length > 0) {
            const img = {
               url: image2,
               preview: false,
            };
            dispatch(thunkAddImage(img, returnSpot));
         }
         if (image3.length > 0) {
            const img = {
               url: image3,
               preview: false,
            };
            dispatch(thunkAddImage(img, returnSpot));
         }
         if (image4.length > 0) {
            const img = {
               url: image4,
               preview: false,
            };
            dispatch(thunkAddImage(img, returnSpot));
         }
         if (image5.length > 0) {
            const img = {
               url: image5,
               preview: false,
            };
            dispatch(thunkAddImage(img, returnSpot));
         }
      }
   };

   return (
      <>
         <div>
            <h1>Create a new Spot</h1>
            <h2>Where's your place located?</h2>
            <h4>
               Guests will only get your exact address once they booked a
               reservation.
            </h4>
         </div>
         <form onSubmit={handleSubmit}>
            <div>
               <label>
                  Country {errors.country}
                  <input
                     type="text"
                     value={country}
                     onChange={(e) => setCountry(e.target.value)}
                     placeholder="Country"
                  />
               </label>
               <label>
                  Street Address {errors.address}
                  <input
                     type="text"
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                     placeholder="Address"
                  />
               </label>
            </div>
            <div>
               <label>
                  City {errors.city}
                  <input
                     type="text"
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                     placeholder="City"
                  />
               </label>
               <label>
                  State {errors.state}
                  <input
                     type="text"
                     value={state}
                     onChange={(e) => setState(e.target.value)}
                     placeholder="STATE"
                  />
               </label>
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
               <p>{errors.description}</p>
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
               <p>{errors.title}</p>
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
                  <p>{errors.price}</p>
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
               <p>{errors.previewImage}</p>
               <input
                  type="url"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                  placeholder="Image URL"
               />
               <p>{errors.image2}</p>
               <input
                  type="url"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                  placeholder="Image URL"
               />
               <p>{errors.image3}</p>
               <input
                  type="url"
                  value={image4}
                  onChange={(e) => setImage4(e.target.value)}
                  placeholder="Image URL"
               />
               <p>{errors.image4}</p>
               <input
                  type="url"
                  value={image5}
                  onChange={(e) => setImage5(e.target.value)}
                  placeholder="Image URL"
               />
               <p>{errors.image5}</p>
            </div>
            <button type="submit">Create new spot</button>
         </form>
      </>
   );
}

export default createNewSpot;
