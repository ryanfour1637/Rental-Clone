import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useParams } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SingleSpot from "./components/SingleSpot";
import createNewSpot from "./components/NewSpotComponent";

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
               <Route exact path="/spots" component={createNewSpot} />
               <Route path="/spots/:id/edit" component={createNewSpot} />
            </Switch>
         )}
      </>
   );
}

export default App;
