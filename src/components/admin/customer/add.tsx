import { useAddCustomerMutation } from "../../../api/customer";
import { ICustomer } from "../../../interfaces/customer";
import { Form, Button, Input } from "antd";
import LoadingOutlined from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
type FieldType = {
    name: string;
    fullname: string;
    ngaysinh: Date;
    email: string;
    password: string;
    confirmPassword: string;
    status: string;
};
const AdminCustomerAdd = () => {
    const [addCustomer, { isLoading }] = useAddCustomerMutation();
    const navigate = useNavigate();
    const onFinish = (values: ICustomer) => {
        addCustomer(values)
            .unwrap()
            .then(() => navigate("/admin/customer"));
    };
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm Khách hàng</h2>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên khách hàng"
                    name="name"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên !" },
                        { min: 3, message: "Sản phẩm ít nhất 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Họ và tên" name="fullname">
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Ngày sinh" name="ngaysinh">
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Email" name="email">
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Password" name="password">
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType> label="Confirm Password" name="confirmPassword">
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        {isLoading ? (
                            <LoadingOutlined className="animate-spin" />
                        ) : (
                            "Thêm"
                        )}
                    </Button>
                    <Button
                        type="primary"
                        danger
                        className="ml-2"
                        onClick={() => navigate("/admin/customer")}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminCustomerAdd;