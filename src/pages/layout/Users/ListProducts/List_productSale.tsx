import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Item from '../../../../components/item/item';
import { useGetProductsQuery } from '@/api/product';
import { IProduct } from '@/interfaces/product';
import { useGetCategorysQuery } from '../../../../api/category';

const ListProductSale = () => {
    const { data: productData } = useGetProductsQuery();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Điều chỉnh số lượng slide hiển thị
        slidesToScroll: 1,
        autoplay: true,        // Tự động chạy slider
        autoplaySpeed: 3000,    // Đặt thời gian chờ giữa các slide (tính bằng mili giây)
        arrows: false,         // Ẩn thanh lên xuống trái phải
    };
    //filter 
    const [dataSourceToRender, setDataSourceToRender] = useState<IProduct[]>([]);
    const [searchResult, setSearchResult] = useState<IProduct[]>([]);
    useEffect(() => {
        if (productData) {
            const updatedDataSource = productData?.products.map(({ ...IProduct }) => ({
                ...IProduct,
            }));
            setDataSourceToRender(updatedDataSource);
            setSearchResult(updatedDataSource);
        }
    }, [productData]);
    // console.log(productData);
  return (
    
    <div className="content-banner p-3 rounded-lg my-10 ">
        <div className="list-new-products hot-sale-scroll p-8 overflow-x-auto  ">
            <Slider {...settings}>
                {productData?.products.filter((product) => product.hot_sale > 0).map((product: IProduct, index: any) => (
                    <div key={index}>
                        <Item product={product} />
                    </div>
                ))}

            </Slider>
        </div>
    </div>

  );
};

export default ListProductSale;
