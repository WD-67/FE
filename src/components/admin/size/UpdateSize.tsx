import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, notification, InputNumber } from 'antd';
import { useGetSizeByIdQuery, useUpdateSizeMutation } from '@/api/sizes';

const UpdateSize = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [updateSize] = useUpdateSizeMutation();
    const { data, isLoading,refetch } = useGetSizeByIdQuery(String(id));
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            id: data?.id,
            name: data?.name,
            quantity: data?.quantity,
        });
    }, [data, form]);


    const onFinish = async (values: any) => {
        try {
            const updatedSize = await updateSize({  ...values ,id}).unwrap();
            navigate('/admin/size');
            notification.success({
                message: 'Cập nhật thành công',
                description: `The Size ${updatedSize.name} has been updated.`,
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
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                onFinish={onFinish}
            >     
                <Form.Item label="Size Name" name="name" rules={[
                    { required: true, message: 'Please input your Name Size!' },
                    { min: 1, message: 'Size Name must be at least 5 characters.' },
                 
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Quantity" name="quantity">
                    <InputNumber />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button  htmlType="submit">
                        Update Size
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateSize;
