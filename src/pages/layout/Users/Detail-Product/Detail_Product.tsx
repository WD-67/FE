import "./Detail_Products.css";
import { ImageList, ImageListItem, Rating } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Carousel, IconButton } from "@material-tailwind/react";
import { TbTruckDelivery } from "react-icons/tb";
import { FcConferenceCall } from "react-icons/fc";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import Icon from "../../../../components/Icon/icon";
import Comment from "../../../../components/admin/comment/Comment";
import { Image as AntdImage, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "@/api/product";
import ImagePriview from '../../../../components/Image/ImagePriview';
const Detail_Product = () => {
    const { id } = useParams<{ id: string }>();
    const { data: product, isLoading } = useGetProductByIdQuery(String(id));
    if (isLoading) return <div>Loading...</div>;
    return (
        <>

            <div className="w-screen min-h-[300px] mt-10">
                <div className="big-content w-full px-2 md:w-4/5 mx-auto">
                    {/* menu */}
                    <div className="breadcrumbs">
                        <ul className="flex items-center gap-2">
                            <Link to={'/'}>
                                <li className="underline underline-offset-4 hover:text-[#17c6aa] ">Trang Chủ</li>
                            </Link>
                            <li className="underline underline-offset-4 hover:text-[#17c6aa] "></li>
                            <li>/ {product?.product.categoryId}</li>
                            <li>/ {product?.product.name}</li>
                        </ul>
                    </div>
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
                                        {product?.product.sale} %
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
                                    <h1 className="text-4xl font-normal">{product?.product.price - (product?.product.price * (product?.product.sale / 100))}.vnđ</h1>
                                    <div className="price-old">
                                        <h2 className="text-lg line-through">{product?.product.price}.vnđ</h2>
                                        <p className="text-sm font-medium text-[#fb317d]">
                                            You Save: {product?.product.sale} %
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
                            {/* Status */}
                            {/* Options */}
                            <div className="options">
                                {/* color */}
                                <div className="color flex items-center gap-10">
                                    <h2 className="text-lg font-medium">Màu Sắc:</h2>
                                    <ul className=" grid grid-cols-3 md:flex items-center gap-5">
                                        <li>
                                            <select name="color" id="color">
                                                {product?.product.colorSizes.map((colorSize) =>
                                                    <option key={colorSize._id} value={colorSize.color}>{colorSize.color}</option>
                                                )}
                                            </select>
                                        </li>
                                    </ul>
                                </div>
                                {/* size */}
                                <div className="size flex items-center gap-10 mt-5">
                                    <h2 className="text-lg font-medium">Size:</h2>
                                    <ul className="flex items-center gap-2">
                                        <select name="size" id="size">
                                            {product?.product.colorSizes.map((colorSize) =>
                                                colorSize.sizes.map((sizeObj) =>
                                                    <option key={sizeObj._id} value={sizeObj.size}>{sizeObj.size}</option>
                                                )
                                            )}
                                        </select>
                                    </ul>
                                </div>
                                {/* quantity by size */}
                                <div className="size flex items-center gap-10 mt-5">

                                    <ul className="flex items-center gap-2">

                                        <div className="quantity flex items-center gap-5">
                                            <h2 className="text-lg font-medium">Số Lượng:</h2>
                                            <div className="input-number flex items-center  border-2 ">
                                                <button className="btn-minus flex w-full px-2">-</button>
                                                <input
                                                    type="text"
                                                    className="w-12 text-center border-x-2" defaultValue={product?.product.quantity} />
                                                <button className="btn-plus px-2">+</button>
                                            </div>

                                        </div>

                                    </ul>
                                </div>
                                {/* action-button số lượng yêu thích */}
                                <div className="action-addtocart mt-5">
                                    {/* button */}
                                    <div className="button flex items-center gap-4 mt-5">
                                        <button className="btn-addtocart flex-1 bg-[#17c6aa] text-white hover:bg-black py-4 rounded-md">
                                            Thêm Vào Giỏ Hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* mô tả và support */}
                    <div className="desc-support">
                        <div className="info-support flex flex-col gap-10 md:flex-row justify-between items-center bg-white  py-2 px-1 mt-8 md:mt-20">
                            <div className="item flex items-center ">
                                <i className="text-4xl">
                                    <FcConferenceCall />
                                </i>
                                <span>Hỗ trợ :24/7</span>
                            </div>
                            <div className="item">
                                <span>Mua hàng trực tuyến tiện lợi nhanh gọn</span>
                            </div>
                            <div className="item flex items-center">
                                <i className="text-4xl">
                                    <TbTruckDelivery />
                                </i>
                                <span>Miễn phí vận chuyển </span>
                            </div>
                        </div>
                        {/* Mô tả */}
                        <div className="info-desc mt-8 md:mt-20">
                            <h1 className="underline underline-offset-8 text-xl font-semibold my-10">
                                Chính Sách Mua Hàng
                            </h1>
                            <div className="desc flex flex-col-reverse md:flex-row items-start gap-5">
                                <p className="mb-5 w-2/3 text-base leading-7 ">
                                    ✨Hàng trong kho toàn bộ là hàng có sẵn. Các bạn đặt hàng chọn theo phân loại hàng mình mua là được nhé<br></br>
                                    ⚜️GIAO HÀNG TOÀN QUỐC SIÊU NHANH<br></br>
                                    ⚜️Thanh toán khi nhận hàng<br></br>
                                    🔸Cam kết giá cả cạnh tranh, mẫu mã đa dạng<br></br>
                                    🔸Bao chất - bao giá - bao đổi trả nếu hàng kém chất lượng<br></br>
                                    ✅ Nói không với hàng chợ, hàng kém chất lượng<br></br>
                                    ✅ Đổi trả hàng không mất phí nếu hàng không giống ảnh trong vòng 3 ngày.
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Coment user */}
                    <div className="comment">
                        <Comment />
                    </div>
                    {/* Sản phẩm cùng loại */}
                    <div className="prd-cate mt-8 md:mt-10">
                        <h1 className="text-center text-3xl font-medium my-5">
                            Sản Phẩm Cùng Loại
                        </h1>
                        {/* <Item /> */}
                    </div>
                </div >
            </div >


        </>
    );
};

export default Detail_Product;
