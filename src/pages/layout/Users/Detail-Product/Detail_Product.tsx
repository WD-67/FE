import "./Detail_Products.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { FcConferenceCall } from "react-icons/fc";
import Comment from "../../../../components/admin/comment/Comment";
import { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "@/api/product";
import ImagePriview from "../../../../components/Image/ImagePriview";

import axios from "axios";
import { useCreateCartMutation } from "@/api/cart";
import { toast } from "react-toastify";

const Detail_Product = () => {
  const { id } = useParams<{ id: string }>(); // Get the product id from the URL parameters
  const { data: product, isLoading } = useGetProductByIdQuery(String(id));
  const [color, setcolor] = useState([]);
  const [size, setSize] = useState([]);
  const navigate = useNavigate();
  const [colorSelected, setColorSelected] = useState(() =>
    color.length > 0 ? color.at(0).color : undefined
  );
  const [sizeSelected, setSizeSelected] = useState(() =>
    size.length > 0 ? size.at(0).name : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [handleAddToCart, { isLoading: isAddToCardLoading }] =
    useCreateCartMutation();
  useEffect(() => {
    axios.get("http://localhost:8080/api/products/" + id).then((response) => {
      console.log({
        logTeste: response.data.product.colorSizes,
      });
      setcolor(response.data.product.colorSizes);
      setColorSelected(response.data.product.colorSizes.at(0).color);
      setSizeSelected(response.data.product.colorSizes.at(0).size.at(0).name);
    });
  }, []);

  useEffect(() => {
    if (color.length > 0) {
      setDataForSize(color.at(0)._id);
    }
  }, [color]);

  function setDataForSize(color_id: string) {
    console.log("FIrst load");
    for (let i = 0; i < color.length; i++) {
      if (color[i]._id == color_id) {
        setSize(color[i].size);
      }
    }
  }

  const handleAddProductToCart = async () => {
    toast.success("đã thêm sản phẩm vào giỏ hàng");
    const userString = localStorage.getItem("user");
    const userObject = JSON.parse(userString);
    const userId = userObject?._id;

    // khong chay neu khong co gia tri
    if (!sizeSelected || !colorSelected) return;

    handleAddToCart({
      items: [
        {
          size: [sizeSelected],
          color: [colorSelected],
          image: product?.product?.image,
          quantity: quantity,
          productId: id,
          checkOrder: false,
        },
      ],
      userId,
    });
    setTimeout(() => {
      navigate("/cart");
    }, 500);
  };

  console.log({
    colorSelected,
    sizeSelected,
  });
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="w-screen min-h-[300px] mt-10">
        <div className="big-content w-full px-2 md:w-4/5  mx-auto">
          {/* menu */}
          <div className="breadcrumbs">
            <ul className="flex items-center gap-2">
              <Link to={"/"}>
                <li className="underline underline-offset-4 hover:text-[#17c6aa] ">
                  Home
                </li>
              </Link>
              <li className="underline underline-offset-4 hover:text-[#17c6aa] "></li>
              <li>/ {product?.categoryId}</li>
              <li>/ {product?.name}</li>
            </ul>
          </div>
          {/* name và rating */}
          <div className="name-rating mt-8 md:mt-10">
            <div className="name-product mt-3">
              <h1 className="title-name uppercase font-medium text-[#282828] text-2xl">
                {product?.name}
              </h1>
            </div>
          </div>
          {/* Slide và content */}

          <div className="slider-text-content min-w-full  flex flex-col gap-5 mt-8 md:mt-10 md:flex-row justify-between  ">
            {/* slider */}
            <div className="slider w-full md:w-2/5 relative overflow-hidden ">
              <ImagePriview width={80} listImage={product?.product.image} />

              {/* sale */}
              <div className="prd-sale absolute top-2 left-1 min-w-[75px]">
                <div className=" py-[2px] bg-pink-600 my-1">
                  <span className=" m-2 block  rounded-full text-center text-sm font-medium text-white">
                    {product?.product.sale}
                  </span>
                </div>
                <div className="prd-sale py-[2px] bg-blue-300">
                  <span className=" m-2 block  rounded-full text-center text-sm font-medium text-white">
                    NEW
                  </span>
                </div>
              </div>
            </div>
            {/* content */}
            <div className="text-content flex-1">
              <div className="info-price flex flex-col md:flex-row gap-5 items-center">
                <>
                  <h1 className="text-3xl font-normal">
                    {product?.product.price}.vnđ
                  </h1>
                  <div className="price-old">
                    <h2 className="text-lg line-through">
                      {product?.product.price}.vnđ
                    </h2>
                    <p className="text-sm font-medium text-[#fb317d]">
                      You Save: %
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
                      <select
                        name="color"
                        id="color"
                        onChange={(e) => {
                          setDataForSize(e.target.value);

                          const colorFound = color.find(
                            (c) => c._id === e.target.value
                          );

                          setColorSelected(colorFound.color);
                        }}
                      >
                        {color.map((colorSize) => (
                          <option key={colorSize._id} value={colorSize._id}>
                            {colorSize.color}
                          </option>
                        ))}
                      </select>
                    </li>
                  </ul>
                </div>
                {/* size */}
                <div className="size flex items-center gap-10 mt-5">
                  <h2 className="text-lg font-medium">Size:</h2>
                  <ul className="flex items-center gap-2">
                    <select
                      name="size"
                      id="size"
                      onChange={(e) => {
                        const sizeFound = size.find(
                          (c) => c._id === e.target.value
                        );

                        setSizeSelected(sizeFound.name);
                      }}
                    >
                      {size.map((sizeObj) => (
                        <option key={sizeObj._id} value={sizeObj._id}>
                          {sizeObj.name}
                        </option>
                      ))}
                    </select>
                    <li className="rounded-md cursor-pointer  py-1 ">
                      <span className="active-bg-size hover:bg-black px-1 py-2 hover:text-white  rounded-md">
                        Size
                      </span>
                    </li>
                  </ul>
                </div>
                {/* quantity by size */}
                <div className="size flex items-center gap-10 mt-5">
                  <ul className="flex items-center gap-2">
                    <div className="quantity flex items-center gap-5">
                      <h2 className="text-lg font-medium">Số Lượng:</h2>
                      <div className="input-number flex items-center  border-2 ">
                        <button
                          className="btn-minus flex w-full px-2"
                          onClick={() => {
                            if (quantity === 1) return;

                            setQuantity((prev) => prev - 1);
                          }}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="w-12 text-center border-x-2"
                          value={quantity}
                        />
                        <button
                          className="btn-plus px-2"
                          onClick={() => {
                            setQuantity((prev) => prev + 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </ul>
                </div>
                {/* action-button số lượng yêu thích */}
                <div className="action-addtocart mt-5">
                  {/* button */}
                  <div className="button flex items-center gap-4 mt-5">
                    <button
                      onClick={handleAddProductToCart}
                      className="btn-addtocart flex-1 bg-[#17c6aa] text-white hover:bg-black py-4 rounded-md"
                    >
                      Thêm Vào Giỏ Hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* mô tả và support */}
          <div className="desc-support">
            <div className="info-support flex flex-col gap-10 md:flex-row justify-between items-center bg-gray-100 py-2 px-1 mt-8 md:mt-20">
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
              <h1 className="underline underline-offset-8 text-xl font-semibold my-10">
                Chính Sách Mua Hàng
              </h1>
              <div className="desc flex flex-col-reverse md:flex-row items-start gap-5">
                <p className="mb-5 w-2/3 text-base leading-7 ">
                  ✨Hàng trong kho toàn bộ là hàng có sẵn. Các bạn đặt hàng chọn
                  theo phân loại hàng mình mua là được nhé<br></br>
                  ⚜️GIAO HÀNG TOÀN QUỐC SIÊU NHANH<br></br>
                  ⚜️Thanh toán khi nhận hàng<br></br>
                  🔸Cam kết giá cả cạnh tranh, mẫu mã đa dạng<br></br>
                  🔸Bao chất - bao giá - bao đổi trả nếu hàng kém chất lượng
                  <br></br>✅ Nói không với hàng chợ, hàng kém chất lượng
                  <br></br>✅ Đổi trả hàng không mất phí nếu hàng không giống
                  ảnh trong vòng 3 ngày.
                </p>
              </div>
            </div>
          </div>
          {/* Đánh giá */}
          {/* <div className="rating-user">
                        <h1 className="my-5 text-xl font-medium">Đánh giá và Nhận xét </h1>
                        <div className="shadow-rating-user  min-h-[200px] w-full rounded-lg p-5 ">
                            <div className="content-rating min-h-[200px]  border-2 border-gray-300 rounded-2xl flex items-center">
                                <div className="rating-big border-r-2 p-2 text-center w-1/3 ">
                                    <p> Đánh giá và nhận xét</p>
                                </div>
                                <div className="rating-big-item w-full">


                                </div>
                            </div>
                            button đánh giá
                            <div className="button-rating-and-commnet mt-5 w-full mx-auto flex justify-center items-center ">
                                <button className="btn-rating-and-commnet text-base bg-[#17c6aa] text-white hover:bg-black py-2 px-20 rounded-xl">
                                    Đánh giá ngay
                                </button>
                            </div>
                            user-rating và đánh giá
                            <div className="user-rating-evaluate ">
                                <div className="user-rating-evaluate-item mt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="user-rating-evaluate-item-img w-8 h-8">

                                        </div>
                                        <span className="font-semibold text-base">Đỗ Thành Long</span>
                                    </div>

                                    <div className="user-rating-evaluate-item-content ml-10">

                                        <div className="rating-star bg-blue-gray-50 p-2 rounded-lg">
                                            <div className="flex items-center h-8 ">
                                                <span className="font-semibold text-sm">Đánh giá: </span>
                                                <i className="flex items-center ">  tỷ56tyr4e</i>
                                            </div>
                                            <div className="flex items-center">
                                                <span className=" font-semibold text-sm">Nhận xét: </span>
                                                <p className="flex items-center text-xs">Sản phẩm rất là ok</p>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>


                          
                        </div>



                    </div> */}
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
        </div>
      </div>
    </>
  );
};

export default Detail_Product;
