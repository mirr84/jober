import React from 'react';

import moment from 'moment';
import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {doListDocument, doUpdateDocument, doAddDocument, doDeleteDocument} from "../service/documentService";
import {doListAccount} from "../service/accountService";
import {doListCategoty} from "../service/categoryService";

import {Button, Tabs, Spin, Divider, Tag, Icon, Switch, Table, Input,
        Select, DatePicker, InputNumber, Row, Col, Popconfirm} from 'antd';

import Menu from './Menu';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

let defaultActiveKey;
let pagination = { current: 1, pageSize: 100, position: 'both' };
let pagination_, filters_, sorter_;

let listDocumentData = [];
let listAccountData = [];
let listCategotyData = [];

const methods = {
    componentWillMount({state, dispatch, secure, history}) {
        secure && doCheck({dispatch})

    }
}

const DocumentEdit = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        DocumentEdit

        <br />

        <Button size="small" type="primary" onClick = { () => history.goBack() }>
          <Icon type="left" /> Backward
        </Button>

    </Spin>
  </div>

export default connector({methods, component: DocumentEdit});
