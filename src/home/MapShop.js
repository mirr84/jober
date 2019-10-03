import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import moment from 'moment';

import {Button,  Calendar, Badge, Spin, Divider, Tooltip} from 'antd';

import Menu from './Menu';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init MapShop');

        secure && doCheck({dispatch})
    }
}

const MapShop = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

      <Menu />

      MapShop

    </Spin>
  </div>

export default connector({methods, component: MapShop});
