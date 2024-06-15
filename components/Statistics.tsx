import React, { useState } from "react";
import { Button, Form, InputNumber, Table, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile, UploadProps } from "antd/lib/upload/interface";
import RequestMulti from "./request/RequestMulti";

function transformData(data: any) {
  return data.map((item: any, index: any) => ({
    key: index.toString(), // 确保每行有一个唯一的 key
    period: item.period,
    ...item.counts, // 展开 counts 对象
  }));
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
    try {
      const formData = await form.validateFields();
      console.info(formData); // 确保表单数据被正确打印

      const { startPeriod, numPeriods, interval } = formData;
      const data = await RequestMulti({
        start_period: startPeriod,
        num_periods: numPeriods,
        interval: interval,
        file: file as File,
      });
      const transformedData = transformData(data); // 转换数据
      setDataSource(transformedData); // 设置数据源

      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setLoading(false);
  };

  const columns = [
    {
      title: "期号",
      dataIndex: "period",
      key: "period",
    },
    {
      title: "0次",
      dataIndex: "0times",
      key: "0times",
    },
    {
      title: "1次",
      dataIndex: "1times",
      key: "1times",
    },
    {
      title: "2次",
      dataIndex: "2times",
      key: "2times",
    },
    {
      title: "3次",
      dataIndex: "3times",
      key: "3times",
    },
    {
      title: "4次",
      dataIndex: "4times",
      key: "4times",
    },
    {
      title: "5次",
      dataIndex: "5times",
      key: "5times",
    },
    {
      title: "6次",
      dataIndex: "6times",
      key: "6times",
    },
    {
      title: "7次",
      dataIndex: "7times",
      key: "7times",
    },
    {
      title: "8次",
      dataIndex: "8times",
      key: "8times",
    },
    {
      title: "9次",
      dataIndex: "9times",
      key: "9times",
    },
    {
      title: "10次",
      dataIndex: "10times",
      key: "10times",
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
    <div className="flex flex-col gap-10 mx-4">
      <Form form={form} layout="inline" onFinish={handleSubmit}>
        <Form.Item
          name="startPeriod"
          label="开始期号"
          rules={[{ required: true, message: "请输入开始期号" }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="numPeriods"
          label="后退期数"
          rules={[{ required: true, message: "请输入后退期数" }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="interval"
          label="后退间隔"
          rules={[{ required: true, message: "请输入后退间隔" }]}
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
          <Button type="primary" htmlType="submit" loading={loading}>
            统计
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

export default NumberStatistics;
