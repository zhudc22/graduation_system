import React from 'react';
import { Table } from 'antd';

const data = {
  '0次': {
    '0': 'q0, q8',
    '1': 'q0, q3, q7, q8',
    '2': 'q0, q6, q8, q9',
  },
  '1次': {
    '0': 'q1, q2, q3, q4, q7',
    '1': 'q1, q2',
    '2': 'q1, q2',
  },
  '2次': {
    '0': 'q5, q6, q9',
    '1': 'q4, q5, q9',
    '2': 'q3, q5, q7',
  },
  '3次': {
    '0': '',
    '1': 'q6',
    '2': 'q4',
  },
  '4次': {
    '0': '',
    '1': '',
    '2': '',
  },
  '5次': {
    '0': '',
    '1': '',
    '2': '',
  },
  '6次': {
    '0': '',
    '1': '',
    '2': '',
  },
  '7次': {
    '0': '',
    '1': '',
    '2': '',
  },
  '8次': {
    '0': '',
    '1': '',
    '2': '',
  },
  '9次': {
    '0': '',
    '1': '',
    '2': '',
  },
  '10次': {
    '0': '',
    '1': '',
    '2': '',
  },
  期号: {
    '0': '12期',
    '1': '8期',
    '2': '4期',
  },
};

const columns = [
  {
    title: '期号',
    dataIndex: 'period',
    key: 'period',
  },
  {
    title: '0次',
    dataIndex: '0times',
    key: '0times',
  },
  {
    title: '1次',
    dataIndex: '1times',
    key: '1times',
  },
  {
    title: '2次',
    dataIndex: '2times',
    key: '2times',
  },
  {
    title: '3次',
    dataIndex: '3times',
    key: '3times',
  },
  {
    title: '4次',
    dataIndex: '4times',
    key: '4times',
  },
  {
    title: '5次',
    dataIndex: '5times',
    key: '5times',
  },
  {
    title: '6次',
    dataIndex: '6times',
    key: '6times',
  },
  {
    title: '7次',
    dataIndex: '7times',
    key: '7times',
  },
  {
    title: '8次',
    dataIndex: '8times',
    key: '8times',
  },
  {
    title: '9次',
    dataIndex: '9times',
    key: '9times',
  },
  {
    title: '10次',
    dataIndex: '10times',
    key: '10times',
  },
];

const transformData = (data: any) => {
  const periods = Object.keys(data['期号']);
  return periods.map((period) => ({
    key: period,
    period: data['期号'][period],
    '0times': data['0次'][period] || '',
    '1times': data['1次'][period] || '',
    '2times': data['2次'][period] || '',
    '3times': data['3次'][period] || '',
    '4times': data['4次'][period] || '',
    '5times': data['5次'][period] || '',
    '6times': data['6次'][period] || '',
    '7times': data['7次'][period] || '',
    '8times': data['8次'][period] || '',
    '9times': data['9次'][period] || '',
    '10times': data['10次'][period] || '',
  }));
};

const App = () => {
  const dataSource = transformData(data);

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default App;
