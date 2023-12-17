import React from 'react';
import Slider from 'react-slick';
import { useGetInformationsQuery } from '../../../api/information';
import { IInformation } from '../../../interfaces/information';
const BannerHome = () => {
  const { data: informationData } = useGetInformationsQuery();
  const images = [
    'https://img.vietcetera.com/wp-content/uploads/2020/03/fe.jpg',
    'https://www.craftlabs.sg/wp-content/uploads/2023/05/sneaker-banner-1-1.jpg',
    'https://static.sneakerjagers.com/news/nl/2021/11/LandingPage_Banners_Sneaker-1440x416-1-1024x296.jpg',
  ];

  return (
 
    <div className="relative overflow-hidden bg-white">
      {informationData?.data?.map((information: IInformation) => (
    <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <div className="sm:max-w-lg">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {information.nameStore}
          </h1>
          <p className="mt-4 text-xl text-gray-500">
          Sneaker không chỉ là một đôi giày, mà là hành trang đưa chúng ta đến những nơi chưa từng đặt chân
          </p>
        </div>
        <div>
          <div className="mt-10">
            {/* Decorative image grid */}
            <div
              aria-hidden="true"
              className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxj2py42ueRcVB59a_oOu7J9oEnadKf8Bhjw&usqp=CAU"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY4cCD4_hHbWlX7hY39qTsejuG-znS-4XL-A&usqp=CAU"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwsHxRaPGr0o6-qtF0z1Li32TydiNpceB3Uw&usqp=CAU"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtUNw1428hFGbm5S21qcwxnQ3inSq02wnMLQ&usqp=CAU"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-4PCi0W7-E-AW6wlDV39NEeBVMvvJvo1vkQ&usqp=CAU"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHLvQUGI6KuATPjOJw2IbxWLrtlThT1ee-NMN-TsGerPWb7J1N-b-uNXACTaJyqf7vgQ&usqp=CAU"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe7AiFTl0t55wv_0i2QefiPGp0Ub-ahnBKNg&usqp=CAU"
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="http://localhost:5173/list-productsAll"
              className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
            >
             Khám Phá Ngay
            </a>
          </div>
        </div>
      </div>
    </div>
    ))}
  </div>
  );
};

export default BannerHome;