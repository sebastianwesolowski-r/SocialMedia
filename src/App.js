import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import {selectAccess} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';

import Header from './components/header/header.component';
import HeaderPanel from './components/header-panel/header-panel.component';

import LandingPage from './pages/landing-page/landing-page.component';
import FeedPage from './pages/feed-page/feed-page.component';
import ProfilePage from './pages/profile-page/profile-page.component';

import ErrorBoundary from './components/error-boundary/error-boundary.component';

import './App.css';

function App({checkUserSession, access}) {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      {
        access ? (
          <HeaderPanel />
        ) : (
          <Header />
        )
      }
      <ErrorBoundary>
        <Switch>
          <Route exact path="/" render={() => access ? (
              <Redirect to="/feed" />
            ) : (
              <LandingPage />
            )
          } />
          <Route path="/feed" render={() => access ? (
              <FeedPage />
            ) : (
              <Redirect to="/" />
            )
          } />
          <Route path="/profile" component={ProfilePage}/>
        </Switch>
    </ErrorBoundary>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  access: selectAccess
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
