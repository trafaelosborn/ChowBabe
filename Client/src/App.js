import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path = "/" component = {Signin} />
          <Route exact path = "/signup" component = {Signup}/>
        </Switch>
      </div>
     </Router>
  );
}

export default App;
