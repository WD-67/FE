import { UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
// import { Button, Navbar, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Header = () => {
    const navList = (
        <ul className="pl-0 mt-2 space-x-5 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Link
                to="/"
                className=" text-[#8f0d9e] font-bold text-sm flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
            >
                Trang Chủ
            </Link>
            <Link
                to="/"
                className="text-[#484848] hover:text-[#8f0d9e] hover:font-bold text-sm flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
            >
                Giày sneaker
            </Link>
            <Link
                to="/"
                className="text-[#484848] hover:text-[#8f0d9e] hover:font-bold text-sm flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
            >
                Nam
            </Link>
            <Link
                to="/"
                className="text-[#484848] hover:text-[#8f0d9e] hover:font-bold text-sm flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
            >
                Nữ
            </Link>
            <Link
                to="#"
                className="text-[#484848] hover:text-[#8f0d9e] hover:font-bold text-sm flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
            >
                Mua hàng
            </Link>
            <Link
                to="/"
                className="text-[#484848] hover:text-[#8f0d9e] hover:font-bold text-sm flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
            >
                Mã giảm giá
            </Link>
            <Link
                to="/contact"
                className="text-[#484848] hover:text-[#8f0d9e] hover:font-bold text-sm flex no-underline items-center hover:translate-x-3 lg:hover:translate-x-0 hover:transition-all transition-all"
            >
                Liên Hệ
            </Link>
        </ul>
    );

    return (
        <>
            <div id="header" className="bg-black">
                <div className="sticky box-border top-0 z-10 h-max max-w-full rounded-none px-4 py-1 container ">
                    <div className="flex items-center justify-between text-blue-gray-900">
                        <Link to="/" className=" flex items-center">
                            <img
                                className="w-16 h-16 object-cover"
                                src="https://cdn.printgo.vn/uploads/media/774255/logo-giay-1_1586510617.jpg"
                                alt=""
                            />
                        </Link>

                        <div className="flex-1 flex justify-center">
                            <div className="w-[500px] relative">
                                <Input placeholder="Bạn muốn tìm kiếm sản phẩm gì ?" className="border-[#5b4f4f] h-9 rounded-3xl" />

                                <span className="absolute top-1/2 right-3 -translate-y-1/2">
                                    <i className="text-xl bx bx-search"></i>
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="mx-4 space-x-4">
                                <button className="w-9 h-9 rounded-full bg-[#bfbfbf74] text-white text-xl hover:opacity-80">
                                    <i className="bx bxs-bell"></i>
                                </button>
                                <button className="relative w-9 h-9 rounded-full bg-[#bfbfbf74] text-white text-xl  hover:opacity-80">
                                    <i className="mt-1 bx bxs-cart-alt"></i>

                                    <span className="absolute -top-1 bg-red-700 text-sm text-white w-5 h-5 rounded-full ">6</span>
                                </button>
                            </div>
                            <div className="flex items-center gap-x-1">
                                <Button className="hidden lg:inline-block border-none">
                                    <UserOutlined />
                                </Button>
                                <Link to="/login" className="flex items-center  no-underline shadow-none">
                                    <Button className="text-white hidden lg:inline-block bg-green-800 border-none">Đăng Ký / Đăng nhập</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center h-10 border-b-[#1010101a] border-b-[1px] " style={{ borderBottomStyle: "solid" }}>
                {navList}
            </div>
        </>
    );
};
export default Header;
