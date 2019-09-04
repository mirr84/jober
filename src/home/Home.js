import React from 'react';

import {connector} from "./../store/connectors";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init Home');

    }
}

const Home = ({state, dispatch}) =>
  <div>
    Home
  </div>

export default connector({methods, component: Home});
