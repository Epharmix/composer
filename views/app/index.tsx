import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Loadable from 'react-loadable';
import { LoadingPage } from '@pages';

/**
 * This component acts as the App Shell
 * All routes are lazy-loaded to take advantage
 * of code splitting
 */
const SamplePage = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ '../components/pages/sample-page'),
  loading: LoadingPage,
});

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SamplePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
