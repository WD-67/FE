import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, notification, Select, Upload } from 'antd';
import {
    InputNumber
  } from 'antd';
  import { PlusOutlined } from '@ant-design/icons';


import { useAddImageProductMutation } from '@/api/imageProduct';

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  
const { Option } = Select;
const AddImageProduct: React.FC = () => {
    const navigate = useNavigate();
    const [addImageProduct] = useAddImageProductMutation();
    const onFinish = (size: any) => {
        console.log(size);
        addImageProduct(size);

        navigate('/admin/imageProduct');
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
        
        <Form.Item label="image" valuePropName="image" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8  }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item label="Trạng thái" name="trang_thai">
          <Select>
            <Select.Option value="active">active</Select.Option>
          </Select>
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

export default AddImageProduct;
