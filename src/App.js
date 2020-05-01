import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';

import Header from './components/header/header.component';

import LandingPage from './pages/landing-page/landing-page.component';
import FeedPage from './pages/feed-page/feed-page.component';
import ProfilePage from './pages/profile-page/profile-page.component';

import './App.css';

function App({currentUser, checkUserSession}) {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" render={() => currentUser ? (
            <Redirect to="/feed" />
          ) : (
            <LandingPage />
          )
        } />
        <Route path="/feed" component={FeedPage} />
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
