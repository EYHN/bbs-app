import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from 'containers/HomePage/Loadable';

import Header from './Header';

const App: React.SFC<{}> = () => (
  <>
    <Header />
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/news' component={HomePage} />
      <Route path='/categories' component={HomePage} />
      <Route path='/account' component={HomePage} />
    </Switch>
  </>
);

export default App;
