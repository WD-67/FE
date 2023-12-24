import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Item from '../../../../components/item/item';
import { IoIosArrowDropdown } from 'react-icons/io';
import { Tooltip } from 'antd';
import { BsSortDown, BsSortDownAlt } from 'react-icons/bs';
import { MdOutlineDiscount } from 'react-icons/md';
import { RiTShirtLine } from 'react-icons/ri';
import { PiStarThin } from 'react-icons/pi';
import { AiOutlineEye } from 'react-icons/ai';
import Loading from '../../../../components/action/Loading/Loading';
import Comment from '@/components/admin/comment/Comment';
import { useGetProductsQuery } from '@/api/product';
import { IProduct } from '@/interfaces/product';
import { useGetCategorysQuery } from '../../../../api/category';
import { ICategory } from '../../../../interfaces/category';
const Shop_Products = () => {
    const { data: productData } = useGetProductsQuery();
    const { data: categoryData } = useGetCategorysQuery();
    const [sortBy, setSortBy] = useState('asc');
    const handleSortBy = (type: 'asc' | 'desc') => {
        setSortBy(type);
    };
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

    let filteredData = dataSourceToRender


    // const onHandleClick = ({ target: { value } }: any) => {
    //     console.log(value);
    //     // console.log("Initial dataSourceToRender:", dataSourceToRender);

    //     if (Array.isArray(filteredData)) {
    //         filteredData = filteredData.filter(
    //             (itemm) => String(itemm.categoryId) === String(value)
    //         );
    //         // console.log("Filtered data:", filteredData);
    //         if (filteredData.length > 0) {
    //             setDataSourceToRender(filteredData);
    //         } else {
    //             setDataSourceToRender([...searchResult]);
    //         }
    //     };
    // } 
    const [selectedBrand, setSelectedBrand] = useState(""); // Thêm state để theo dõi danh mục được chọn

    const onHandleClick = (event) => {
        const value = event.target.value;

        // Kiểm tra nếu giá trị là danh mục, thì cập nhật state và thực hiện lọc
        if (value && value !== selectedBrand) {
            setSelectedBrand(value);

            // Lọc sản phẩm theo danh mục được chọn
            const filteredProducts = searchResult.filter(
                (product) => String(product.categoryId) === String(value)
            );

            setDataSourceToRender(filteredProducts);
        } else {
            // Nếu giá trị là rỗng hoặc đã được chọn trước đó, hiển thị tất cả sản phẩm
            setSelectedBrand("");
            setDataSourceToRender([...searchResult]);
        }
    };

    return (
        <>
            <div className="box-container"
            >       <div className="box-content mt-10">
                    <div className="big-content w-full px-2 md:w-11/12  mx-auto">
                        {/* menu */}
                        <div className="breadcrumbs">
                            <ul className="flex items-center gap-2">
                                <Link to={"/"}>
                                    <li className="underline underline-offset-4 hover:text-[#17c6aa] ">
                                        Trang Chủ
                                    </li>
                                </Link>
                                <li>/</li>
                                <li className=" hover:text-[#17c6aa] ">
                                    Sản phẩm
                                </li>
                            </ul>
                        </div>
                        {/* products-sale*/}
                        <div className="banner-products-new">
                            <div className="content-banner bg-gradient-to-t from-white to-teal-500 p-4 rounded-lg my-10 ">
                                <h1 className="text-new-products uppercase text-4xl font-black text-white">Hot Sale</h1>
                                <div className="list-new-products hot-sale-scroll p-8 overflow-x-auto  ">
                                    <Slider {...settings}>
                                        {productData?.products.filter((product) => product.hot_sale > 10).map((product: IProduct, index: any) => (
                                            <div key={index}>
                                                <Item product={product} />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                        {/* list */}

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                            <div className="  rounded-2xl bg-gray-100  h-screen flex-col justify-between border-e">
                                <div className="px-4 py-10 "><p className="px-4 font-mono text-xl " >
                                    Lọc sản phẩm theo
                                </p>
                                    <ul className="mt-6 space-y-1 text-left">

                                        <li className="mt-6 "  >
                                            <div className={`btn-sort-option border cursor-pointer flex items-center gap-1 px-3 py-2 rounded-lg`}>
                                                <button className="font-light text-sm" >Size</button>
                                                <i><IoIosArrowDropdown /></i>
                                            </div>
                                        </li>
                                        <li className="pt-2 " >
                                            <div className={`btn-sort-option cursor-pointer flex items-center gap-1  px-3 py-2 rounded-lg border `}>
                                                <button className="font-light text-sm">Color</button>
                                                <i><IoIosArrowDropdown /></i>
                                            </div>
                                        </li>
                                        <li className="pt-2 ">
                                            <div className={`btn-sort-option border cursor-pointer flex items-center gap-1 px-3 py-2 rounded-lg`} onClick={() => handleSortBy('asc')}>
                                                <i className="text-lg"><BsSortDown /></i>
                                                <button className="text-xs">Giá sản phẩm giảm dần</button>
                                            </div>
                                        </li>
                                        <li className="pt-2 ">
                                            <div className={`btn-sort-option border cursor-pointer flex items-center gap-1 px-3 py-2 rounded-lg`} onClick={() => handleSortBy('desc')}>
                                                <i className="text-lg"><BsSortDownAlt /></i>
                                                <button className="text-xs">Giá sản phẩm tăng dần</button>
                                            </div>
                                        </li>
                                        <li className="pt-2 ">
                                            <div className={`btn-sort-option border cursor-pointer flex items-center gap-1 px-3 py-2 rounded-lg`}>
                                                <i className="text-lg"><RiTShirtLine /></i>
                                                <button className="text-xs">Sản Phẩm Mới</button>
                                            </div>
                                        </li>
                                        <li className="pt-2 ">
                                            <div className={`btn-sort-option border cursor-pointer flex items-center gap-1 px-3 py-2 rounded-lg`}>
                                                <select style={{ width: '200%' }}
                                                    onChange={onHandleClick}
                                                    className="form-select-product appearance-none py-2 pl-3 pr-5 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition btn-sort-option cursor-pointer flex items-center "
                                                >
                                                    <option value="" selected disabled>
                                                        Thương hiệu
                                                    </option>
                                                    {categoryData?.data?.map((category: ICategory) => (
                                                        <option key={category.id} value={category.name}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>

                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pt-4 rounded-lg  lg:col-span-2">
                                <div className=" mt-15">
                                    <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                        {dataSourceToRender
                                            .slice()
                                            .sort((a, b) => (sortBy === 'asc' ? a.price - b.price : b.price - a.price))
                                            .sort((a, b) => (sortBy === 'asc' ? b.price - a.price : a.price - b.price))
                                            ?.map((product) => {
                                                const cateName = categoryData?.data.find(
                                                    (cate: any) => cate._id == product.categoryId
                                                )?.name;
                                                return (
                                                    <div key={product._id}>
                                                        <Item product={product} />
                                                    </div>
                                                )
                                            })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Shop_Products