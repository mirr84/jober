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

    <Divider dashed />

  </div>

export default connector({methods, component: Menu});
