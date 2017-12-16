import React from 'react';
import { Switch, Route } from 'react-router';
import HomePage from 'containers/HomePage/Loadable';

import Header from './Header';

const App: React.SFC<{}> = (props) =>
  <div>
    <Header />
    <Switch>
      <Route exact path='/news' component={HomePage} />
      <Route exact path='/categories' component={HomePage} />
      <Route exact path='/account' component={HomePage} />
    </Switch>
  </div>;

export default App;
