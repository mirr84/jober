import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {Button} from 'antd';
import {Spin} from 'antd';

import Menu from './Menu';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Science');

        secure && doCheck({dispatch});
    }
}

const Science = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        <Menu />

        Science

    </Spin>
  </div>

export default connector({methods, component: Science});
