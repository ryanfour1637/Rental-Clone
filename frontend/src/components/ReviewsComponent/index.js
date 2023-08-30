import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Reviews() {
   const dispatch = useDispatch();
   const { spotId } = useParams();
}

// create my slice of state and figure out how to get it
