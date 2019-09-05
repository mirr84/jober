import React from 'react';

import {connector} from "./../store/connectors";

import {Spin, Icon, Modal} from 'antd';

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init MyLoginModal');
    }
}

const MyLoginModal = ({state, dispatch, visible = false}) =>
<Modal
        centered
        visible={visible}
        closable={false}
        footer={null}
        zIndex={10000}
      >
        форма авторизации
</Modal>

export default connector({methods, component: MyLoginModal});
