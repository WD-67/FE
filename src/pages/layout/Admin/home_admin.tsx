import React from 'react'
import { Link } from 'react-router-dom'

type Props = object

const HomeAdmin = (props: Props) => {
    return (
        <section>
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                    <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                        <div className="max-w-md mx-auto text-center lg:text-left">
                            <header>
                                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl ">Giới Thiệu</h2>

                                <p className="mt-4 text-gray-500">
                                Chào mừng bạn đến với trang web bán giày thời trang - nơi bạn có thể khám phá những mẫu giày mới nhất và có những sự lựa chọn phù hợp với cá tính của riêng bạn. Chúng tôi tự hào là điểm đến tin cậy của các tín đồ thời trang giày dép, mang đến cho bạn những sản phẩm chất lượng cao, kiểu dáng đa dạng và sự phục vụ tận tình.
                                </p>
                            </header>
                            <Link to={'/'}
                                className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-gray-900 border border-gray-900 rounded hover:shadow focus:outline-none focus:ring"
                            >
                                Shop All
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
        </section>


    )
}

export default HomeAdmin