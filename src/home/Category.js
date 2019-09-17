import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {Button, Tooltip, Divider, Spin} from 'antd';

import Menu from './Menu';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Category');

        secure && doCheck({dispatch});
    }
}

const Category = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        <Menu />

          <Tooltip title={'category create'} placement="bottomLeft">
              <Button size={'small'}
                       type="primary"
                       icon="plus"
                       onClick={() => history.push(`/category/create`)}/>
          </Tooltip>

          <Divider dashed />

          Category

    </Spin>
  </div>

export default connector({methods, component: Category});
