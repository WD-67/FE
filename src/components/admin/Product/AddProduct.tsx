import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, notification, Select } from 'antd';
import { InputNumber } from 'antd'
import { useAddProductMutation } from '@/api/product';
import { useGetSizesQuery } from '@/api/sizes';
import { useGetImageProductsQuery } from '@/api/imageProduct';
import { useGetCategorysQuery } from '@/api/category';
import { ISize } from '@/interfaces/size';
import { ICategory } from '@/interfaces/category';
import { ImageProduct } from '@/interfaces/imageProduct';

  

const { Option } = Select;

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const [addproduct] = useAddProductMutation();
    const { data: size } = useGetSizesQuery();
    const {data: image} = useGetImageProductsQuery();
    const {data: category} = useGetCategorysQuery();

    console.log(category);
    
    const onFinish = (products: any) => {
        console.log(products);
        addproduct(products);

        navigate('/admin/product');
        notification.success({
            message: 'Success',
            description: 'Thêm sản phẩm thành công',
        });
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
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
                    rules={[
                        { required: true, message: 'Please input your Price Product!' },
                        {
                            validator: (_, value) => {
                                if (!value || !isNaN(Number(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Price must be a number');
                            }
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
    label="sizes"
    name="sizes"
    rules={[{ required: true, message: 'Please select a size!' }]}
>
    
    <Select mode="multiple" placeholder="Select a size">
                        {size?.map((sizes:ISize) => (
                            <Option key={sizes._id} value={sizes._id}>
                                {sizes.name}
                            </Option>
                        ))}
                    </Select>
    
</Form.Item>

<Form.Item
    label="Image"
    name="image"
    rules={[{ required: true, message: 'Please input your image!' }]}
  
>
    <Select mode="multiple" style={{width: 200, height: 100}}  placeholder="Select a size" >
        {image?.data.map((images: ImageProduct) => (
            <Option key={images._id} value={images._id}>
                <img src={images.image} alt="" style={{width: '100%', height: 'auto'}} />
            </Option>
        ))}
    </Select>
</Form.Item>
        
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="category"
                    name="categoryId"
                    // rules={[{ required: true, message: 'Please input your description!' }]}
                >
                      <Select  placeholder="Select a size">
        {category?.data.map((categoryId: ICategory) => (
            <Option key={categoryId._id} value={categoryId._id}>
                {categoryId.name}
            </Option>
        ))}
    </Select>
                </Form.Item>
                <Form.Item
                    label="sale"
                    name="sale"
                    rules={[{ required: true, message: 'Please select a sale!' }]}
                >
                    <Select placeholder="Select a sale">
                        {/* {categories?.map(() => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))} */}
                         <Select.Option value="6">6</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Trạng thái" name="trang_thai">
          <Select>
            <Select.Option value="active">active</Select.Option>
          </Select>
        </Form.Item>
                <Form.Item label="Quanlity">
          <InputNumber />
        </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddProduct;
