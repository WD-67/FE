import { Link } from "react-router-dom"
import Loading from '../../../../components/action/Loading/Loading'
import { useGetTintucQuery } from '@/api/tintuc'
import ImagePriview from '../../../../components/Image/ImagePriview'
const Blog = () => {
    const { data: tintucData, error, isLoading } = useGetTintucQuery();
    return (<>
        {isLoading ? (
            <Loading />
        ) : error ? (
            "Error"
        ) : (
            <section>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                        <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                            <div className="max-w-md mx-auto text-center lg:text-left">
                                <header>
                                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl ">Giới Thiệu</h2>

                                    <p className="mt-4 text-gray-500">
                                        Chào mừng bạn đến với trang web bán Sneaker thời trang - nơi bạn có thể khám phá những mẫu sneaker mới nhất và tìm những đôi giày phù hợp với cá tính của riêng bạn. Chúng tôi tự hào là điểm đến tin cậy của các tín đồ thời trang, mang đến cho bạn những sản phẩm chất lượng cao, kiểu dáng đa dạng và sự phục vụ tận tình.
                                    </p>
                                </header>
                                <Link to={'/list-productsAll'}
                                    className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-900 border border-gray-900 rounded hover:shadow focus:outline-none focus:ring"
                                >
                                    Mua Ngay
                                </Link>
                            </div>
                        </div>

                        <div className="lg:col-span-2 lg:py-8">
                            <ul className="grid grid-cols-2 gap-4">
                                <li>
                                    <a href="" className="block group">
                                        <img
                                            src="https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=600"
                                            alt=""
                                            className="object-cover w-full rounded aspect-square"
                                        />

                                        <div className="mt-3">
                                            <h3
                                                className="font-medium text-gray-900 group-hover:underline-offset-4"
                                            >
                                                Sản Phẩm Đa Dạng
                                            </h3>

                                        </div>
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="block group">
                                        <img
                                            src="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600"
                                            alt=""
                                            className="object-cover w-full rounded aspect-square"
                                        />

                                        <div className="mt-3">
                                            <h3
                                                className="font-medium text-gray-900 group-hover:underline-offset-4"
                                            >
                                                Chất Lượng Uy Tín
                                            </h3>

                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                    <header>
                        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                            Thông Tin
                        </h2>
                        <p className="max-w-md mt-4 text-gray-500">
                            Trang web của chúng tôi cung cấp một bộ sưu tập đa dạng và phong phú về Sneaker thời trang cho cả nam và nữ. Bạn có thể dễ dàng tìm thấy những đôiSneaker từ những thương hiệu nổi tiếng đến những thiết kế độc quyền của chúng tôi.
                        </p>
                    </header>
                    <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                        {tintucData?.length ? (
                            tintucData.map((tintuc, index) => (
                                <li key={index}>
                                    <ImagePriview width={100} listImage={tintuc.image} />
                                    <Link to={`/blog/${tintuc._id}`} >
                                        <h2 className="text-base text-gray-700 sm:text-xl font-mono my-5">{tintuc.tieude}</h2>
                                        <div className="text-red-500 underline">
                                            Xem thêm
                                        </div>

                                    </Link>
                                </li>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2}>No tintuc found.</td>
                            </tr>
                        )}


                    </ul>
                    <header className="mt-10">
                        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                            Xu hướng thời trang mới nhất
                        </h2>
                        <p className="max-w-md mt-4 text-gray-500">
                            Chúng tôi luôn cập nhật xu hướng thời trang mới nhất để bạn có thể luôn tự tin và nổi bật trong mọi bữa tiệc hay hoạt động hàng ngày. Trang web của chúng tôi giúp bạn dễ dàng tìm hiểu về những xu hướng đang thịnh hành và cách kết hợp trang phục để tạo nên phong cách riêng độc đáo.
                        </p>
                        <img
                            src="https://pos.nvncdn.com/f4d87e-8901/art/20230722_99fWPZKJ.jpeg"
                            alt=""
                            className=" mt-10 w-full h-[200px] sm:h-[300px] object-cover transition duration-500 group-hover:scale-105"
                        />
                    </header>
                </div>


            </section>
        )}
    </>



    )
}

export default Blog