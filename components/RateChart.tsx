import React, { useState } from 'react';
import { Button, Form, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadProps } from 'antd/lib/upload/interface';
import ReactEcharts from 'echarts-for-react';
import RequestHeatMap from './request/RequestHeatMap';

function transformData(data: any) {
  const { results, periods } = data;
  if (!results || !periods) {
    return { periods: [], series: [] };
  }
  const transformedData: any = [];

  Object.keys(results).forEach((key) => {
    const seriesData = results[key].map((rate: any, index: any) => [
      periods[index],
      rate,
    ]);
    transformedData.push({
      name: key.toUpperCase(),
      type: 'line',
      data: seriesData.map((item: any) => item[1]),
    });
  });

  return { periods, series: transformedData };
}

const LineChart = ({ data }: any) => {
  const option = {
    title: {
      text: '号码出现率折线图',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: data.series.map((item: any) => item.name),
    },
    xAxis: {
      type: 'category',
      name: '期数',
      data: data.periods,
    },
    yAxis: {
      type: 'value',
      name: '出现率',
      axisLabel: {
        formatter: '{value}%',
      },
    },
    series: data.series,
  };
  return <ReactEcharts option={option} />;
};

const NumberStatistics: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<RcFile>();
  const [dataSource, setDataSource] = useState<dataSource | null>(null);

  interface dataSource {
    periods: number[];
    series: {
      name: string;
      type: string;
      data: number[];
    }[];
  }

  const handleFileUpload = (file: RcFile) => {
    setFile(file);
  };

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
    const { data, error } = await RequestHeatMap({
      start_period: startPeriod,
      num_periods: numPeriods,
      interval: interval,
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
          label='后退间隔'
          rules={[{ required: true, message: '请输入后退间隔' }]}
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
            生成图表
          </Button>
        </Form.Item>
      </Form>
      {dataSource && <LineChart data={dataSource} />}
    </div>
  );
};

export default NumberStatistics;
