import React, { useState } from 'react';
import { Button, Form, InputNumber, Table, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadProps } from 'antd/lib/upload/interface';
import RequestMultipliers from './request/RequestMultipliers';

function transformData(data: any) {
  const transformedData: any = [];

  // 遍历"间隔"对象，使用间隔作为每条记录的基础
  Object.keys(data['间隔']).forEach((key) => {
    interface Row {
      key: string;
      [key: string]: any; // 使用any类型允许任意值
    }

    // 创建一个新对象，用于存储转换后的单行数据
    const row: Row = { key };

    // 设置间隔
    row['period'] = data['间隔'][key];

    // 遍历每个次数，如"0次"、"1次"等，将对应的值添加到行对象中
    Object.keys(data).forEach((times) => {
      // 跳过"间隔"键，因为它已经被处理了
      if (times === '间隔') return;

      // 使用次数作为键，从对应的对象中获取值
      const value = data[times][key];
      // 将键名转换成列表列定义中的dataIndex形式
      const dataIndex = times.replace('次', 'times');
      // 设置行对象中对应的值
      row[dataIndex] = value;
    });

    // 将转换后的行对象添加到结果数组中
    transformedData.push(row);
  });

  return transformedData;
}

const NumberStatistics: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<RcFile>();

  const handleFileUpload = (file: RcFile) => {
    setFile(file);
  };

  const [dataSource, setDataSource] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!file) {
      message.error('请上传文件');
      setLoading(false);
      return; // 提早返回，不继续执行后面的代码
    }
    const formData = await form.validateFields();
    console.info(formData); // 确保表单数据被正确打印

    const { startPeriod, numPeriods, interval } = formData;
    const { data, error } = await RequestMultipliers({
      start_period: startPeriod,
      interval: numPeriods,
      num_multipliers: interval,
      file: file as File,
    });

    if (error) {
      setLoading(false);
      console.info(error); // 确保错误信息被正确打印
      message.error(error.detail || '请求失败');
      return;
    }

    const transformedData = transformData(data); // 转换数据
    setDataSource(transformedData); // 设置数据源

    setLoading(false);
  };

  const columns = [
    {
      title: '间隔',
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

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      handleFileUpload(file);
      return false;
    },
    multiple: false,
    showUploadList: false,
  };

  return (
    <div className='flex flex-col gap-10 mx-4'>
      <Form form={form} layout='inline' onFinish={handleSubmit}>
        <Form.Item
          name='startPeriod'
          label='开始期号'
          rules={[{ required: true, message: '请输入开始期号' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name='numPeriods'
          label='后退期数'
          rules={[{ required: true, message: '请输入后退期数' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name='interval'
          label='统计次数'
          rules={[{ required: true, message: '请输入统计次数' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} loading={loading}>
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
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

export default NumberStatistics;
