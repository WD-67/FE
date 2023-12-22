import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, notification, Select, Row, Col, Space, InputNumber ,ColorPicker} from 'antd';
import { useGetSizesQuery } from '@/api/sizes';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/product';
import { useGetCategorysQuery } from '@/api/category';
import { ICategory } from '@/interfaces/category';
import { ISize } from '@/interfaces/size';
import { IColor } from '@/interfaces/color';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetColorsQuery } from '@/api/color';
import UpLoand from '../../Image/UploadImageTintuc';
import mongoose from 'mongoose';
import { css } from '@emotion/react'


const { Option } = Select;
const UpdateProduct: React.FC = () => {
    const navigate = useNavigate();
    const [updateProduct] = useUpdateProductMutation(); 
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetProductByIdQuery(String(id)); 
    const { data: size } = useGetSizesQuery();
    const { data: category } = useGetCategorysQuery();
    const { data: color } = useGetColorsQuery();




    const [currentImage, setCurrentImage] = useState<Array[]>(data?.product.image || []);

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
            quantity: data?.product.quantity,
            hot_sale: data?.product.hot_sale,
            categoryId: data?.product.categoryId ,
            trang_thai: data?.product.trang_thai,
            listQuantityRemain : 
            data?.product.listQuantityRemain.map((item: any) => ({
                colorHex: item.colorHex,
                nameColor: item.nameColor,
                nameSize: item.nameSize,
                quantity: item.quantity,
            })),
       
        })
    }, [ data ,form ,isLoading]);

    const onFinish = async (values: any) => {
        try {

            const updateProducts = await updateProduct({  ...values ,_id:id, image: [currentImage] ,
                listQuantityRemain : 
                values.listQuantityRemain.map((item: any) => ({
                    colorHex: item.colorHex.toHexString(),
                    nameColor: item.nameColor,
                    nameSize: item.nameSize,
                    quantity: item.quantity,
                })),
                categoryId: 
                values.categoryId.map((item: any) => ({
                    _id: item,
    
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
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
        
                <Col span={15}>
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
                    <Row gutter={20} style={{ marginLeft: '90px' }}>
                    <Col span={12}>
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
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        label="Quanity"
                        name="quantity"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số lượng sản phẩm!' },
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
                    </Col>
                    </Row>
                   <Col style={{ marginLeft: '200px' }}>
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

                </Col>
    
                <Row gutter={1} style={{ marginLeft: '26px' }}>
            <Col span={12} >
                <Form.Item label="IMG" name="image">
                    <UpLoand onImageUpLoad={handleImage} onImageRemove={handleImageRemove} />
                </Form.Item>
            </Col>
            <Col span={12}  style={{ marginRight: '10px' }}>
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
            </Col>
    
            </Row>
    
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button  htmlType="submit">
                    Thêm sản phẩm mới
                </Button>
            </Form.Item>
        </Form>
        </div>
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
