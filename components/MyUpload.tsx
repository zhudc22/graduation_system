import React from 'react';
import {UploadOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {Button, Upload} from 'antd';

const props: UploadProps = {
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange({file, fileList}) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },
    defaultFileList: [],
};

const MyUpload: React.FC = () => (
    <Upload {...props}>
        <Button icon={<UploadOutlined/>}>Upload</Button>
    </Upload>
);

export default MyUpload;