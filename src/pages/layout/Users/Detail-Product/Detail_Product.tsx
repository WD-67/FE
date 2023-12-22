import { useGetProductByIdQuery } from "@/api/product";
import { FcConferenceCall } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import ImagePriview from "../../../../components/Image/ImagePriview";
import Comment from "../../../../components/admin/comment/Comment";
import "./Detail_Products.css";
import { useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { addProductToCart } from "@/store/cart/cart.slice";
import { toast } from "react-toastify";
import { Button, Radio } from "antd";

const Detail_Product = () => {
    const [quantity, setQuantity] = useState<number>(1);
    const { id } = useParams<{ id: string }>(); // Get the product id from the URL parameters
    const { data: product, isLoading } = useGetProductByIdQuery(String(id));
    const dispatch = useAppDispatch();

    const handleCountDowQuantity = () => {
        if (quantity <= 1) return;
        setQuantity(quantity - 1);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Tôi k biết mấy bạn lam size màu kiểu gì, lên fix tạm mấy bạn vô sửa đoạn đây
    const handleAddProductToCart = () => {
        if (!product?.product) return;
        const _product = product.product;
        const infoCart = {
            _id: _product._id,
            quantity,
            product: {
                _id: _product._id,
                name: _product.name,
                image: _product.image,
                price: _product.price,
            },
            // Note
            color: "red",
            size: "M",
        };

        dispatch(addProductToCart(infoCart as any));
        toast.success("Thêm sản phẩm vào giỏ hàng thành công");
        // addProductToCart()
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <>
            <div className="w-screen min-h-[300px] mt-10">
                <div className="big-content w-full px-2 md:w-4/5 mx-auto">
                    {/* menu */}
                    <div className="breadcrumbs">
                        <ul className="flex items-center gap-2">
                            <Link to={"/"}>
                                <li className="underline underline-offset-4 hover:text-[#17c6aa] ">Home</li>
                            </Link>
                            <li className="underline underline-offset-4 hover:text-[#17c6aa] "></li>
                            <li>/ {product?.product.categoryId}</li>
                            <li>/ {product?.product.name}</li>
                        </ul>
                    </div>
                    {/* Slide và content */}

                    <div className="slider-text-content min-w-full  flex flex-col gap-7 mt-8 md:mt-10 md:flex-row justify-between  ">
                        {/* slider */}
                        <div className="slider w-full md:w-2/5 relative overflow-hidden ">
                            <ImagePriview width={140} listImage={product?.product.image} />
                            {/* sale */}
                            <div className="prd-sale absolute top-2 left-1 min-w-[75px]">
                                {product?.product.hot_sale > 10 && (
                                    <div className=" py-[2px] bg-pink-600 my-1">
                                        <span className=" m-2 block  rounded-full text-center text-sm font-medium text-white">
                                            {product?.product.hot_sale} sale
                                        </span>
                                    </div>
                                )}
                                <div className="prd-sale py-[2px] bg-blue-300">
                                    <span className=" m-2 block  rounded-full text-center text-sm font-medium text-white">NEW</span>
                                </div>
                            </div>
                        </div>
                        {/* content */}

                        <div className="text-content flex-1 flex flex-col md:flex-row ml-20 md:mt-[-15%]  ">
                            <div className=" pr-5">
                                <h1 className="title-name uppercase font-mono text-[#282828] text-2xl">{product?.product.name}</h1>
                                <p className="text-xs my-2">Mã sản phẩm :{product?.product._id}</p>
                                <div className="info-price flex flex-col gap-5 items-start mt-4 md:mt-10">
                                    <div className="flex items-center gap-5">
                                        {/* Giá gốc */}
                                        <h1 className="text-3xl  font-bold  ">{product?.product.price}.vnđ</h1>
                                        {/* Giá sale */}
                                        {product?.product.hot_sale && (
                                            <div className="price-old">
                                                <h1 className="text-xl  font-bold line-through">{product?.product.price}.vnđ</h1>
                                                <p className="text-sm font-medium text-[#fb317d">You Save:</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="options">
                                        {/* Màu sắc */}
                                        <div className="color flex items-center gap-10">
                                            <h1 className="text-base font-bold">Màu Sắc:</h1>
                                            <div className="flex items-center space-x-3">
                                                {/* Đây là một ví dụ về cách thêm màu sắc sử dụng các phần tử và lớp */}
                                                <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400">
                                                    <input type="radio" name="color-choice" value="red" className="sr-only" />
                                                    <span className="sr-only">Red</span>
                                                    <button className=" mx-1 h-8 w-8 rounded-full border border-black border-opacity-10 bg-red-500"></button>
                                                    <button className=" mx-1 h-8 w-8 rounded-full border border-black border-opacity-10 bg-pink-500"></button>
                                                </label>
                                                {/* Thêm các ô màu sắc khác tương tự ở đây */}
                                            </div>
                                        </div>

                                        {/* Kích cỡ */}
                                        <div className="size flex items-center gap-10 mt-5">
                                            <h1 className="text-base font-bold">Kích Cỡ:</h1>
                                            <div className="flex items-center space-x-3">
                                                {/* Hiển thị danh sách các kích cỡ từ dữ liệu */}
                                                <div className="border-2 rounded-md">
                                                    <button className="border-2  p-2 rounded-md hover:bg-gray-200" >
                                                        37
                                                    </button>
                                                </div>
                                                <div className="border-2 rounded-md">
                                                    <button className="border-2  p-2 rounded-md hover:bg-gray-200" >
                                                        38
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="options">
                                    {/* Quantity Input */}
                                    <div className="size flex items-center gap-10 mt-5">
                                        <h2 className="text-lg font-medium">Số Lượng:</h2>
                                        <div className="input-number flex items-center border-2 rounded-xl">
                                            <button className="btn-minus flex w-full px-2 " onClick={handleCountDowQuantity}>-</button>
                                            <input value={quantity} type="text" className="w-12 text-center border-x-2" />
                                            <button className="btn-plus px-2" onClick={handleIncreaseQuantity}>+</button>
                                        </div>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <div className="action-addtocart mt-5">
                                        <div className="button flex items-center gap-4 mt-5">
                                            <button
                                                onClick={handleAddProductToCart}
                                                className="btn-addtocart flex-1 bg-[#17c6aa] text-white hover:bg-black py-4 rounded-md"
                                            >
                                                Thêm Vào Giỏ Hàng
                                            </button>
                                        </div>
                                    </div>
                                    <hr className="bg-gray-300 h-1 mx-auto my-6 md:my-10" />
                                    <div className="info-desc mt-5">
                                        <h2 className="text-lg font-medium">Thông tin sản phẩm</h2>
                                        <p className="break-words mt-3 text-base text-[#282828]">{product?.product.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                    {/* mô tả và support */}
                    < div className="desc-support" >
                        <div className="info-support flex flex-col gap-10 md:flex-row justify-between items-center bg-white  py-2 px-1 mt-8 md:mt-20">
                            <div className="item flex items-center ">
                                <i className="text-4xl">
                                    <FcConferenceCall />
                                </i>
                                <span>24/7 Support</span>
                            </div>
                            <div className="item">
                                <span>Use promocode FOXIC to get 15% discount!t</span>
                            </div>
                            <div className="item flex items-center">
                                <i className="text-4xl">
                                    <TbTruckDelivery />
                                </i>
                                <span>Fast Shipping</span>
                            </div>
                        </div>
                        {/* Mô tả */}
                        <div className="info-desc mt-8 md:mt-20">
                            <h1 className="underline underline-offset-8 text-xl font-semibold my-10">Chính Sách Mua Hàng</h1>
                            <div className="desc flex flex-col-reverse md:flex-row items-start gap-5">
                                <p className="mb-5 w-2/3 text-base leading-7 ">
                                    ✨Hàng trong kho toàn bộ là hàng có sẵn. Các bạn đặt hàng chọn theo phân loại hàng mình mua là được nhé<br></br>
                                    ⚜️GIAO HÀNG TOÀN QUỐC SIÊU NHANH<br></br>
                                    ⚜️Thanh toán khi nhận hàng<br></br>
                                    🔸Cam kết giá cả cạnh tranh, mẫu mã đa dạng<br></br>
                                    🔸Bao chất - bao giá - bao đổi trả nếu hàng kém chất lượng<br></br>✅ Nói không với hàng chợ, hàng kém chất lượng
                                    <br></br>✅ Đổi trả hàng không mất phí nếu hàng không giống ảnh trong vòng 3 ngày.
                                </p>
                            </div>
                        </div>
                    </div >
                    {/* Coment user */}
                    <div className="comment">
                        <Comment />
                    </div>
                    {/* Sản phẩm cùng loại */}
                    <div className="prd-cate mt-8 md:mt-10">
                        <h1 className="text-center text-3xl font-medium my-5">Sản Phẩm Cùng Loại</h1>
                        {/* <Item /> */}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Detail_Product;
