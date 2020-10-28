import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {HashRouter} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core/styles';

import {store, persistor} from './redux/store';

import theme from './theme';

import App from './App';

import ErrorBoundary from './components/error-boundary/error-boundary.component';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ThemeProvider>
      </HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

