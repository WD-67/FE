import {
  useGetUserByIdQuery,
  useUpdateUserRoleMutation,
} from "../../../api/user";
import { useGetRoleQuery } from "../../../api/role";
import { IUser } from "@/interfaces/user";
import { Button, Form, Input, Skeleton, Select, DatePicker, Modal } from "antd";
import { useEffect, useState } from "react";
import LoadingOutlined from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
const { Option } = Select;
const { confirm } = Modal;
const AdminEditUser = () => {
  const { id } = useParams<{ id: string }>();
  const { data: userData, isLoading } = useGetUserByIdQuery(id || "");
  const [updateUser] = useUpdateUserRoleMutation();
  const { data: roleData } = useGetRoleQuery();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      role_name: userData?.user?.role.role_name,
    });
  }, [userData, form]);

  const onFinish = (values: IUser) => {
    const updatedUser = {
      ...values,
      _id: id,
    };

    updateUser(updatedUser)
      .unwrap()
      .then(() => {
        navigate("/admin/user");
        notification.success({
          message: "Sửa vai trò thành công",
          description: "Vai trò đã được cập nhật thành công.",
        });
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl text-center">
          Sửa vai trò người dùng: {userData?.user.name}
        </h2>
      </header>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
            Thông tin người dùng
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Họ và tên:</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userData?.user.fullname}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email:</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userData?.user.email}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Số điện thoại:
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userData?.user.phone}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Ngày sinh:</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userData?.user.ngaysinh}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          name="basic"
          initialValues={userData?.user}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className="max-w-md my-4 mx-auto"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item name="role_name" className="text-center">
            <Select className="w-full">
            {roleData?.map((role) =>
          role.role_name !== "admin" ? (
            <Option key={role._id} value={role.role_name}>
              {role.role_name}
            </Option>
          ) : null
        )}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0.1, span: 16 }} className="mt-4">
            <Button className="mr-32" type="primary" danger htmlType="submit">
              {isLoading ? <LoadingOutlined className="animate-spin" /> : "Sửa"}
            </Button>
            <Button
              type="primary"
              danger
              className="ml-8"
              onClick={() => navigate("/admin/user")}
            >
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      )}

      <Modal
        title="Sửa vai trò"
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={handleCancel}>
            Lưu
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete="off"
        >
          <Form.Item label="Vai trò" name="role_name">
            <Select value={form.getFieldValue("role")}>
              {roleData?.map((role) => (
                <Option key={role._id} value={role.role_name}>
                  {role.role_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminEditUser;
