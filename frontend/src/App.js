import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useParams } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SingleSpot from "./components/SingleSpot";
import ManageSpots from "./components/ManageSpots";
import NotFound from "./components/urlNotFound";
import SpotForm from "./components/SpotForm";

function App() {
   const dispatch = useDispatch();
   const [isLoaded, setIsLoaded] = useState(false);
   useEffect(() => {
      dispatch(sessionActions.thunkRestoreUser()).then(() => setIsLoaded(true));
   }, [dispatch]);

   return (
      <>
         <Navigation isLoaded={isLoaded} />
         {isLoaded && (
            <Switch>
               <Route exact path="/" component={HomePage} />
               <Route exact path="/spots/:spotId" component={SingleSpot} />
               <Route exact path="/spots" component={SpotForm} />
               <Route exact path="/spots/:id/edit" component={SpotForm} />
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
