import React from "react";
import { Table, Modal, Button } from "antd";
import { useState } from "react";

const Index: React.FC = () => {
  const columns = [
    {
      title: "答辩名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: any) => (
        <Button onClick={() => showModal(record)}>查看详情</Button>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      name: "毕业论文答辩",
      date: "2023-06-15",
      status: "进行中",
    },
    {
      key: 2,
      name: "期末项目答辩",
      date: "2023-06-20",
      status: "未开始",
    },
    {
      key: 3,
      name: "毕业设计答辩",
      date: "2023-06-25",
      status: "已结束",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDefence, setSelectedDefence] = useState<any>(null);

  const showModal = (record: any) => {
    setSelectedDefence(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <h1>答辩列表</h1>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="答辩详情"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedDefence && (
          <>
            <p>答辩名称：{selectedDefence.name}</p>
            <p>日期：{selectedDefence.date}</p>
            <p>状态：{selectedDefence.status}</p>
          </>
        )}
      </Modal>
    </>
  );
};

export default Index;
