import React from 'react';
import { Button, Table, notification, Spin } from 'antd';
import { useGetDeletedProductsQuery, useRestoreProductMutation , usePermanentDeleteProductMutation} from '../../../api/product';
import {
    SyncOutlined ,
    DeleteTwoTone
  } from '@ant-design/icons';
type Props = {};

const RecycleBin = (props: Props) => {
    const { data: deletedProducts, isLoading,refetch } = useGetDeletedProductsQuery();
    const [restoreProduct, { isLoading: isRestoring }] = useRestoreProductMutation();
    const [permanentDeleteProduct, { isLoading: isDeleting }] = usePermanentDeleteProductMutation();
    console.log(deletedProducts);
    const handleRestore = async (id: string) => {
        try {
            await restoreProduct(id).unwrap();
            notification.success({
                message: 'Success',
                description: 'Product restored successfully!',
                
            });
            refetch();
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to restore product',
            });
        }

    };

    const dataSource = deletedProducts?.products?.map((product: any) => ({
        key: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,

    })); 
    const handlePermanentDelete = async (id: string) => {
    try {
        await permanentDeleteProduct(id).unwrap();
        notification.success({
            message: 'Success',
            description: 'Product permanently deleted!',
        });
        refetch();
    } catch (error) {
        notification.error({
            message: 'Error',
            description: 'Failed to permanently delete product',
        });
    }
};
   
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: any) =>{
                return( image.map((item : any,index : number ) => {
                    return <img src={item.image} alt="" width={100}/>;
                }))  
              },
          },
          
          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          }, {
            title: 'Action',
            key: 'action',
            render: ({ key: id }: { key: number | string }) => (
                <>
                    <Button onClick={() => handleRestore(id.toString())} disabled={isRestoring}>
                    <SyncOutlined spin   style={{ fontSize: '26px', color: '#08c' }}/>
                    </Button>
                    <Button onClick={() => handlePermanentDelete(id.toString())}  disabled={isDeleting}>
                    <DeleteTwoTone style={{ fontSize: '26px', color: 'red' }} />
                    </Button>
                </>
            ),
        }
    ];

    if (isLoading) return <Spin />;

    return (
        <div>
            <h2 className="text-2xl">Recycle Bin</h2>
            <Table dataSource={dataSource || []} columns={columns} />
        </div>
    );
};

export default RecycleBin;