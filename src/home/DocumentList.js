import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {doListDocument, doUpdateDocument, doAddDocument} from "../service/documentService";

import {Button, Tooltip, Divider, Spin, Table, Switch, Icon, Input, Tag} from 'antd';

let listData = [];
let pagination = { current: 1, pageSize: 20, position: 'both' };
let pagination_, filters_, sorter_;

const methods = {
    componentWillMount({state, dispatch, secure, history}) {
      console.log('init DocumentList');

      // fetch(dispatch)

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
    render: (text, record) =>
        {
          if (record.deleted) {
            return <Tag color="red"><Icon type="close" /></Tag>
          }
          if (record.description.trim() && (record.income || record.expenditure)) {
            return <Tag color="green"><Icon type="check" /></Tag>;
          }
          return <Tag color="orange"><Icon type="question" /></Tag>
        }
      ,
    width: 60
  },
  {
    title: 'id',
    dataIndex: 'id',
    sorter: true,
    render: id => `${id}`,
    width: 50
  },
  {
    title: 'description',
    dataIndex: 'description',
    sorter: true,
    render: (text, record) => <Input value={text}
                onChange={
                  ({target: {value: description}}) => {
                    record.description = description;
                    dispatch.setter("categoryReducer", {});
                  }
                 }
                 onBlur={ () => doUpdateDocument({dispatch, params: record}) }
                 placeholder="description" />
  },
  {
    title: 'Доход',
    dataIndex: 'income',
    sorter: true,
    width: 100,
    render: (text, record) => <Switch
        checked={!!text}
        onChange={
          (checked) => {
            record.income = checked;
            doUpdateDocument({dispatch, params: record});
            dispatch.setter("categoryReducer", {});
          }
        }
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="close" />}
        defaultChecked
      />
  },
  {
    title: 'Расход',
    dataIndex: 'expenditure',
    sorter: true,
    width: 100,
    render: (text, record) => <Switch
        checked={!!text}
        onChange={
          (checked) => {
            record.expenditure = checked;
            doUpdateDocument({dispatch, params: record});
            dispatch.setter("categoryReducer", {});
          }
        }
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="close" />}
        defaultChecked
      />
  },
  {
    title: 'Скрытый',
    dataIndex: 'deleted',
    // sorter: true,
    filters: [{ text: 'Показать', value: 1 }],
    width: 100,
    render: (text, record) => <Switch
        checked={!!text}
        onChange={
          (checked) => {
            record.deleted = checked;
            doUpdateDocument({dispatch, params: record})
              .then(
                () => handleTableChange(dispatch)
              )
            dispatch.setter("categoryReducer", {});
          }
        }
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="close" />}
        defaultChecked
      />
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

const DocumentList = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..."
          spinning={
              state.authReducer.isProgressCheck

          } >

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

export default connector({methods, component: DocumentList});
