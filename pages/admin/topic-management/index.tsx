import React, {useEffect, useState} from "react";
import {Button, Card, Form, Input, message, Modal, Table} from "antd";
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import {ColumnsType} from 'antd/lib/table';
import {get} from '@/utils/request';

interface Topic {
    id: string;
    projectName: string;
    teacherName: string;
    stuName: string;
    isAllowToReply: boolean;
    isPassed: boolean;
}

const TopicPage: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<any>({
        pageNum: 1,
        pageSize: 10,
        queryCondition: ''
    });
    const [myForm] = Form.useForm();
    const [datasource, setDatasource] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);

    const gotoUpdatePage = (id: string) => {
        // 更新页面的逻辑
    };

    const columns: ColumnsType<Topic> = [
        {title: "课题名称", dataIndex: "projectName", key: "projectName", align: "center"},
        {title: "教师", dataIndex: "teacherName", key: "teacherName", align: "center"},
        {title: "学生", dataIndex: "stuName", key: "stuName", align: "center"},
        {title: "是否允许答辩", dataIndex: "isAllowToReply", key: "isAllowToReply", align: "center"},
        {title: "是否通过答辩", dataIndex: "isPassed", key: "isPassed", align: "center"},
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (text: any, record: any) => (
                <div className='flex justify-center gap-3'>
                    <Button onClick={() => gotoUpdatePage(record.id)} type="primary" shape="circle"
                            icon={<EditOutlined/>}/>
                    <Button type='primary' danger shape="circle" icon={<DeleteOutlined/>}/>
                </div>
            ),
        },
    ];

    const handleFinish = (v: any) => {
        console.log(v);
        // 调接口
        setOpen(false);
        setQuery({
            ...query,
            queryCondition: v
        });
    };

    const handleSearch = ({searchTerm}: any) => {
        setQuery({
            ...query,
            pageNum: 1, // 搜索时重置到第一页
            queryCondition: searchTerm
        });
        console.log(searchTerm)
    };

    const handleModalClose = () => {
        setOpen(false);
        myForm.resetFields();
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get('graduateProject/pageGraduateProjectList', query);
                if (response.code === '0') {
                    setDatasource(response.data);
                    setTotal(response.total || response.data.length);
                } else {
                    message.error(response.msg);
                }
            } catch (error) {
                console.error('Error:', error);
                message.error('Error fetching data');
            }
        };

        fetchData();
    }, [query]);

    return (
        <Card title={"课题列表"} extra={
            <Button type="primary" onClick={() => setOpen(true)}>
                添加课题
            </Button>
        }>
            <div className="flex justify-center mb-10">
                <Form layout={"inline"} onFinish={handleSearch}>
                    <Form.Item name="searchTerm">
                        <Input placeholder="请输入搜索的课题"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" icon={<SearchOutlined/>} htmlType="submit"/>
                    </Form.Item>
                </Form>
            </div>

            <Table
                dataSource={datasource}
                columns={columns}
                rowKey="id"
                pagination={{
                    total,
                    onChange(pageNum) {
                        setQuery({
                            ...query,
                            pageNum,
                        });
                    },
                }}
            />
            <Modal title="添加课题" open={open} onCancel={handleModalClose} onOk={() => {
                myForm.submit();
            }}>
                <Form layout={'vertical'} form={myForm} onFinish={handleFinish}>
                    <Form.Item label="课题名称" name={"projectName"}
                               rules={[
                                   {required: true, message: "请输入课题名称"},
                                   {type: 'string', message: "课题名称必须是字符串"}
                               ]}>
                        <Input placeholder="请输入课题名称"/>
                    </Form.Item>
                    <Form.Item label="课题简介" name={"description"}
                               rules={[
                                   {required: true, message: "请输入课题简介"},
                                   {type: 'string', message: "课题简介必须是字符串"},
                               ]}>
                        <Input.TextArea placeholder="请输入课题简介"/>
                    </Form.Item>
                    <Form.Item label="学院id" name={"projectDepartmentId"}
                               rules={[
                                   {required: true, message: "请输入学院id"},
                                   {type: 'number', message: "学院id必须是数字"},
                               ]}>
                        <Input placeholder="请输入学院id"/>
                    </Form.Item>
                    <Form.Item label="教师号" name={"teacherId"}
                               rules={[
                                   {required: true, message: "请输入教师号"},
                                   {type: 'number', message: "教师号必须是数字"},
                               ]}>
                        <Input placeholder="请输入教师号"/>
                    </Form.Item>
                    <Form.Item label="学生学号" name={"stuId"}
                               rules={[
                                   {type: 'number', message: "学生学号必须是数字"},
                               ]}>
                        <Input placeholder="请输入学生学号"/>
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default TopicPage;
