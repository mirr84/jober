import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {Button} from 'antd';
import {Spin} from 'antd';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Menu');

    }
}

const Menu = ({state, dispatch, history}) =>
  <div>

    <Button size={'small'}
            type="primary"
             icon="solution"
             onClick={() => history.push(`/`)}/>

             {' '}

     <Button size={'small'}
             type="primary"
             icon="home"
             onClick={() => history.push(`/build`)}/>

             {' '}

    <Button size={'small'}
             type="primary"
             icon="experiment"
             onClick={() => history.push(`/science`)}/>

     <hr  />

  </div>

export default connector({methods, component: Menu});
