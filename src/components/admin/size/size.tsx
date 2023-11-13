import React, { useEffect, useState } from 'react';
import { Button, Space, Spin, Table, Tag, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {DeleteTwoTone, EditOutlined} from 
'@ant-design/icons'; 
import { ISize } from '@/interfaces/size';
import { useGetSizesQuery, useRemoveSizeMutation } from '@/api/sizes';
import { Link } from 'react-router-dom';
type Props = {};
const Size = (props: Props) => {
    const { data: sizeData ,refetch} = useGetSizesQuery();
    const [removeSize] = useRemoveSizeMutation()
    const handleSoftDelete = async (id: string) => {
        try {
            await removeSize(id);
            notification.success({
                message: 'Success',
                description: 'size soft deleted successfully!',
            });
            refetch();
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'size to soft delete size',
            });
        }
    }; 
    const dataSource = sizeData?.map((size: any) => ({
        key: size._id,
        name: size.name,
       quantity: size.quantity

    }));
    console.log(dataSource);
    

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: 'Quanlity',
    dataIndex: 'quantity',
    key: 'quantity',
  
  },

  {
    title: 'Action',
    key: 'action',
    render: ({ key: id }: { key: number | string }) => {
        return (
            <>
                <Button>
                    <Link to={`/admin/size/update/${id}`}><EditOutlined /></Link>
                </Button>
                <Button onClick={() => handleSoftDelete(id.toString())} type="text" danger className="ml-2">
                    <DeleteTwoTone />
                </Button>
            </>
        );
    },
  },
];

return(
    <div>
       <header className="flex items-center justify-between mb-4">
            <h2 className="text-2xl">Quản lý SIZE</h2>
            <Button type="primary" danger>
                <Link to="/admin/product/add">Thêm sản phẩm</Link>
            </Button>
        </header>
      <Table dataSource={dataSource} columns={columns} />
    </div>
)
}
export default Size;