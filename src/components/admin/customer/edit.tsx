import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, notification, InputNumber } from 'antd';
import { useGetCustomerByIdQuery, useUpdateCustomerMutation } from '../../../api/customer';
import { ICustomer } from '../../../interfaces/customer';
type FieldType = {
    id: string | number;
    name: string;
    fullname: string;
    ngaysinh: Date;
    confirmPassword: string;
};
const AdminCustomerEdit = () => {
    const { id } = useParams<{ id: string}>();
    const navigate = useNavigate();
    const [updateCustomer] = useUpdateCustomerMutation();
    const { data, isLoading, refetch } = useGetCustomerByIdQuery(String(id))

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            id: data?.id,
            name: data?.name,
            fullname: data?.fullname,
            ngaysinh: data?.ngaysinh,
            confirmPassword: "",
        });
    }, [data, form]);


    const onFinish = async (values: any) => {
        try {
            const updatedCustomer = await updateCustomer({  ...values , id}).unwrap();
            navigate('/admin/customer');
            notification.success({
                message: 'Cập nhật thành công',
                description: `The Customer ${updatedCustomer.name} has been updated.`,
                duration: 2,
            });
            refetch();
        } catch (error) {
            console.error('Error updating Customer:', error);
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
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Sửa User : {data?.name}</h2>
            </header>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                onFinish={onFinish}
            >     
                <Form.Item label="Tên" name="name" rules={[
                    { required: true, message: 'Please input your Name!' },
                    { min: 1, message: 'Name must be at least 1 characters.' },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Confirm Password" name="confirmPassword">
                     <Input.Password />
                 </Form.Item>

                 <Form.Item<FieldType> label="Họ và tên" name="fullname">
                   <Input />
                 </Form.Item>

                 <Form.Item<FieldType> label="Ngày sinh" name="ngaysinh">
                     <Input />
                 </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button  htmlType="submit">
                        Update Customer
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminCustomerEdit;