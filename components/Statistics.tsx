import React, { useState } from 'react';
import { Button, Form, InputNumber, Table, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadProps } from 'antd/lib/upload/interface';

interface FormData {
  startPeriod: number | undefined;
  backPeriods: number | undefined;
  backInterval: number | undefined;
}

interface StatisticData {
  key: string;
  period: string;
  counts: { [key: string]: string }; // Dynamic keys for times
}

const NumberStatistics: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<StatisticData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const fetchDataApiUrl = 'http://127.0.0.1:8000/calculate/multi';
  const importDataApiUrl = 'http://127.0.0.1:8000/calculate/fixed';

  const handleSubmit = async (values: FormData) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('startPeriod', String(values.startPeriod)); // 将数字转换为字符串
    formData.append('backPeriods', String(values.backPeriods));
    formData.append('backInterval', String(values.backInterval));
    // This is where you call your API
    try {
      const response = await fetch(fetchDataApiUrl, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('网络响应不成功');
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('数据获取错误: ', error);
      message.error('数据获取失败');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: RcFile) => {
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const response = await fetch(importDataApiUrl, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('网络响应不成功');
      await response.json();
      message.success('文件导入成功');
    } catch (error) {
      console.error('获取数据错误: ', error);
      message.error('文件导入失败');
    } finally {
      setUploading(false);
    }
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

    // Define other columns based on the data structure...
  ];

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      handleFileUpload(file);
      // Prevent the default behavior since we handle the upload process manually.
      return false;
    },
    multiple: false,
    showUploadList: false,
  };

  return (
    <div className='flex flex-col gap-10 mx-4'>
      <Form form={form} layout='inline' onFinish={handleSubmit}>
        <Form.Item
          name='start_period '
          label='开始期号'
          rules={[{ required: true, message: '请输入开始期号' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name='num_periods'
          label='后退期数'
          rules={[{ required: true, message: '请输入后退期数' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name='interval'
          label='后退间隔'
          rules={[{ required: true, message: '请输入后退间隔' }]}
        >
          <InputNumber min={1} />
        </Form.Item>

        <Form.Item name='upload'>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} loading={uploading}>
              上传文件
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading}>
            统计
          </Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

export default NumberStatistics;
