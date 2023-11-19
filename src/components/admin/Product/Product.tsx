import  { useState } from 'react';
import { Button, Table, Spin, notification } from 'antd';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { useGetProductsQuery, useRemoveProductMutation } from '../../../api/product';
import { IProduct } from '../../../interfaces/product';
import { Link } from 'react-router-dom';
import { ICategory } from '@/interfaces/category';
import ImagePriview from '../../Image/ImagePriview';

type Props = {
    products: IProduct[];
};

const Product = (props: Props) => {
    const { data: productData ,refetch} = useGetProductsQuery();
    const [softDeleteProduct] = useRemoveProductMutation();
    const [loading, setLoading] = useState(false);
    const handleSoftDelete = async (id: string) => {
        setLoading(true);
        try {
            await softDeleteProduct(id);
            notification.success({
                message: 'Success',
                description: 'Product soft deleted successfully!',
            });
            refetch();
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to soft delete product',
            });
        }finally {
            setLoading(false);
        }
    }; 
    const dataSource = productData?.products?.map((product: any) => ({
        key: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        trang_thai: product.trang_thai,


    }));
    console.log(dataSource);
    



const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record: { key: number | string }) => (
        <Link to={`${record.key}`}>{name}</Link>
    ),
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render:(image: Array<string>) => {
        return (
            <td className="whitespace-nowrap  text-gray-700 py-4 ">
            <div className="items-center ">
                <p className="text-xs lg:text-base md:text-xl flex ">
                   <ImagePriview width={20} listImage={image} />
                </p>
            </div>
        </td>
            
        );
    }
         
      ,
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
  },
  {
    title: 'Status',
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
                    <Link to={`/admin/product/update/${id}`}><EditOutlined /></Link>
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
            <h2 className="text-2xl">Quản lý sản phẩm</h2>
            <Button type="primary" danger>
                <Link to="/admin/product/add">Thêm sản phẩm</Link>
            </Button>
        </header>
        {loading ? <Spin /> : <Table dataSource={dataSource} columns={columns} />}
    </div>
);
              
}

export default Product;