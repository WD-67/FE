import  { useState } from 'react';
import { Button, Table, Spin, notification,Input } from 'antd';
import { DeleteTwoTone, EditOutlined } from '@ant-design/icons';
import { useGetProductsQuery, useRemoveProductMutation } from '../../../api/product';
import { IProduct } from '../../../interfaces/product';
import { Link } from 'react-router-dom';
import { ICategory } from '@/interfaces/category';
import ImagePriview from '../../Image/ImagePriview';
import { Modal } from 'antd';
import AddProduct from './AddProduct';
type Props = {
    products: IProduct[];
};

const Product = (props: Props) => {
    const { data: productData ,refetch} = useGetProductsQuery();
    console.log(productData);
    
    const [softDeleteProduct] = useRemoveProductMutation();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const handleSoftDelete = (id: string) => {
        Modal.confirm({
            title: 'Bạn có muốn xóa sản phẩm này?',
            content: 'Hành động này không thể hoàn tác.',
            onOk: async () => {
                setLoading(true);
                try {
                    await softDeleteProduct(id);
                    notification.success({
                        message: 'Thành công',
                        description: 'Sản phẩm đã được xóa mềm thành công!',
                    });
                    refetch();
                } catch (error) {
                    notification.error({
                        message: 'Lỗi',
                        description: 'Không thể xóa mềm sản phẩm',
                    });
                } finally {
                    setLoading(false);
                }
            },
        });
    };
    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
        refetch();
    };

    const handleOk = () => {
        setIsModalVisible(false);
        refetch();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const dataSource = productData?.products?.filter((product: IProduct) => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product: any) => ({
        key: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        categoryId: product.categoryId,
        listQuantityRemain : 
        product.listQuantityRemain.map((item: any) => ({
            colorHex: item.colorHex,
            nameColor: item.nameColor,
            nameSize: item.nameSize,
            quantity: item.quantity,
        })),
        // inventoryStatus: product.inventoryStatus,
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
    title: 'Danh mục',
    dataIndex: 'categoryId',
    key: 'categoryId',
  },
  {
    title: "colorHex",
    dataIndex: "listQuantityRemain",
    key: "listQuantityRemain",
    render: (listQuantityRemain: Array<any>) => {
        return (
            <td className="whitespace-nowrap text-gray-700 py-4">
                <div className="items-center">
                    <div className="flex flex-col gap-2">
                        {listQuantityRemain.map((item: any) => (
                            <p className="text-xs lg:text-base md:text-xl">{item.colorHex}</p>
                        ))}
                    </div>
                </div>
            </td>
        );
    }
  },
  {
    title: 'Màu',
    dataIndex: 'listQuantityRemain',
    key: 'listQuantityRemain',
    render: (listQuantityRemain: Array<any>) => {
        return (
            <td className="whitespace-nowrap text-gray-700 py-4">
                <div className="items-center">
                    <div className="flex flex-col gap-2">
                        {listQuantityRemain.map((item: any) => (
                            <p className="text-xs lg:text-base md:text-xl">{item.nameColor}</p>
                        ))}
                    </div>
                </div>
            </td>
        );
    }
},
{
    title: 'size',
    dataIndex: 'listQuantityRemain',
    key: 'listQuantityRemain',
    render: (listQuantityRemain: Array<any>) => {
        return (
            <td className="whitespace-nowrap text-gray-700 py-4">
                <div className="items-center">
                    <div className="flex flex-col gap-2">
                        {listQuantityRemain.map((item: any) => (
                            <p className="text-xs lg:text-base md:text-xl">{item.nameSize}</p>
                        ))}
                    </div>
                </div>
            </td>
        );
    }
},
{
    title: 'Số lượng',
    dataIndex: 'listQuantityRemain',
    key: 'listQuantityRemain',
    render: (listQuantityRemain: Array<any>) => {
        return (
            <td className="whitespace-nowrap text-gray-700 py-4">
                <div className="items-center">
                    <div className="flex flex-col gap-2">
                        {listQuantityRemain.map((item: any) => (
                            <p className="text-xs lg:text-base md:text-xl">{item.quantity}</p>
                        ))}
                    </div>
                </div>
            </td>
        );
    }
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
        <Input.Search
            placeholder="Search product"
            onSearch={handleSearch}
            style={{width: 600}}
        />
       <Button type="default" onClick={showModal}>
                Thêm sản phẩm
            </Button>
            <Modal destroyOnClose title="Thêm sản phẩm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  width="40%">
                <AddProduct setIsModalVisible={setIsModalVisible} />
            </Modal>
    </header>
    {loading ? <Spin /> : <Table dataSource={dataSource} columns={columns} />}
</div>
);
              
}

export default Product;