import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Radio, Spin } from 'antd';
import { useGetCommentQuery, useRemoveCommentMutation } from "../../../api/comment"
import { Pagination, notification } from 'antd'
import { Switch, Popconfirm, Button } from "antd"
import ImagePriview from '../../Image/ImagePriview'
import { BsFillTrash3Fill } from "react-icons/bs"
import { useGetProductByIdQuery } from "@/api/product";
import { CheckOutlined } from '@ant-design/icons';
const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { data: commentData, refetch } = useGetCommentQuery();
    const { data: product, isLoading } = useGetProductByIdQuery(String(id));
    const [removeComment] = useRemoveCommentMutation()
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const handleSoftDelete = async (id: string) => {
        try {
            await removeComment(id);
            notification.success({
                message: 'Success',
                description: 'Xóa bình luận thành công!',
            });
            refetch();
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Xóa bình luận không thành công',
            });
        }
    };
    if (isLoading) return <div>Loading...</div>;

    return (


        <div className="big-content w-full md:w-4/5 mx-auto">
            {/* name và rating */}
            <div className="name-rating mt-8 md:mt-10">
                <div className="name-product mt-3">
                    <h1 className="title-name uppercase font-medium text-[#282828] text-2xl">
                        {product?.product.name}
                    </h1>
                </div>
            </div>
            {/* Slide và content */}
            <div className="slider-text-content min-w-full  flex flex-col gap-5 mt-8 md:mt-10 md:flex-row justify-between  ">
                {/* slider */}
                <div className="slider w-full md:w-2/5 relative overflow-hidden ">
                    <td className="whitespace-nowrap  text-gray-700 py-4 ">
                        <div className="items-center ">
                            <p className="text-xs lg:text-base md:text-xl flex ">
                                <ImagePriview width={1000} listImage={product?.product.image} />
                            </p>
                        </div>
                    </td>

                    {/* sale */}
                    <div className="prd-sale absolute top-2 left-1 min-w-[75px]">
                        <div className=" py-[2px] bg-pink-600 my-1">
                            <span className=" m-2 block  rounded-full text-center text-sm font-medium text-white">
                                {product?.product.hot_sale} %
                            </span>
                        </div>
                        <div className="prd-sale py-[2px] bg-blue-300">
                            <span className=" m-2 block  rounded-full text-center text-sm font-medium text-white">
                                Mới
                            </span>
                        </div>
                    </div>
                </div>
                {/* content */}
                <div className="text-content flex-1">
                    <div className="info-price flex flex-col md:flex-row gap-5 items-center">
                        <>
                            <h1 className="text-4xl font-normal">{product?.product.price - (product?.product.price * (product?.product.hot_sale / 100))}.vnđ</h1>
                            <div className="price-old">
                                <h2 className="text-lg line-through">{product?.product.price}.vnđ</h2>
                                <p className="text-sm font-medium text-[#fb317d]">
                                    You Save: {product?.product.hot_sale} %
                                </p>
                            </div>
                        </>
                    </div>
                    <div className="info-desc mt-5">
                        <h2 className="text-lg font-medium">Thông tin sản phẩm</h2>
                        <p className="break-words mt-3 text-base text-[#282828]">
                            {product?.product.description}

                        </p>
                    </div>
                    <hr className="bg-gray-300 h-1 mx-auto my-20" />
                    <div className="options">
                     {/*name color*/}
                     {selectedColor && (
    <div className="quantity-remain flex items-center gap-10 mt-5">
        <ul className="flex flex-row items-start gap-2">
            <h2 className="text-lg font-medium">Tên màu :</h2>
            <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full">{selectedColor.nameColor}</div>
            </li>
        </ul>
    </div>
)}
            {/* color */}
            <div className="quantity-remain flex items-center gap-10 mt-5">
            <ul className="flex flex-row items-start gap-2">
    <h2 className="text-lg font-medium">Màu :</h2>
    {product?.product.listQuantityRemain
        .filter((v, i, a) => a.findIndex(t => (t.colorHex === v.colorHex)) === i)
        .map((item: any, index: number) => (
            <li key={index} className="flex items-center justify-center gap-2" onClick={() => setSelectedColor(selectedColor === item ? null : item)}>
                <div style={{ backgroundColor: item.colorHex ,}} className="w-7 h-7 rounded-full flex items-center justify-center">
                    {selectedColor === item && <CheckOutlined />}
                </div>
            </li>
        ))
    }
</ul>
</div>
                        
                          {/* size */}
                          <div className="quantity-remain flex items-center gap-10 mt-5">
    <ul className="flex flex-row items-start gap-2">
        <h2 className="text-lg font-medium">Size :</h2>
        {product?.product.listQuantityRemain.filter(item => !selectedColor || item.colorHex === selectedColor.colorHex).map((item: any, index: number) => (
            <li key={index} className="flex items-center gap-2" onClick={() => setSelectedSize(selectedSize === item ? null : item)}>
<div className="w-7 h-7 border border-gray-500 flex items-center justify-center">{item.nameSize}</div>                {selectedSize === item && <CheckOutlined />}
            </li>
        ))}
    </ul>
</div>
                            {selectedColor && selectedSize && (
    <div className="quantity-remain flex items-center gap-10 mt-5">
        <ul className="flex flex-col items-start gap-2">
            <h2 className="text-lg font-medium">Số lượng :</h2>
            <li className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full">{selectedSize.quantity}</div>
            </li>
        </ul>
    </div>
)}

                        {/* quantity by size */}
                        {/* <div className="quantity-remain flex items-center gap-10 mt-5">
                            <ul className="flex flex-col items-start gap-2">
                                <h2 className="text-lg font-medium">Số lượng theo size :</h2>
                                {product?.product.listQuantityRemain.map((item: any, index: number) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-full">{item.quantity}</div>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                 
                        {/* action-button số lượng yêu thích */}
                    </div>

                </div>
            </div>
            {commentData?.length ? (
                commentData.map((comment, index) => (
                    (comment.productId === id) && (
                        <div key={index} className="user-image mt-5">
                            <div className="comment-container flex">
                                <div className="comment-text-user relative p-3 rounded-lg min-h-[70px] mt-2 ml-8 flex-grow">
                                    <span className="font-semibold text-base pb-5">{comment.fullname}</span>
                                    <p className="text-sm text-gray-800">{comment.content}</p>
                                </div>
                                <div className="trash-icon-container ml-auto">
                                    <Popconfirm
                                        placement="topRight"
                                        title={`Xóa bình luận "${comment.content}"?`}
                                        onConfirm={() => handleSoftDelete(comment._id as string)}
                                        okText="Yes"
                                        cancelText="No"
                                        okButtonProps={{ style: { background: "red" } }}
                                    >
                                        <Button>
                                            <BsFillTrash3Fill />
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>

                    )
                ))
            ) : (
                <div>
                    <td className="text-sm text-gray-800" colSpan={2}>Chưa có bình luận nào được thêm</td>
                </div>
            )}
        </div >



    );
};

export default ProductDetail;