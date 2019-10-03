import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import moment from 'moment';

import {Button,  Calendar, Badge, Spin, Divider, Tooltip} from 'antd';

import Menu from './Menu';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Debet');

        secure && doCheck({dispatch})
    }
}

const Debet = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

      <Menu />

      Debet

    </Spin>
  </div>

export default connector({methods, component: Debet});
