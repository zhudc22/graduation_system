import {useEffect, useState} from "react";
import {Button, Card, Form, Input, Modal, Table} from "antd";
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import {ColumnsType} from 'antd/lib/table';

interface Topic {
    id: string;
    name: string;
    type: string;
}

const TopicPage: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [list, setList] = useState<any[]>([])
    const [query, setQuery] = useState<any>({
        pageNum: 1,
        pageSize: 10
    })
    const [myForm] = Form.useForm()
    const [datasource, setDatasource] = useState<Topic[]>([]);
    const gotoUpdatePage = (id: string) => {
    }
    const [total, setTotal] = useState<number>(0)
    const columns: ColumnsType<Topic> = [
        {title: "编号", dataIndex: "id", key: "id", align: "center"},
        {title: "课题名称", dataIndex: "name", key: "name", align: "center"},
        {title: "课题类型", dataIndex: "type", key: "type", align: "center"},
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (text: any, record: any) => {
                return (
                    <div>
                        <Button onClick={() => gotoUpdatePage(record._id)} type="primary" shape="circle"
                                icon={<EditOutlined/>}/>
                        <Button type="primary" shape="circle" icon={<DeleteOutlined/>}/>
                    </div>
                );
            },
        },
    ];

    const handleFinish = (v: any) => {
        console.log(v)
        //此处需要调接口

        setOpen(false)
    }

    useEffect(() => {
        //此处需要调接口
        setDatasource(list)
        setTotal(list.length)
    }, [query])

    return (
        <Card title={"课题列表"} extra={
            <Button type="primary" onClick={() => setOpen(true)}>添加课题</Button>
        }>
            <div className="flex justify-center mb-10">
                <Form layout={"inline"}>
                    <Form.Item label="搜索课题">
                        <Input placeholder="请输入搜索的课题"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" icon={<SearchOutlined/>}/>
                    </Form.Item>
                </Form>
            </div>

            <Table
                dataSource={datasource}
                columns={columns}
                rowKey="_id"
                pagination={{
                    total,
                    onChange(pageNum) {
                        setQuery({
                            pageNum,
                            pageSize: 10,
                        })
                    }

                }}
            />
            <Modal title="添加课题" open={open} onCancel={() => setOpen(false)} onOk={() => {
                myForm.submit()
            }}>
                <Form layout={'vertical'} form={myForm} onFinish={handleFinish}>
                    <Form.Item label="课题名称" name={"name"} rules={[{required: true, message: "请输入课题名称"}]}>
                        <Input placeholder="请输入课题名称"/>
                    </Form.Item>

                    <Form.Item label="课题简介" name={"dsc"} rules={[{required: true, message: "请输入课题简介"}]}>
                        <Input.TextArea placeholder="请输入课题简介"/>
                    </Form.Item>
                </Form>
            </Modal>

        </Card>
    );
};

export default TopicPage;
