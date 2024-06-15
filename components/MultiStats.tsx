// pages/multi-interval-stats.js

import React, { useState } from 'react';
import { Form, InputNumber, Button, Table, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const MultiIntervalStats = () => {
  const [loading, setLoading] = useState(false);
  const [statsData, setStatsData] = useState([]);

  // 定义表格列
  const columns = [
    {
      title: '号码',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '出现次数',
      dataIndex: 'times',
      key: 'times',
    },
    {
      title: '统计倍数',
      dataIndex: 'multiplier',
      key: 'multiplier',
    },
  ];

  // 请求后端API获取数据
  const fetchData = async ({ startPeriod, backPeriods, statsCount }: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        `你的API端点?startPeriod=${startPeriod}&backPeriods=${backPeriods}&statsCount=${statsCount}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setStatsData(data); // 假设后端返回的数据可以直接用于表格展示
    } catch (error) {
      console.error('Fetch error: ', error);
      setStatsData([]);
    } finally {
      setLoading(false);
    }
  };

  // 文件上传配置
  const handleFileChange = async (info: any) => {
    if (info.file.status === 'uploading') {
      console.log('Uploading...', info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  };

  const props = {
    name: 'file',
    action: '/api/upload', // 假设文件上传的后端API路径为 /api/upload
    headers: {
      authorization: 'authorization-text',
    },
    onChange: handleFileChange,
    customRequest: async ({ action, file, onSuccess, onError }: any) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch(action, {
          method: 'POST',
          body: formData, // 不设置 'Content-Type': 'multipart/form-data'，浏览器会自动设置
        });
        if (response.ok) {
          const result = await response.json();
          onSuccess(result, file);
        } else {
          throw new Error('Upload failed.');
        }
      } catch (error) {
        console.error('Upload error:', error);
        onError(error);
      }
    },
  };

  return (
    <div className='flex flex-col gap-10 mx-4'>
      <Form layout='inline' onFinish={fetchData}>
        <Form.Item
          name='startPeriod'
          label='开始期号'
          rules={[{ required: true }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name='backPeriods'
          label='后退期数'
          rules={[{ required: true }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name='statsCount'
          label='统计次数'
          rules={[{ required: true }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={statsData}
        rowKey='number'
        loading={loading}
      />
      <Upload {...props}>
        <Button icon={<UploadOutlined />} type='primary'>
          点击上传文件
        </Button>
      </Upload>
    </div>
  );
};

export default MultiIntervalStats;
