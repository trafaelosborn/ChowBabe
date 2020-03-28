import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup'
import Search from './Components/Search/Search'
import Profile from './Components/Profile/Profile'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path = "/" component = {Signin} />
          <Route exact path = "/signup" component = {Signup}/>
          <Route exact path = "/search" component = {Search}/>
          <Route exact path = "/Profile" component = {Profile}/>
        </Switch>
      </div>
     </Router>
  );
}

export default App;
