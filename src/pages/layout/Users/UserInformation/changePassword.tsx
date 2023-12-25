import React, { useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { useChangePasswordMutation } from "@/api/user";
import { IUser } from "@/interfaces/user";
import Joi from "@hapi/joi";

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().label("Mật khẩu cũ"),
  newPassword: Joi.string().min(6).required().label("Mật khẩu mới").messages({
    "string.empty": "Mật khẩu mới không được để trống",
    "string.min": "Mật khẩu mới phải có ít nhất 6 ký tự",
    "any.required": "Mật khẩu mới là trường bắt buộc",
  }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "any.only": "Mật khẩu xác nhận không trùng khớp",
      "any.required": "Mật khẩu xác nhận là trường bắt buộc",
    }),
});

interface ChangePasswordProps {
  handleHideChangePassword: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  handleHideChangePassword,
}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [changePassword] = useChangePasswordMutation();

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : {};
  const userId = user._id;
  const handlePasswordChange = async () => {
    try {
      const values = await form.validateFields();
      const { error } = changePasswordSchema.validate(values, {
        abortEarly: false,
      });
      if (error) {
        const validationErrors: { [key: string]: string } = {};
        error.details.forEach((detail) => {
          const path = detail.path[0] as string;
          const message = detail.message;
          validationErrors[path] = message;
        });
        setErrors(validationErrors);
        return;
      }
  
      const response = await changePassword({ ...values, _id: userId });
      const { data } = response;
  
      if (data.errorMessage) {
        if (data.errorMessage === "Mật khẩu mới và xác nhận mật khẩu không khớp") {
          setErrors({ confirmPassword: "Mật khẩu xác nhận không trùng khớp" });
        } else {
          message.error(data.errorMessage);
        }
      } else {
        message.success("Đổi mật khẩu thành công");
        form.resetFields();
        setVisible(false);
        handleHideChangePassword();
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        message.error('Mật khẩu cũ không đúng');
      } else {
        message.error('Đổi mật khẩu không thành công, mật khẩu cũ không đúng');
      }
    }
  };

  const handleCancel = () => {
    setVisible(false);
    handleHideChangePassword();
  };

  return (
    <div>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        title={<h3 className="text-center">Đổi mật khẩu</h3>}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="change" onClick={handlePasswordChange}>
            Đổi mật khẩu
          </Button>,
        ]}
      >
          <Form form={form} layout="vertical">
            <Form.Item
              name="oldPassword"
              label="Mật khẩu hiện tại"
              validateStatus={errors.oldPassword ? "error" : ""}
              help={errors.oldPassword}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              validateStatus={errors.newPassword ? "error" : ""}
              help={errors.newPassword}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              validateStatus={errors.confirmPassword ? "error" : ""}
              help={errors.confirmPassword}
            >
              <Input.Password />
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
};

export default ChangePassword;
