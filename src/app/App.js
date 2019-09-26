import React from 'react';

import {connector} from "./../store/connectors";
import {Route, Switch} from 'react-router-dom';

import { BackTop } from 'antd';

import MyLayout from "./../layout/MyLayout";

import Home from "./../home/Home";
import Account from "./../home/Account";
import Category from "./../home/Category";
import Document from "./../home/Document";

import AccountCreate from "./../home/AccountCreate";

import StatisticsCalendar from "./../home/StatisticsCalendar";
import StatisticsСhart from "./../home/StatisticsСhart";

import Page404 from "./../errors/Page404";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init App');
    }
}

const App = ({state, dispatch}) =>
  <div>

    <BackTop>
      <div className="ant-back-top-inner">Наверх</div>
    </BackTop>

    <Switch>

      <Route path="/" exact render={props => <MyLayout secure={true} content={Home} /> } />
      <Route path="/account" exact render={props => <MyLayout secure={true} content={Account} /> } />
      <Route path="/category" exact render={props => <MyLayout secure={true} content={Category} /> } />
      <Route path="/document" exact render={props => <MyLayout secure={true} content={Document} /> } />

      <Route path="/account/create" exact render={props => <MyLayout secure={true} content={AccountCreate} /> } />

      <Route path="/document/income" exact render={props => <MyLayout secure={true} content={Document} /> } />
      <Route path="/document/expenditure" exact render={props => <MyLayout secure={true} content={Document} /> } />
      <Route path="/document/transaction" exact render={props => <MyLayout secure={true} content={Document} /> } />

      <Route path="/statistics" exact render={props => <MyLayout secure={true} content={StatisticsCalendar} /> } />
      <Route path="/statistics/calendar" exact render={props => <MyLayout secure={true} content={StatisticsCalendar} /> } />
      <Route path="/statistics/chart" exact render={props => <MyLayout secure={true} content={StatisticsСhart} /> } />

      <Route render={props => <MyLayout isHeader={false} isFooter={false} secure={false} content={Page404} /> } />

    </Switch>
  </div>

export default connector({methods, component: App});
