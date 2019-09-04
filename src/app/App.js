import React from 'react';

import {connector} from "./../store/connectors";
import {Route, Switch} from 'react-router-dom';

import MyLayout from "./../layout/MyLayout";
import Home from "./../home/Home";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init App');
    }
}

const App = ({state, dispatch}) =>
  <div>
    <Switch>

      <Route path="/"
             exact
             render={props => <MyLayout content={Home} /> }
      />

      <Route render={props => <div>404</div> }
       />

    </Switch>
  </div>

export default connector({methods, component: App});
