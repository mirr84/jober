import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {Button, Divider, Spin} from 'antd';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Menu');

    }
}

const Menu = ({state, dispatch, history}) =>
  <div>

    <Button size={'small'}
            type="primary"
             icon="home"
             onClick={() => history.push(`/`)}/>

             {' '}

     <Button size={'small'}
             type="primary"
             icon="menu-unfold"
             onClick={() => history.push(`/account`)}/>

             {' '}

    <Button size={'small'}
             type="primary"
             icon="ordered-list"
             onClick={() => history.push(`/category`)}/>

             {' '}

    <Button size={'small'}
            type="primary"
            icon="exception"
            onClick={() => history.push(`/document`)}/>

     <Divider dashed />

  </div>

export default connector({methods, component: Menu});
