import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { setConfiguration } from 'react-grid-system';

import './index.scss';

import { LoadingPage } from '@pages';

const rootElement = document.getElementById('root');

const App = Loadable({
  loader: () => import(/* webpackChunkName: "app" */ './app'),
  loading: LoadingPage,
});

// Default grid configuration for the app
setConfiguration({
  gutterWidth: 26,
  gridColumns: 24,
});

const Index = () => {
  return <App />;
};

const render = () => {
  ReactDOM.render(
    <Index/>,
    rootElement
  );
};

if (process.env.NODE_ENV !== 'production') {
  import('react-axe').then(({ default: axe }) => {
    axe(React, ReactDOM, 1000);
    render();
  });
} else {
  render();
}
