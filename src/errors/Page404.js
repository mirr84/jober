import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import { Button, Icon, Divider} from 'antd';

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Page404');

        secure && doCheck({dispatch});
    }
}

const Page404 = ({state, dispatch, history}) =>
  <div>

    Page404

    <Divider dashed />

    <Button size="small" type="primary" onClick = { () => history.goBack() }>
      <Icon type="left" /> Backward
    </Button>

  </div>

export default connector({methods, component: Page404});
