import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Page404', secure);

        secure && doCheck({dispatch});
    }
}

const Page404 = ({state, dispatch, history}) =>
  <div>

    Page404

  </div>

export default connector({methods, component: Page404});
