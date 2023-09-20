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
import { checkForInputErrors } from "./helpers";

import "./newSpotComponent.css";

function SpotForm() {
   const history = useHistory();
   const dispatch = useDispatch();
   const { id } = useParams();

   const [country, setCountry] = useState(singleSpot ? singleSpot.country : "");
   const [address, setAddress] = useState(singleSpot ? singleSpot.address : "");
   const [city, setCity] = useState(singleSpot ? singleSpot.city : "");
   const [state, setState] = useState(singleSpot ? singleSpot.state : "");
   const [description, setDescription] = useState(
      singleSpot ? singleSpot.description : ""
   );
   const [name, setName] = useState(singleSpot ? singleSpot.name : "");
   const [price, setPrice] = useState(singleSpot ? singleSpot.price : "");
   const [previewImage, setPreviewImage] = useState(
      singleSpot ? singleSpot.previewImage : ""
   );
   const [image2, setImage2] = useState(singleSpot ? singleSpot.city : "");
   const [image3, setImage3] = useState(singleSpot ? singleSpot.city : "");
   const [image4, setImage4] = useState(singleSpot ? singleSpot.city : "");
   const [image5, setImage5] = useState(singleSpot ? singleSpot.city : "");
   const [errors, setErrors] = useState({});
   const [update, setUpdate] = useState(false);
   const [spotToUpdate, setSpotToUpdate] = useState({});

   // getting my spot data out of the store if there is an id
   // but I think I need a useEffect to populate the data in my store I think
   const singleSpot = useSelector((state) => state.spots.allSpots[id]);

   // using this to track if a parameter is coming in. If there is a param its an update spot and if not its a new spot
   useEffect(() => {
      if (id.length > 0) {
         setUpdate(true);
      }
   }, [id]);


   //I need to do one handlesubmit if its create versus if its the other. And i need to figure out a way to make sure my handlesubmit knows which it is with the update state variable

   if (id.length > 0 && Object.values(singleSpot).length === 0) {
      dispatch(thunkReadOneSpot(id));
      return null;
   }
   // need a conditional to ensure I get data. in this case
   // if ID.length isnt greater than 0 then I render the form and dont dispatch anything
   // else if it is but there is no singleSpot data yet, I need to dispatch and return null
}

export default SpotForm;
