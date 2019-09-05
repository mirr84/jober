import React from 'react';

import {connector} from "./../store/connectors";
import {Route, Switch} from 'react-router-dom';

import MyLayout from "./../layout/MyLayout";

import Home from "./../home/Home";
import Main from "./../home/Main";

import Page404 from "./../errors/Page404";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init App');
    }
}

const App = ({state, dispatch}) =>
  <div>
    <Switch>

    <Route path="/" exact render={props => <MyLayout secure={true} content={Home} /> } />
    <Route path="/main" exact render={props => <MyLayout secure={true} content={Main} /> } />

    <Route render={props => <MyLayout isHeader={false} isFooter={false} secure={false} content={Page404} /> } />

    </Switch>
  </div>

export default connector({methods, component: App});
