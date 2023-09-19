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
    
   })
}

export default SpotForm;
