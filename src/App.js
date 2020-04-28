import React from 'react';

import {Switch, Route} from 'react-router-dom';

import Header from './components/header/header.component';
import LandingPage from './pages/landing-page/landing-page.component';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </div>
  );
}

export default App;
