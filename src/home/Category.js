import React from 'react';

import {connector} from "./../store/connectors";
import {doCheck} from "../service/authService";

import {doListCategoty, doUpdateCategoty} from "../service/categoryService";

import {Button, Tooltip, Divider, Spin, Table, Switch, Icon} from 'antd';

import Menu from './Menu';

let listData = {};
let pagination = { pageSize: 20 };

const methods = {
    componentWillMount({state, dispatch, secure}) {
        console.log('init Category');

        secure && doCheck({dispatch})
          .then(
            () => fetch(dispatch)
          )
    }
}

const fetch = (dispatch, params = {}) => {
    // console.log('params:', params);

    doListCategoty({dispatch, params})
      .then(
        (data) => {
          listData = data;
          pagination = { ...pagination };
          pagination.total = data.total_count;
          dispatch.setter("categoryReducer", {});
        }
      )

};

const columns = ({dispatch}) => [
  {
    title: 'id',
    dataIndex: 'id',
    sorter: true,
    render: id => `${id}`,
    width: 150
  },
  {
    title: 'description',
    dataIndex: 'description',
    sorter: true,
  },
  {
    title: 'Доход',
    dataIndex: 'income',
    sorter: true,
    render: (text, record) => <Switch
        checked={!!text}
        onChange={
          (checked) => {
            record.income = checked;
            doUpdateCategoty({dispatch, params: record});
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
    render: (text, record) => <Switch
        checked={!!text}
        onChange={
          (checked) => {
            record.expenditure = checked;
            doUpdateCategoty({dispatch, params: record});
            dispatch.setter("categoryReducer", {});
          }
        }
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="close" />}
        defaultChecked
      />
  },

];

const handleTableChange = (dispatch, pagination, filters, sorter) => {

  const pager = { ...pagination };
  pager.current = pagination.current;
  pagination = pager;

  fetch(dispatch, {
    results: pagination.pageSize,
    page: pagination.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });

};

const Category = ({state, dispatch, history}) =>
  <div>
    <Spin tip="Loading..." spinning={state.authReducer.isProgressCheck || state.categoryReducer.isProgressUpdate} >

        <Menu />

          <Tooltip title={'category create'} placement="bottomLeft">
              <Button size={'small'}
                       type="primary"
                       icon="plus"
                       onClick={() => history.push(`/category/create`)}/>
          </Tooltip>

          <Divider dashed />

            <Table
              size="small"
              columns={columns({dispatch})}
              rowKey={record => record.id}
              dataSource={listData.list}
              pagination={pagination}
              loading={state.accountReducer.isProgressList}
              onChange={(pagination, filters, sorter) => handleTableChange(dispatch, pagination, filters, sorter)}
            />

    </Spin>
  </div>

export default connector({methods, component: Category});
