import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, notification, InputNumber, Select } from 'antd';
import { useGetSizeByIdQuery, useGetSizesQuery } from '@/api/sizes';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/product';

const UpdateSize = () => {
    const { id } = useParams<{ id: string }>();


    const navigate = useNavigate();
    const [UpdateProduct] = useUpdateProductMutation();
    const { data, isLoading,refetch } = useGetProductByIdQuery(String(id));
    const { data: size } = useGetSizesQuery();
    console.log(data);
    

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            _id: data?.id,
            name: data?.name,
            price: data?.price,
            image: data?.image,
            sale: data?.sale,
            category: data?.category,
            quanlity: data?.quanlity,
            description: data?.description,
        });
    }, [data, form]);


    const onFinish = async (values: any) => {
        try {
            const UpdateProducts = await UpdateProduct({  ...values ,id}).unwrap();
            navigate('/admin/product');
            notification.success({
                message: 'Cập nhật thành công',
                description: `The Size ${UpdateProducts.name} has been updated.`,
                duration: 2,
            });
            refetch();
        } catch (error) {
            console.error('Error updating Size:', error);
            notification.error({
                message: 'Cập nhập thất bại',
                description: 'Đã xảy ra lỗi khi cập nhật Kích thước.',
                duration: 2,
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                initialValues={data?.product} // set initialValues to data
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
                    label="Sale"
                    name="sale"
                    rules={[
                        { required: true, message: 'Please input your Sale Product!' },
                        {
                            validator: (_, value) => {
                                if (!value || !isNaN(Number(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Sale must be a number');
                            }
                        }
                    ]}
                >
                    <Input />
                    </Form.Item>
        
        <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[
                        { required: true, message: 'Please input your Quantity Product!' },
                        {
                            validator: (_, value) => {
                                if (!value || !isNaN(Number(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Quantity must be a number');
                            }
                        }
                    ]}
                >
                    <Input />
                    </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="category"
                    name="categoryId"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
    label="Image"
    name="image"
    rules={[{ required: true, message: 'Please input your image!' }]}
>
    <Input />
    {form.getFieldValue('image') && <img src={form.getFieldValue('image')} alt="Product" />}
</Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button  htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateSize;
