import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import Header from './components/header/header.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import LandingPage from './pages/landing-page/landing-page.component';
import FeedPage from './pages/feed-page/feed-page.component';
import ProfilePage from './pages/profile-page/profile-page.component';
import NotFound from './pages/notfound/notfound.component';

import AuthenticatedRoute from './custom-routes/authenticated-route';
import UnauthenticatedRoute from './custom-routes/unauthenticated-route';

import {selectAccess} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';

import './App.css';

function App({checkUserSession, access}) {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <>
      {
        access ? (
          <Header />
        ) : null
      }
      <Switch>
        <UnauthenticatedRoute
          exact path="/"
          component={LandingPage}
          appProps={{access}}
        />
        <AuthenticatedRoute
          exact path="/feed"
          component={FeedPage}
          appProps={{access}}
        />
        <AuthenticatedRoute
          path={"/profile"}
          component={ProfilePage}
          appProps={{access}}
        />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  access: selectAccess
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
