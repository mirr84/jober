import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import moment from 'moment';

import {Button,  Calendar, Badge, Spin, Divider, Tooltip} from 'antd';

import Menu from './Menu';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Credit');

        secure && doCheck({dispatch})
    }
}

const Budget = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

      <Menu />

      Budget

    </Spin>
  </div>

export default connector({methods, component: Budget});
