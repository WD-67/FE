import { useAddUserMutation } from "../../../api/user";
import { IUser } from "../../../interfaces/user";
import { IRole } from "../../../interfaces/role";
import { Form, Button, Input, Select } from "antd";
import LoadingOutlined from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import { useGetRoleQuery } from "../../../api/role";
type FieldType = {
    name: string;
    fullname: string;
    ngaysinh: Date;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
};
const AdminUserAdd = () => {
    const [addUser, { isLoading }] = useAddUserMutation();
    const navigate = useNavigate();
    const { data: roleData} = useGetRoleQuery();
    const onFinish = (values: IUser) => {
        addUser(values)
            .unwrap()
            .then(() => navigate("/admin/user"));
    };
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm User</h2>
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
                    label="Tên user"
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

                <Form.Item<FieldType> label="Vai trò" name="role">
                   <Select mode="tags" placeholder="Chọn role">
                            {roleData?.map((role:any) =>(
                                <Select.Option key={role._id} value={role._id}>
                                    {role.role_name}
                                </Select.Option>
                            ))}
                    </Select>
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
                        onClick={() => navigate("/admin/user")}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminUserAdd;