import React from 'react';

import {connector} from "./../store/connectors";

import {Button, Divider, Tooltip} from 'antd';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Menu');

    }
}

const Menu = ({state, dispatch, history}) =>
  <div>

    <Tooltip title={'home'} placement="bottomLeft">
      <Button size={'small'}
              type="primary"
              icon="home"
              onClick={() => history.push(`/`)}/>
    </Tooltip>

             {' '}

    <Divider type="vertical" />

             {' '}

    <Tooltip title={'account'} placement="bottomLeft">
      <Button size={'small'}
              type="primary"
              icon="menu-unfold"
              onClick={() => history.push(`/account`)}/>
    </Tooltip>

             {' '}

    <Tooltip title={'category'} placement="bottomLeft">
      <Button size={'small'}
              type="primary"
              icon="ordered-list"
              onClick={() => history.push(`/category`)}/>
    </Tooltip>

             {' '}

    <Tooltip title={'document'} placement="bottomLeft">
      <Button size={'small'}
              type="primary"
              icon="exception"
              onClick={() => history.push(`/document`)}/>
    </Tooltip>

             {' '}

    <Tooltip title={'statistics'} placement="bottomLeft">
      <Button size={'small'}
              type="primary"
              icon="bar-chart"
              onClick={() => history.push(`/statistics`)}/>
    </Tooltip>

             {' '}

    <Tooltip title={'budget'} placement="bottomLeft">
      <Button size={'small'}
              type="primary"
              icon="control"
              onClick={() => history.push(`/budget`)}/>
    </Tooltip>

            {' '}

    <Divider type="vertical" />

             {' '}

    <Tooltip title={'credit'} placement="bottomLeft">
      <Button size={'small'}
              type="primary"
              icon="fall"
              onClick={() => history.push(`/credit`)}/>
    </Tooltip>

            {' '}

    <Tooltip title={'debet'} placement="bottomLeft">
      <Button size={'small'}
              type="primary"
              icon="rise"
              onClick={() => history.push(`/debet`)}/>
    </Tooltip>

            {' '}

    <Divider type="vertical" />

            {' '}

    <Tooltip title={'map shop'} placement="bottomLeft">
      <Button size={'small'}
              type="primary"
              icon="shop"
              onClick={() => history.push(`/map/shop`)}/>
    </Tooltip>

    <Divider dashed />

  </div>

export default connector({methods, component: Menu});
