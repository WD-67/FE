import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, notification, Select } from 'antd';
import {
    InputNumber
  } from 'antd';

import { useAddSizeMutation } from '@/api/sizes';

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  
const { Option } = Select;
const AddSize: React.FC = () => {
    const navigate = useNavigate();
    const [addSize] = useAddSizeMutation();
    const onFinish = (size: any) => {
        console.log(size);
        addSize(size);

        navigate('/admin/size');
        notification.success({
            message: 'Success',
            description: 'Thêm sản phẩm thành công',
        });
    };


    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Size Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name Product!' }, { min: 1, message: 'Product Name must be at least 5 characters.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Quanlity"
                name="quantity">
          <InputNumber />
        </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button htmlType="submit">
                        Add New Size
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddSize;
