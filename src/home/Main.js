import React from 'react';

import {connector} from "./../store/connectors";

import {Button} from 'antd';

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init Main');

    }
}

const Main = ({state, dispatch, history}) =>
  <div>

    <Button size={'small'}
            type="primary"
             icon="question-circle"
             onClick={() => history.push(`/`)}/>

             {' '}

     <Button size={'small'}
             type="primary"
             icon="question-circle"
             onClick={() => history.push(`/main`)}/>

             {' '}

    <Button size={'small'}
            type="primary"
            icon="question-circle"
            onClick={() => history.push(`/111`)}>
            404
    </Button>

  </div>

export default connector({methods, component: Main});
