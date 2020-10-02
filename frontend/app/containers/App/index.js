/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import OverviewPage from 'containers/OverviewPage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Navigation from 'containers/Navigation';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/overview" />} />
        <Route exact path="/overview" component={OverviewPage} />
        <Route exact path="/settings" component={SettingsPage} />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
