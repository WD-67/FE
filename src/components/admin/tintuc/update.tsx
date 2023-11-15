import { Itintuc } from "@/interfaces/tintuc";
import { useGetTintucByIdQuery, useUpdateTintucMutation } from "../../../api/tintuc"
import { Button, Form, Input, Skeleton, Select, notification } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
type FieldType = {
  tieude: string;
  noidung: string;
  trang_thai: string;

};
const SuaTinTuc = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateTintucs] = useUpdateTintucMutation();
  const { data, isLoading, refetch } = useGetTintucByIdQuery(id || "")
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      tieude: data?.tieude,
      noidung: data?.noidung,
      trang_thai: data?.trang_thai
    });
  }, [data, form]);
  const onFinish = async (values: any) => {
    try {
      const updateTintuc = await updateTintucs({ ...values, _id: id }).unwrap();
      navigate('/admin/tintuc');
      notification.success({
        message: 'Cập nhật thành công',
        description: `The Role ${updateTintuc.tieude} has been updated.`,
        duration: 2,
      });
      refetch();
    } catch (error) {
      console.error('Error updating Role:', error);
      notification.error({
        message: 'Cập nhập thất bại',
        description: 'Đã xảy ra lỗi khi cập nhật Vai trò.',
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
        <h2 className="font-bold text-2xl">Sửa danh mục {data?.tieude}</h2>
      </header>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          initialValues={data}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 500, margin: '0 auto' }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            label="Tiêu đề"
            name="tieude"
            rules={[
              { required: true, message: "Vui lòng nhập tiêu đề !" },
              { min: 3, message: "Tiêu đề ít nhất 3 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Nội dung" name="noidung"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung!" },
              { min: 10, message: "Nội dung ít nhất 10 ký tự" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Trạng thái" name="trang_thai">
            <Select>
              <Select.Option value="active">active</Select.Option>
              <Select.Option value="deactive">deactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button htmlType="submit" className="mx-4">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Sửa"
              )}
            </Button>
            <Button

              className="ml-2 text-blue-500"
              onClick={() => navigate("/admin/tintuc")}
            >
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default SuaTinTuc;