import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useParams } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SingleSpot from "./components/SingleSpot";
import CreateNewSpot from "./components/NewSpotComponent";
import EditSpot from "./components/EditSpotComponent";
import ManageSpots from "./components/ManageSpots";
import NotFound from "./components/urlNotFound";

function App() {
   const dispatch = useDispatch();
   const [isLoaded, setIsLoaded] = useState(false);
   useEffect(() => {
      dispatch(sessionActions.thunkRestoreUser()).then(() => setIsLoaded(true));
   }, [dispatch]);

   return (
      <>
         <Navigation isLoaded={isLoaded} />
         <Route exact path="/" component={HomePage} />
         <Route exact path="/spots/:spotId" component={SingleSpot} />
         {isLoaded && (
            <Switch>
               <Route exact path="/spots" component={CreateNewSpot} />
               <Route exact path="/spots/:id/edit" component={EditSpot} />
               <Route
                  exact
                  path="/spots/:userId/manage"
                  component={ManageSpots}
               />
               <Route component={NotFound} />
            </Switch>
         )}
      </>
   );
}

export default App;
