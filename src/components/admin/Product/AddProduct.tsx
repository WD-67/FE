import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, notification, Select } from 'antd';
import { InputNumber } from 'antd'
import { useAddProductMutation } from '@/api/product';
import { useGetSizesQuery } from '@/api/sizes';
  

const { Option } = Select;

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const [addproduct] = useAddProductMutation();
    const { data: size } = useGetSizesQuery();
    const onFinish = (products: any) => {
        console.log(products);
        addproduct(products);

        navigate('/admin/product');
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
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name Product!' }, { min: 5, message: 'Product Name must be at least 5 characters.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                        { required: true, message: 'Please input your Price Product!' },
                        {
                            validator: (_, value) => {
                                if (!value || !isNaN(Number(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Price must be a number');
                            }
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
    label="sizes"
    name="sizes"
    rules={[{ required: true, message: 'Please select a size!' }]}
>
    
    <Select mode="multiple" placeholder="Select a size">
                        {size?.map((sizes:any) => (
                            <Option key={sizes.id} value={sizes.id}>
                                {sizes.name}
                            </Option>
                        ))}
                    </Select>
    
</Form.Item>

<Form.Item
    label="image"
    name="image"
    rules={[{ required: true, message: 'Please select a image!' }]}
>
    <Select mode="multiple" placeholder="Select a image">
         {/* You should use the IDs of the categories, not their status */}
         <Select.Option value="60c72b2f4f7d5c001f647e0a">Category 1</Select.Option>
        <Select.Option value="60c72b2f4f7d5c001f647e0b">Category 2</Select.Option>
        {/* Add
        {/* Add more options as needed */}
    </Select>
</Form.Item>
        
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
    label="Category"
    name="categoryId"
    rules={[{ required: true, message: 'Please select a category!' }]}
>
    <Select placeholder="Select a category">
        {/* You should use the IDs of the categories, not their status */}
        <Select.Option value="60c72b2f4f7d5c001f647e0a">Category 1</Select.Option>
        <Select.Option value="60c72b2f4f7d5c001f647e0b">Category 2</Select.Option>
        {/* Add more options as needed */}
    </Select>
</Form.Item>
                <Form.Item
                    label="sale"
                    name="sale"
                    rules={[{ required: true, message: 'Please select a sale!' }]}
                >
                    <Select placeholder="Select a sale">
                        {/* {categories?.map(() => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))} */}
                         <Select.Option value="6">6</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Trạng thái" name="trang_thai">
          <Select>
            <Select.Option value="active">active</Select.Option>
          </Select>
        </Form.Item>
                <Form.Item label="Quanlity">
          <InputNumber />
        </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddProduct;
