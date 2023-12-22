import React from 'react'

const BannerCaption = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat  "
      style={{
        backgroundImage: "url('https://images.summitmedia-digital.com/spotph/images/2023/05/25/sunika-manila-store-1685000504.jpg')",
        backgroundPosition: " top",
        backgroundSize: "auto",
      }}
    >
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-96 lg:items-center lg:px-48 lg:justify-end  w-screen">
        <div className="max-w-5xl text-center">
          <div className="text-4xl font-bold leading-6 text-gray-800 text-red-400">
          SneakerStore Đường Tới Đam Mê
          </div>
          <div className="mt-5 mb-5 text-sm leading-6 text-gray-600">
          Đi Để Đẹp
          </div>
          <button className="text-center mt-8 bg-teal-500 w-36 h-12 rounded-md animate-bounce">
            <p className="text-white font-bold text-sm">Mua Ngay</p>
          </button>
        </div>
      </div>
    </div>
  );
};


export default BannerCaption