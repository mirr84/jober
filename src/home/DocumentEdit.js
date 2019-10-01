import React from 'react';

import moment from 'moment';
import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {doGetDocument} from "../service/documentService";

import {Button, Tabs, Spin, Divider, Tag, Icon, Switch, Table, Input,
        Select, DatePicker, InputNumber, Row, Col, Popconfirm, Alert} from 'antd';

import Menu from './Menu';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

let documentData = {}

const methods = {
    componentWillMount({state, dispatch, secure, history, match}) {
        secure && doCheck({dispatch})
          .then(
            () => doGetDocument({dispatch, ...match})
                    .then(
                      (r) => {
                        documentData = r.data;
                        dispatch.setter( 'documentReducer', {} )
                      }
                    )
          )
    }
}

const DocumentEdit = ({state, dispatch, history, match}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck || state.documentReducer.isProgressGet} >

      <Button size="small" type="primary" onClick = { () => history.push(`/document`) }>
        <Icon type="left" />
      </Button>

      {' '}

      Документа №{match.params.id}

      <Divider dashed />

        {
          !documentData && <Alert message="Нет прав или документ не существует" type="error" />
        }

        {
          JSON.stringify(documentData)
        }

    </Spin>
  </div>

export default connector({methods, component: DocumentEdit});
