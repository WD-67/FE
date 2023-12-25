import { IInformation } from '@/interfaces/information';
import { useGetInformationsQuery } from '@/api/information';


const About = () => {
    const { data: informationData } = useGetInformationsQuery();    
    return (
        <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 mt-10">
            <div className="flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12">
                <div className="w-full lg:w-6/12 mt-20">
                    <h2 className="w-full font-bold lg:text-4xl text-3xl lg:leading-10 dark:text-gray-800 leading-9">{informationData?.data[0]?.nameStore}</h2>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-700 mt-6">Giày Sneaker là sự kết hợp hoàn hảo giữa phong cách và thoải mái, phục vụ cho cả nam và nữ. Ở cửa hàng chúng tôi, chúng tôi tự hào cung cấp những đôi giày sneaker chất lượng cao từ các thương hiệu nổi tiếng trên thị trường. Với thiết kế đa dạng và chất lượng tốt, đôi giày sneaker sẽ là người bạn đồng hành hoàn hảo cho các hoạt động hàng ngày và thể thao.</p>
                </div>
                <div className="w-full lg:w-6/12">
                    <img className="lg:block hidden w-full" src="https://cf.shopee.vn/file/7a691fe13b7eb2771b61a0de923ad312" alt="people discussing on board" />
                    <img className="lg:hidden sm:block hidden w-full" src="https://i.ibb.co/16fPqrg/Rectangle-122-2.png" alt="people discussing on board" />
                    <img className="sm:hidden block w-full" src="https://i.ibb.co/Jxhpxh6/Rectangle-122.png" alt="people discussing on board" />
                </div>
            </div>

            <div className="relative mt-24">
                <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                    <div className="z-20 w-12 h-12 bg-gray-800 rounded-full flex justify-center items-center">
                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg1.svg" alt="flag" />
                    </div>

                    <img className="z-20" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg2.svg" alt="note" />

                    <img className="z-20 sm:block hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg3.svg" alt="users" />
                </div>
                <hr className="z-10 absolute top-2/4 w-full bg-gray-200" />
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                <div>
                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 mt-6">Chất liệu</p>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-800 mt-6">Sử dụng các vật liệu như da, vải, và các vật liệu tổng hợp chất lượng cao để tạo ra đôi giày bền, thoáng khí và dễ dàng vệ sinh.</p>
                </div>
                <div>
                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 mt-6">Thiết kế</p>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-800 mt-6">Các đôi giày sneaker có thiết kế đa dạng, từ kiểu dáng thấp đến cao cổ, với các màu sắc và họa tiết phong phú để phù hợp với sở thích cá nhân và phong cách của mỗi người.</p>
                </div>
                <div className="sm:block hidden">
                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 mt-6">Tính năng đặc biệt</p>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-800 mt-6">Đôi giày sneaker được thiết kế với đệm êm, đế giày linh hoạt và công nghệ thoáng khí để mang lại sự thoải mái và hỗ trợ tối đa cho chân.</p>
                </div>
            </div>
            <div className="sm:hidden block relative mt-8">
                <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg3.svg" alt="user" />
                </div>
                <hr className="z-10 absolute top-2/4 w-full bg-gray-200" />
            </div>
            <div className="sm:hidden grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                <div>
                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 dark:text-white mt-6">400k User</p>
                    <p className="font-normal text-base leading-6 text-gray-800 dark:text-gray-200 mt-6">Chất liệu: Sử dụng các vật liệu như da, vải, và các vật liệu tổng hợp chất lượng cao để tạo ra đôi giày bền, thoáng khí và dễ dàng vệ sinh.</p>
                </div>
            </div>

            <div className="flex lg:flex-row flex-col md:gap-14 gap-16 justify-between lg:mt-20 mt-16">
                <div className="w-full lg:w-6/12">
                    <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800">Giá cả và chính sách bán hàng:</h2>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-800 mt-6 w-full lg:w-10/12 xl:w-9/12">Giá cả: Chúng tôi cung cấp giày sneaker với mức giá phù hợp với chất lượng và thương hiệu. Các mức giá được đưa ra phù hợp với nhu cầu và ngân sách của khách hàng.</p>
                    <p className="font-normal text-base leading-6 text-gray-600 dark:text-gray-800 w-full lg:w-10/12 xl:w-9/12 mt-10">Chính sách bán hàng: Chúng tôi cam kết cung cấp dịch vụ chăm sóc khách hàng tốt nhất. Chính sách vận chuyển, đổi/trả hàng và bảo hành được áp dụng để đảm bảo sự hài lòng và tin tưởng của khách hàng.</p>
                </div>
                <div className="w-full lg:w-6/12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 gap-10">
                        <div className="flex p-4 shadow-md">
                            <div className="mr-6">
                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg4.svg" alt="team card" />
                            </div>
                            <div className="">
                                <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800">Địa chỉ cửa hàng</p>
                                <p className="mt-2 font-normal text-base leading-6 text-gray-800 dark:text-gray-800">{informationData?.data[0]?.address}</p>
                            </div>
                        </div>

                        <div className="flex p-4 shadow-md">
                            <div className="mr-6">
                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg5.svg" alt="board card" />
                            </div>
                            <div className="">
                                <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 ">Số điện thoại liên hệ</p>
                                <p className="mt-2 font-normal text-base leading-6 text-gray-800 dark:text-gray-800">{informationData?.data[0]?.phone}</p>
                            </div>
                        </div>

                        <div className="flex p-4 shadow-md">
                            <div className="mr-6">
                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/about-us-3-svg6.svg" alt="press card" />
                            </div>
                            <div className="">
                                <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 ">Email</p>
                                <p className="mt-2 font-normal text-base leading-6 text-gray-800 dark:text-gray-800">{informationData?.data[0]?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default About