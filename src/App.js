import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import Header from './components/header/header.component';

import LandingPage from './pages/landing-page/landing-page.component';
import FeedPage from './pages/feed-page/feed-page.component';
import ProfilePage from './pages/profile-page/profile-page.component';
import PostPage from './pages/post-page/post-page.component';
import NotFound from './pages/notfound/notfound.component';

import AuthenticatedRoute from './custom-routes/authenticated-route';
import UnauthenticatedRoute from './custom-routes/unauthenticated-route';

import {selectAccess} from './redux/user/user.selectors';

import './App.css';

const App = ({access}) => (
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
        exact path="/profile/:userName"
        component={ProfilePage}
        appProps={{access}}
      />
      <AuthenticatedRoute
        exact path="/post/:postId"
        component={PostPage}
        appProps={{access}}
      />
      <Route component={NotFound} />
    </Switch>
  </>
);


const mapStateToProps = createStructuredSelector({
  access: selectAccess
});

export default connect(mapStateToProps)(App);
