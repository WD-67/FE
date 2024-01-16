import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Cascader, Checkbox, Col, ColorPicker, Form, Input, notification, Row, Select, Space } from 'antd';
import { InputNumber } from 'antd'
import { useAddProductMutation } from '@/api/product';
import { useGetSizesQuery } from '@/api/sizes';
import { useGetImageProductsQuery } from '@/api/imageProduct';
import { useGetCategorysQuery } from '@/api/category';
import { ISize } from '@/interfaces/size';
import { ICategory } from '@/interfaces/category';
import { ImageProduct } from '@/interfaces/imageProduct';
import { useGetColorsQuery } from '@/api/color';
import { ISale } from '@/types';
import { useGetAllSalesQuery } from '@/api/sale/sale.api';
import { IColor } from '@/interfaces/color';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import UpLoand from "../../Image/UploadImageTintuc"
import { css } from '@emotion/react'
import { AnyAction } from '@reduxjs/toolkit';
  

const { Option } = Select;
type Props = {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;


}
const AddProduct = ({setIsModalVisible} : Props) => {
    const navigate = useNavigate();
    const [addproduct] = useAddProductMutation();
    const {data: image} = useGetImageProductsQuery();
    const {data: category} = useGetCategorysQuery();
    const {data: sale} = useGetAllSalesQuery();
    const [img, setImg] = useState<any>([]);
    const handleImage = (url: string) => {
      setImg([...img, url]);
    };
    const handleImageRemove = (url: string) => {
      setImg((prevImg: any) => prevImg.filter((imageUrl: string) => imageUrl !== url));
    };
    console.log(sale);
    
    const { TextArea } = Input;

    const [form] = Form.useForm();


    const onFinish = (products: any) => {
        console.log(products);
        const product= {
            name: products.name,
            price: products.price,
            image: img,
            description: products.description,
            hot_sale:  products.hot_sale,
            categoryId: products.categoryId,
            listQuantityRemain : 
            products.listQuantityRemain.map((item: any) => ({
                colorHex: item.colorHex.toHexString(),
                nameColor: item.nameColor,
                nameSize: item.nameSize,
                quantity: item.quantity,
            })),
        }
       
        
        // return;
        addproduct(product as any);
        setIsModalVisible(false);
        
        form.resetFields();
        navigate('/admin/product');
        notification.success({
            message: 'Success',
            description: 'Thêm sản phẩm thành công',
        });
        
    };
   

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Form
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
                    Thêm sản phẩm mới
                </Button>
            </Form.Item>
        </Form>
    </div>
    
    );
};

export default AddProduct;
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
