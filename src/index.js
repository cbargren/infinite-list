import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';

import store from './store';
import App from './components/App';

injectGlobal`
  body {
    font-family: 'Roboto';
    font-size: 14px;
  }
`;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
