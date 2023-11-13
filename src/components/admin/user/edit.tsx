import { useGetUserByIdQuery, useUpdateUserMutation } from "../../../api/user";
import { IUser } from "../../../interfaces/user";
import { Button, Form, Input, Skeleton } from "antd";
import { useEffect } from "react";
import LoadingOutlined from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

type FieldType = {
  _id: string | number;
  name: string;
  fullname?: string;
  ngaysinh?: Date;
  confirmPassword?: string;
};

const AdminEditUser = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userData, isLoading } = useGetUserByIdQuery(String(id));
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      _id: userData?.user._id,
      name: userData?.user.name,
      fullname: userData?.user.fullname,
      ngaysinh: userData?.user.ngaysinh,
      confirmPassword: "",
    });
  }, [userData, form]);

  const onFinish = (values: FieldType) => {
    const updatedUser: FieldType = {
      ...values,
      _id,
    };

    updateUser(updatedUser)
      .unwrap()
      .then(() => navigate("/admin/user"));
  };

  return (
    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Sửa User : {userData?.user.name}</h2>
      </header>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          name="basic"
          initialValues={userData?.users}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên sản phẩm!" },
              { min: 3, message: "Sản phẩm ít nhất 3 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Họ và tên" name="fullname">
            <Input />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="ngaysinh">
            <Input />
          </Form.Item>

          <Form.Item label="Nhập lại mật khẩu" name="confirmPassword">
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" danger htmlType="submit">
              {isLoading ? (
                <LoadingOutlined className="animate-spin" />
              ) : (
                "Sửa"
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
      )}
    </div>
  );
};

export default AdminEditUser;