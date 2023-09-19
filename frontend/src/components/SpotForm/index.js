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

   // need a conditional to ensure I get data. in this case 

   // i do not think I should need this code as the useSelector should get the data from above without needed the dispatch
   //    useEffect(() => {
   //       if (update) dispatch(thunkReadSpots());
   //    }, [dispatch]);
}

export default SpotForm;
