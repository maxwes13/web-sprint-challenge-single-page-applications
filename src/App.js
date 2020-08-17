import React from "react";
import Form from "./components/Form";
import Main from "./components/Main"
import { Route, Switch } from "react-router-dom"



const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path ="/pizza">
          <Form/>
        </Route>
      </Switch>
    </div> 
  );
};
export default App;
