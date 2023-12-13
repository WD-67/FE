import React, { useState, useEffect  } from "react";
import { Form, Input, Button, message, Modal, DatePicker } from "antd";
import { useUpdateUserMutation } from "@/api/user";
import { IUser } from "@/interfaces/user";
import { Link } from "react-router-dom";
import Joi from "@hapi/joi";
import moment from "moment";
const updateSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": 'Trường "Tên" không được để trống',
    "any.required": 'Trường "Tên" là bắt buộc',
  }),
  fullname: Joi.string().required().messages({
    "string.empty": 'Trường "Họ và tên đầy đủ" không được để trống',
    "any.required": 'Trường "Họ và tên đầy đủ" là bắt buộc',
  }),
  ngaysinh: Joi.date().min("1900-01-01").max("now").required().messages({
    "date.base": 'Trường "ngày sinh" phải là kiểu ngày tháng hợp lệ',
    "date.empty": 'Trường "ngày sinh" không được để trống',
    "date.min": 'Trường "ngày sinh" phải lớn hơn hoặc bằng 1900-01-01',
    "date.max": 'Trường "ngày sinh" không được lớn hơn ngày hiện tại',
    "any.required": 'Trường "ngày sinh" là bắt buộc',
  }),
});
interface UserProfileProps {
  handleHideUserProfile: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ handleHideUserProfile }) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const [updateProfile] = useUpdateUserMutation();
  const [errors, setErrors] = useState({});

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : {};
  const userId = user._id;
  const initialValues = {
    // ...Các trường khác
    ngaysinh: moment(user.ngaysinh).format("YYYY-MM-DD"), // Định dạng ngày sinh theo "yyyy-MM-dd"
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);
  const handleProfileUpdate = () => {
    form
      .validateFields()
      .then((values) => {
        const { error } = updateSchema.validate(values, { abortEarly: false });
        if (error) {
          const validationErrors = {};
          error.details.forEach((detail) => {
            const path = detail.path[0];
            const message = detail.message;
            validationErrors[path] = message;
          });
          setErrors(validationErrors);
          return;
        }

        const selectedDate = moment(values.ngaysinh, "YYYY-MM-DD").toDate()

        const updatedValues = {
          ...values,
          ngaysinh: selectedDate.toISOString(),
          _id: userId,
        };

        updateProfile(updatedValues)
          .then(() => {
            const updatedUser = { ...user, ...values };
            localStorage.setItem("user", JSON.stringify(updatedUser));

            message.success("Cập nhật thông tin thành công");
            form.resetFields();
            setVisible(false);
            handleHideUserProfile();
          })
          .catch((error) => {
            const errorMessage = error.response.data.message;
            message.error(errorMessage);
          });
      })
      .catch((error) => {
        console.log("Validation error:", error);
      });
  };

  const handleCancel = () => {
    setVisible(false);
    handleHideUserProfile();
  };

  return (
    <div>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        title={<h3 className="text-center">Thông tin người dùng</h3>}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="update" onClick={handleProfileUpdate}>
            Cập nhật
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" initialValues={user}>
          <Form.Item
            name="name"
            label="Tên"
            validateStatus={errors.name ? "error" : ""}
            help={errors.name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fullname"
            label="Họ và tên đầy đủ"
            validateStatus={errors.fullname ? "error" : ""}
            help={errors.fullname}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ngaysinh"
            label="Ngày sinh"
            validateStatus={errors.ngaysinh ? "error" : ""}
            help={errors.ngaysinh}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;
