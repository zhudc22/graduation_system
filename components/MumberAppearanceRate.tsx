import React, { useState } from 'react';
import { Form, InputNumber, Button, Image, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const MumberAppearanceRate = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchChart = async (values: any) => {
    setLoading(true);
    try {
      // 替换为你的后端API
      const response = await fetch(
        `你的API端点?param1=${values.param1}&param2=${values.param2}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setImageUrl(data.imageUrl); // 假设后端返回的JSON中包含了imageUrl字段
    } catch (error) {
      console.error('Fetch error: ', error);
      setImageUrl('');
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
      <Form onFinish={fetchChart} layout='inline'>
        <Form.Item name='param1' label='参数1' rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name='param2' label='参数2' rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={loading}>
          获取折线图
        </Button>
      </Form>
      {imageUrl && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Image src={imageUrl} alt='折线图' />
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

export default MumberAppearanceRate;
