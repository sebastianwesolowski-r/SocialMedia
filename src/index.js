import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';

import {store} from './redux/store';

import theme from './theme';

import App from './App';

import ErrorBoundary from './components/error-boundary/error-boundary.component';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

