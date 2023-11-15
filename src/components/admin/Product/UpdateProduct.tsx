import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, notification, Select } from 'antd';
import { useGetSizesQuery } from '@/api/sizes';
import { useGetProductByIdQuery, useUpdateProductMutation } from '@/api/product';
import { useGetImageProductsQuery } from '@/api/imageProduct';
import { useGetCategorysQuery } from '@/api/category';
import { ICategory } from '@/interfaces/category';
import { ISize } from '@/interfaces/size';
import { ImageProduct } from '@/interfaces/imageProduct';
const { Option } = Select;
const UpdateSize = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [UpdateProduct] = useUpdateProductMutation();
    const { data, isLoading,refetch } = useGetProductByIdQuery(String(id));
    const { data: size } = useGetSizesQuery();
    const {data : image} = useGetImageProductsQuery()
    const {data : category} = useGetCategorysQuery()
    console.log(data);
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            _id: data?._id,
            name: data?.name,
            price: data?.price,
            image: data?.image,
            sale: data?.sale,
            category: data?.categoryId,
            quanlity: data?.quanlity,
            description: data?.description,
            trang_thai: data?.trang_thai,
        });
    }, [data, form]);
    const onFinish = async (values: any) => {
        try {
            const UpdateProducts = await UpdateProduct({  ...values ,_id:id}).unwrap();
            if (Array.isArray(values.categoryId)) {
                values.categoryId = values.categoryId.join(',');
            }
            if (Array.isArray(values.sizeItem)) {
                values.sizeItem = values.sizeItem.join(',');

            }
            
            refetch();
            
           

            navigate('/admin/product');
            notification.success({
                message: 'Cập nhật thành công',
                description: `The Size ${UpdateProducts.name} has been updated.`,
                duration: 2,
            });
            refetch();
        } catch (error) {
            console.error('Error updating Size:', error);
            notification.error({
                message: 'Cập nhập thất bại',
                description: 'Đã xảy ra lỗi khi cập nhật Kích thước.',
                duration: 2,
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                initialValues={data?.product} // set initialValues to data
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
        {size ? size.map((sizeItem: ISize) => (
            <Option key={sizeItem._id} value={sizeItem._id}>
                {sizeItem.name}
            </Option>
        )) : []}
    </Select>
</Form.Item>    
        <Form.Item
                    label="Sale"
                    name="sale"
                    rules={[
                        { required: true, message: 'Please input your Sale Product!' },
                        {
                            validator: (_, value) => {
                                if (!value || !isNaN(Number(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Sale must be a number');
                            }
                        }
                    ]}
                >
                    <Input />
                    </Form.Item>
        
        <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[
                        { required: true, message: 'Please input your Quantity Product!' },
                        {
                            validator: (_, value) => {
                                if (!value || !isNaN(Number(value))) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Quantity must be a number');
                            }
                        }
                    ]}
                >
                    <Input />
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
                <Form.Item label="Trạng thái" name="trang_thai">
          <Select>
            <Select.Option value="active">active</Select.Option>
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
                
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button  htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateSize;
