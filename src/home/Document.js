import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {Button, Tabs, Spin, Divider} from 'antd';

import Menu from './Menu';

import DocumentList from './DocumentList';

const { TabPane } = Tabs;

let defaultActiveKey;

const methods = {
    componentWillMount({state, dispatch, secure, history}) {
        let [,p1,p2] = history.location.pathname.split('/')
        defaultActiveKey = p2 ? p2 : 'income';

        secure && doCheck({dispatch});
    }
}

const Document = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        <Menu />

        <Tabs defaultActiveKey={defaultActiveKey} onChange={ (key) => history.push(`/document/${key}`) }>
          <TabPane tab="Доход" key="income">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Расход" key="expenditure">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Перевод" key="transaction">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>

        <Divider dashed />

        <DocumentList />

    </Spin>
  </div>

export default connector({methods, component: Document});
