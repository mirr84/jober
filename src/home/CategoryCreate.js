import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import {doAddAccount} from "../service/accountService";

import {Spin, Steps, Button, message, Input} from 'antd';

import Menu from './Menu';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init CategoryCreate');

        secure && doCheck({dispatch})
    }
}

const CategoryCreate = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        <Menu />

        CategoryCreate

    </Spin>
  </div>

export default connector({methods, component: CategoryCreate});
