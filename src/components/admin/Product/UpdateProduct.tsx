import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, notification, Select, Row, Col, Space, InputNumber } from 'antd';
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


const { Option } = Select;
const UpdateProduct: React.FC = () => {
    const navigate = useNavigate();
    const [updateProduct] = useUpdateProductMutation(); 
    const { id } = useParams<{ id: string }>();
    const { data } = useGetProductByIdQuery(String(id)); 
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
            colorSizes: data?.product.colorSizes?.map((colorSize: any) => ({
                color: colorSize.color,
                size: colorSize.sizes.map((size: any) => size.size)
              // Change here

            }))
        })
    }, [ data ,form]);

    const onFinish = async (values: any) => {
        try {

            const updateProducts = await updateProduct({  ...values ,_id:id, image: [currentImage] ,
                colorSizes: values.colorSizes.map((colorSize: any) => ({
                    color: colorSize.color,
                    sizes: colorSize.size.map((size: string) => ({ size }))
                }))
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

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
             <div>
             <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 800, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Row gutter={20}>
                <Col span={12}>
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name Product!' }, { min: 5, message: 'Product Name must be at least 5 characters.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your Price Product!' }, { validator: (_, value) => (!value || !isNaN(Number(value))) ? Promise.resolve() : Promise.reject('Price must be a number') }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="category"
                    name="categoryId"
                >
                    <Select placeholder="Select a size">
                        {category?.data?.map((categoryId: ICategory) => (
                            <Option key={categoryId._id} value={categoryId._id}>
                                {categoryId.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Sale" name="hot_sale">
                    <InputNumber />
                </Form.Item>
                <Form.List name="colorSizes">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'color']}
                                        rules={[{ required: true, message: 'Missing color' }]}
                                    >
                                        <Select placeholder="Color" style={{width: 120}}>
                                            {color?.color?.map((color: IColor) => (
                                                <Option key={color._id} value={color._id}>
                                                    {color.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'size']}
                                        rules={[{ required: true, message: 'Missing size' }]}
                                    >
                                        <Select mode='multiple' placeholder="Size" style={{width: 80}}>
                                            {size?.map((size: ISize) => (
                                                <Option key={size._id} value={size._id}>
                                                    {size.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add ColorSize
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item label="Quanlity" name="quantity">
                    <InputNumber />
                </Form.Item>
               
                </Col>
                <Col span={12}>
                    <Form.Item label="Image" name="image">
                    <UpLoand 
    onImageUpLoad={handleImage} 
    onImageRemove={handleImageRemove} 
    img={currentImage}
/>
                    </Form.Item>

                
                    <Form.Item label="Description" name="description">
                        <TextArea rows={4} />
                    </Form.Item>
                    
                </Col>
                </Row>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </div>
    );
};

export default UpdateProduct;
