import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, notification, Select, Row, Col, Space, InputNumber ,ColorPicker, Image} from 'antd';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/product';
import { useGetCategorysQuery } from '@/api/category';
import { ICategory } from '@/interfaces/category';
import {  PlusOutlined } from '@ant-design/icons';
import UpLoand from '../../Image/UploadImageTintuc';
import mongoose from 'mongoose';
import { css } from '@emotion/react'
type Props = {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;


}
const { Option } = Select;
const UpdateProduct = ({setIsModalVisible} : Props) => {
    const navigate = useNavigate();
    const [updateProduct] = useUpdateProductMutation(); 
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetProductByIdQuery(String(id))
    console.log(data);
    const { data: category } = useGetCategorysQuery();
    const [currentImage, setCurrentImage] = useState([]);
    console.log(currentImage);
    

    const handleImage = (imageUrl: string) => {
        setCurrentImage([...currentImage, imageUrl]);
    };
    
    const handleImageRemove = (imageUrl: string) => {
        setCurrentImage(currentImage.filter(image => image !== imageUrl));
    };
    const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);
    const { TextArea } = Input;

    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            _id: data?.product._id,
            name: data?.product.name,
            price: data?.product.price,
            image: currentImage,
            description: data?.product.description,
            hot_sale: data?.product.hot_sale,
            categoryId: data?.product.categoryId ,
            listQuantityRemain : 
            data?.product.listQuantityRemain.map((item: any) => ({
                colorHex: item.colorHex,
                nameColor: item.nameColor,
                nameSize: item.nameSize,
                quantity: item.quantity,
            })),
       
        })
        setCurrentImage(data?.product.image)
        
    }, [ data ,form ,isLoading]);

    const onFinish = async (values: any) => {
        try {

            const updateProducts = await updateProduct({  ...values ,_id:id, image: [...currentImage] ,
                listQuantityRemain : 
                values.listQuantityRemain.map((item: any) => ({
                    colorHex:  typeof item.colorHex === 'string' ? item.colorHex : item.colorHex.toHexString(),
                    nameColor: item.nameColor,
                    nameSize: item.nameSize,
                    quantity: item.quantity,
                })),
          
             
             }).unwrap();
           
            notification.success({
                message: 'Cập nhật thành công',
                description: `The Size ${updateProducts.name} has been updated.`,
                duration: 2,
            });
            navigate('/admin/product');
        } catch (error) {
            console.error('Error updating product:', error);
            notification.error({
                message: 'Cập nhập thất bại',
                description: 'Đã xảy ra lỗi khi cập nhật sản phẩm',
                duration: 2,
            });
        }
    };
    const handleImageDelete = (item:any) => {
        if(currentImage.length == 1 ){
            notification.error({
                message: "Phải có it nhất 1 ảnh cho sản phẩm ",
                description: 'Xóa thất bại',
                duration: 2,
            })
            return
        }
        setCurrentImage(currentImage.filter(image => image !== item));
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
           <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"   

        >
        
                <Col span={20}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên sản phẩm!' },
                            { min: 5, message: 'Tên sản phẩm phải có ít nhất 5 ký tự.' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
    
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
                            {
                                validator: (_, value) =>
                                    !value || !isNaN(Number(value))
                                        ? Promise.resolve()
                                        : Promise.reject('Giá phải là một số'),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
    
                    <Form.Item
                        label="Category"
                        name="categoryId"
                        rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                    >
                        <Select placeholder="Chọn danh mục">
                            {category?.data?.map((categoryId: ICategory) => (
                                <Option key={categoryId._id} value={categoryId._id}>
                                    {categoryId.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                        <Form.Item
                        label="Sale"
                        name="hot_sale"
                        rules={[
                            // { required: true, message: 'Vui lòng nhập khuyến mại sản phẩm!' },
                            {
                            validator: (_, value) =>
                                !value || !isNaN(Number(value))
                                ? Promise.resolve()
                                : Promise.reject('Giá phải là một số'),
                            },
                        ]}
                        >
                        <InputNumber />
                        </Form.Item>
                 
                <Form.Item label="IMG" name="image">  
                <UpLoand onImageUpLoad={handleImage} onImageRemove={handleImageRemove} />
                Ảnh cũ :
                <Row gutter={16}>
        {currentImage?.map((item:any) => {
            return(
           

                <Col span={8} key={item}>
                  
                    <Image
                        width={90}
                        src={item}
                        
                    />
                    {/*delete image */}
                    <Button
                        type="primary"
                        danger
                        onClick={() => handleImageDelete(item)}
                    >
                        Xóa
                    </Button>
                </Col>
            )
        })}
    </Row>
                 

                </Form.Item>
          
         
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mô tả sản phẩm!' },
                        { min: 5, message: 'Mô tả sản phẩm phải có ít nhất 5 ký tự.' },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
            <Form.List
              name='listQuantityRemain'
              rules={[
                {
                  validator: async (_, names) => {
                    if (names.length < 1) {
                      return Promise.reject(new Error('Ít nhất phải có 1 biến thể'))
                    }
                  }
                }
              ]}
              initialValue={[]}
            >
              {(fields, { add, remove }, { errors }) => (
                <div css={formcss} style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space className='space' key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                      <Form.Item className='colorFormItem' {...restField} name={[name, 'colorHex']}>
                        <ColorPicker defaultValue={'fff'} showText={(color) => color.toHexString()} format='hex' />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'nameColor']} rules={[{ required: true, message: 'Trường mô tả là bắt buộc!' }]}>
                        <Input placeholder='Tên màu' />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'nameSize']} rules={[{ required: true, message: 'Trường mô tả là bắt buộc!' }]}>
                        <Input placeholder='Tên size' />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'quantity']} rules={[{ required: true, message: 'Trường mô tả là bắt buộc!' }]}>
                        <InputNumber placeholder='Số lượng' min={1} />
                      </Form.Item>
                      <PlusOutlined
                        onClick={() => {
                          remove(name)
                        }}
                      />
                    </Space>
                  ))}

                  <Button type='dashed' onClick={() => add()} block>
                    + Thêm biến thể
                  </Button>
                  <Form.ErrorList className='text-red-500' errors={errors} />
                </div>
              )}
            </Form.List>
            </Col>
                        <br />
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button  htmlType="submit">
                    Sửa sản phẩm mới
                </Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default UpdateProduct;
const formcss = css`
  .ant-space-item {
    margin: auto;
  }
  .ant-form-item {
    margin: auto;
  }
  .anticon-close {
    margin-bottom: 8px;
  }
`
