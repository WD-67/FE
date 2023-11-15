import React, { useState } from 'react';
import { Button, Space, Table, Spin, notification } from 'antd';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useGetImageProductsQuery, useRemoveImageProductMutation } from '@/api/imageProduct';
import { ImageProduct } from '@/interfaces/imageProduct';

type Props = {
}

const Image = (props: Props) => {
    const { data: imageData, refetch ,isLoading } = useGetImageProductsQuery();
    // console.log('imageproductData', imageData.data);
    const [softDeleteImageProduct] = useRemoveImageProductMutation();
    const handleSoftDelete = async (id: string) => {
        try {
            await softDeleteImageProduct(id);
            notification.success({
                message: 'Success',
                description: 'ImageProduct soft deleted successfully!',
            });
            refetch();
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to soft delete ImageProduct',
            });
        }
    }; 
    const dataSource =  imageData && imageData.data ? imageData.data.map((image: any) => ({
        key: image?._id,
        image: image?.image,
        trang_thai: image?.trang_thai,
    })) : [];
    console.log('dataSource', dataSource);
    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: any) => {
                if (Array.isArray(image.name)) {
                    return image.map((item: any, index: number) => {
                        return <img src={item.image} alt="" width={100} />;
                    });
                } else {
                    // Handle the case when image is not an array
                    return <img src={image} alt="" width={100} />;
                }
            },
        },
  {
    title: 'Trạng thái',
    dataIndex: 'trang_thai',
    key: 'trang_thai',
  },

  {
    title: 'Action',
    key: 'action',
    render: ({ key: id }: { key: number | string }) => {
        return (
            <>
                <Button>
                    <Link to={`/admin/imageProduct/update/${id}`}><EditOutlined /></Link>
                </Button>
                <Button onClick={() => handleSoftDelete(id.toString())} type="text" danger className="ml-2">
                    <DeleteTwoTone />
                </Button>
            </>
        );
    },
},

];
return (
    <div>
        <header className="flex items-center justify-between mb-4">
            <h2 className="text-2xl">Quản lý Image</h2>
            <Button type="primary" danger>
                <Link to="/admin/imageProduct/add">Thêm Image</Link>
            </Button>
        </header>
        <Table dataSource={dataSource} columns={columns} />
    </div>
);              
}


export default Image;