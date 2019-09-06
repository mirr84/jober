import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {Button} from 'antd';
import {Spin} from 'antd';

import Menu from './Menu';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Document');

        secure && doCheck({dispatch});
    }
}

const Document = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        <Menu />

        Document

    </Spin>
  </div>

export default connector({methods, component: Document});
