import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";
import {doListDocument, doUpdateDocument, doAddDocument} from "../service/documentService";

import {Button, Tabs, Spin, Divider, Tag, Icon, Switch, Table, Input} from 'antd';

import Menu from './Menu';

const { TabPane } = Tabs;

let defaultActiveKey;
let listData = [];
let pagination = { current: 1, pageSize: 100, position: 'both' };
let pagination_, filters_, sorter_;

const methods = {
    componentWillMount({state, dispatch, secure, history}) {
        let [,p1,p2] = history.location.pathname.split('/')
        defaultActiveKey = p2 ? p2 : 'income';

        secure && doCheck({dispatch})
          .then(
            () => fetch(dispatch)
          );
    }
}

const fetch = (dispatch, params = {}) => {

    doListDocument({dispatch, params})
      .then(
        (data) => {
          listData = data;
          pagination = pagination_ = { ...pagination };
          pagination.total = data.total_count;
          dispatch.setter("categoryReducer", {});
        }
      )

};

const columns = ({dispatch}) => [
  {
    title: 'id',
    dataIndex: 'id',
    render: id => `${id}`,
    width: 50
  },
  {
    title: 'key',
    dataIndex: 'key'
  },
  {
    title: 'description',
    dataIndex: 'description',
    render: (text, record) => text
  },
  {
    title: 'category',
    dataIndex: 'category'
  },
  {
    title: 'direct',
    dataIndex: 'direct'
  },
  {
    title: 'datetime',
    dataIndex: 'datetime'
  },
  {
    title: 'summ',
    dataIndex: 'summ'
  },
  {
    title: 'deleted',
    dataIndex: 'deleted'
  },
];

const handleTableChange = (dispatch, pagination = pagination_, filters = filters_, sorter = sorter_) => {

  pagination_ = pagination;
  filters_ = filters;
  sorter_ = sorter;

  const pager = { ...pagination };
  pager.current = pagination.current;
  pagination = pager;

  fetch(dispatch, {
    results: pagination.pageSize,
    page: pagination.current,
    sortField: sorter ? sorter.field : null,
    sortOrder: sorter ? sorter.order : null,
    ...filters,
  });

};

const Document = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck} >

        <Menu />

        <Tabs defaultActiveKey={defaultActiveKey} onChange={ (key) => history.push(`/document/${key}`) }>
          <TabPane tab="Доход" key="income">
            <Button onClick = {
                () => {
                  doAddDocument({dispatch, params: { direct: 1 }})
                    .then(
                      () => handleTableChange(dispatch)
                    )
                }
              }
            >
              create income
            </Button>
          </TabPane>
          <TabPane tab="Расход" key="expenditure">
            <Button onClick = {
                () => {
                  doAddDocument({dispatch, params: { direct: -1 }})
                    .then(
                      () => handleTableChange(dispatch)
                    )
                }
              }
            >
              create expenditure
            </Button>
          </TabPane>
          <TabPane tab="Перевод" key="transaction">
            <Button onClick = {
                () => {
                  doAddDocument({dispatch, params: { direct: -1 }})
                    .then(
                      () => doAddDocument({dispatch, params: { direct: 1 }})
                              .then(
                                () => handleTableChange(dispatch)
                              )
                    )
                }
              }
            >
              create transaction
            </Button>
          </TabPane>
        </Tabs>

        <Divider dashed />

          <Table
            size="small"
            columns={columns({dispatch})}
            rowKey={record => record.id}
            dataSource={listData.list}
            pagination={pagination}
            loading={state.documentReducer.isProgressList}
            onChange={(pagination, filters, sorter) => handleTableChange(dispatch, pagination, filters, sorter)}
          />

    </Spin>
  </div>

export default connector({methods, component: Document});
