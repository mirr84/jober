import React from 'react';

import {connector} from "./../store/connectors";

import {Spin, Icon, Modal} from 'antd';

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init MyProgressModal');
    }
}

const MyProgressModal = ({state, dispatch, visible = false}) =>
<Modal
        centered
        visible={visible}
        closable={false}
        footer={null}
        zIndex={10000}
        width={'auto'}
      >
        <Spin indicator={<Icon type="loading" style={{fontSize: 100}} spin/>}/>
</Modal>

export default connector({methods, component: MyProgressModal});
