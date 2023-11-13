import { useAddRoleMutation} from "../../../api/role";
import { IRole } from "../../../interfaces/role";
import { Form, Button, Input } from "antd";
import LoadingOutlined from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
type FieldType = {
    role_name: string;
    description: string;
    ngaysinh: Date;
    trang_thai: string;
};
const AdminRoleAdd = () => {
    const [addCustomer, { isLoading }] = useAddRoleMutation();
    const navigate = useNavigate();
    const onFinish = (values: IRole) => {
        addCustomer(values)
            .unwrap()
            .then(() => navigate("/admin/role"));
    };
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm vai trò</h2>
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
                    label="Tên vai trò"
                    name="role_name"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên !" },
                        { min: 3, message: "Tên ít nhất 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Mô tả" name="description">
                    <Input />
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
                        onClick={() => navigate("/admin/role")}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminRoleAdd;