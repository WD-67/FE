import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, notification,Skeleton, Select } from 'antd';
import { useEffect, useState } from 'react';
import UpLoand from '../../Image/UploadImageTintuc';
import { useGetImagetintucByIdQuery, useUpdateImagetintucMutation } from '@/api/imagetintuc';
import { useGetTintucQuery } from '@/api/tintuc';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Itintuc } from '@/interfaces/tintuc';
type FieldType = {
  Id_news:string;
  trang_thai:string;
  image: Array<string>;
};
const SuaImageTinTuc = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateImage] = useUpdateImagetintucMutation();
  const { data, isLoading, refetch } = useGetImagetintucByIdQuery(id || "")
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      Id_news:data?.Id_news,
      image: data?.image,
      trang_thai: data?.trang_thai
    });
    return () => {
      resetEditedImg();
    };
  }, [data, form]);
  const [editedImg, setEditedImg] = useState<any>([]);
  const [img, setImg] = useState<any>([]);
  const resetEditedImg = () => {
    setEditedImg([]);
  };
  const handleImage = (url: string) => {
    setImg([...img, url]);
  };
  const handleImageRemove = (url: string) => {
    setImg((prevImg: any) => prevImg.filter((imageUrl: string) => imageUrl !== url));
  }
  const { data: tintucData } = useGetTintucQuery();
  const onFinish = async (values: any) => {
    try {
      const updateImg = await updateImage({ ...values, _id: id }).unwrap();
      navigate('/admin/imagetintuc');
      notification.success({
        message: 'Cập nhật thành công',
        description: `The Role  has been updated.${ updateImg._id} `,
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
 
  return (

    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Sửa ảnh tin tức</h2>
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
           <Form.Item<FieldType> label="Chọn tin tức"  name="Id_news">
          <Select>
            {tintucData?.map((tintuc: Itintuc) => (
              <Option key={tintuc._id} value={tintuc.tieude}>
                 {tintuc.tieude}
              </Option>
            ))}
          </Select>
        </Form.Item>
          <Form.Item<FieldType> label="Nội dung"
          name="image">
            <UpLoand onImageUpLoad={handleImage} onImageRemove={handleImageRemove} />
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
  )
}
export default SuaImageTinTuc