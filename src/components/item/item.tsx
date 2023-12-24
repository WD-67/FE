// Item.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiTwotoneHeart } from "react-icons/ai";
import ImagePriview from '../Image/ImagePriview';
import { useGetColorsQuery } from "@/api/color";
import { IColor } from "@/interfaces/color";
import { IProduct } from "../../interfaces/product";
import { useGetProductsQuery } from "@/api/product";

type Props = {
  buttonAdd?: string;
  product?: IProduct;
  icon?: string;
  infoProduct?: boolean;
};

const Item = ({ buttonAdd, product, icon, infoProduct = true }: Props) => {
  const { data: color } = useGetColorsQuery();

  const [imageHover, setImage] = useState(product?.image[0]);
  const handleClickThumbnail = (image: string) => {
    setImage(image);
  };
  const hasDiscount = product?.hot_sale > 0;
  return (
    <>
      <div className="w-full md:w-64 m-auto content  rounded-2xl overflow-hidden hover:border">
        <div className="w-full">
          <div className="w-full relative overflow-hidden ">
            <td className="whitespace-nowrap text-gray-700">
              <div className="items-center h-70">
                <ImagePriview width={70} listImage={product?.image} />
              </div>
            </td>
            <div className="prd-sale absolute top-2 left-1 min-w-[60px]">
            {hasDiscount && (
              <div className="py-[2px] mb-1 bg-pink-600 rounded-xl">
                <span className="m-1 block rounded-full text-center text-sm font-medium text-white">
                SALE     {product?.hot_sale} %
                </span>
                
              </div>
              )}

              <div className="py-[2px] bg-[#33c7fd] rounded-xl">
                <span className="m-1 block rounded-full text-center text-sm font-medium text-white">
                  Mới
                </span>
              </div>
            </div>
            <div className="prd-circle-labels absolute flex flex-col top-1 right-1">
              <span className="eye bg-white flex justify-center items-center rounded-full shadow-md mt-2 cursor-pointer">
                <i className="icon-eye text-2xl p-1">
                  <span>
                    <AiFillEye />
                  </span>
                </i>
              </span>
              <span className="eye bg-white flex justify-center items-center rounded-full shadow-md mt-2 cursor-pointer">
                <i className="icon-eye text-2xl p-1">
                  <span>
                    <AiTwotoneHeart />
                  </span>
                </i>
              </span>
            </div>
          </div>
          <div className="prd-tag ">
            <div className="prd-info">
              <div className="prd-info-wrap bg-white">
                <div className="prd-rating text-center pt-5 cursor-pointer"></div>
                <div className="text-center mt-1 cursor-pointer">
                  <span className="text-[#9e9e9e] font-normal text-sm">
                    SneakerStore
                  </span>
                </div>
                <h2 className="prd-title text-center mt-1 cursor-pointer min-h-[50px] flex items-center justify-center">
                  <span className="text-[#282828] font-medium text-base hover:text-[#17c6aa] ">
                    <Link to={`/products/${product?._id}`}>
                      {product?.name}
                    </Link>
                  </span>
                </h2>
                <h2 className="price flex justify-center gap-5 text-center mt-1 cursor-pointer">
                  <div className="flex gap-2">
                    <span className="text-[#110606] text-xs line-through">
                      {product?.price}.vnđ
                    </span>
                    <span className="text-[#d34949] text-xl font-semibold">
                      {product?.price}.vnđ
                    </span>
                  </div>
                </h2>
                <div className="mt-1 prd-action text-center btn-add">
                  <form action="#">
                    <Link to={`/products/${product?._id}`}>
                      <button className="btn js-prd-addtocart text-white bg-[#17c6aa] hover:bg-[#1b1a1a] rounded-sm px-4 py-2 font-semibold ">
                        Chi tiết sản phẩm
                      </button>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
