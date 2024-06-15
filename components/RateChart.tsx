// pages/rate-chart.js

import React, { useState } from 'react';
import { Form, InputNumber, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const RateChart = () => {
  const [chartData, setChartData] = useState(null);

  // 实际 API 调用的函数
  const fetchData = async (startPeriod: any, interval: any, periods: any) => {
    try {
      const response = await fetch(
        `你的API端点?startPeriod=${startPeriod}&interval=${interval}&periods=${periods}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setChartData(data); // 假设后端返回的是可直接用于展示的数据
    } catch (error) {
      console.error('Fetch error: ', error);
    }
  };

  const onFinish = (values: any) => {
    const { startPeriod, interval, periods } = values;
    fetchData(startPeriod, interval, periods);
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
      <Form layout='inline' onFinish={onFinish}>
        <Form.Item name='startPeriod' label='开始期号'>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name='interval' label='后退间隔'>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name='periods' label='后退期数'>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            获取数据
          </Button>
        </Form.Item>
      </Form>
      {chartData && (
        <div>
          {/* 这里可以展示后端返回的折线图数据，例如直接渲染图表的图片或其他格式 */}
          <p>数据已获取，根据后端返回的数据格式进行展示。</p>
        </div>
      )}
      <Upload {...props}>
        <Button icon={<UploadOutlined />} type='primary'>
          点击上传文件
        </Button>
      </Upload>
    </div>
  );
};

export default RateChart;
