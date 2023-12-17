import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../../api/product';
import { useGetCategorysQuery } from '../../../api/category';
import { useGetUserQuery } from '../../../api/user';
import { IProduct } from '../../../interfaces/product';
import { IUser } from '../../../interfaces/user';
import { Chart, Interval, Tooltip, Axis, Legend } from 'bizcharts';
import { Link } from 'react-router-dom';
import { useGetTintucQuery } from '@/api/tintuc';
import { useGetContactsQuery } from '@/api/contact';
import { AiFillPhone ,AiOutlineDesktop} from "react-icons/ai";
type Props = {
  products: IProduct[];
};

const HomeAdmin = (props: Props) => {
  const { data: productData, refetch: refetchProducts } = useGetProductsQuery();
  const { data: tintucData, refetch: refetchTintuc } = useGetTintucQuery();
  const { data: contactData, refetch: refetchContact } = useGetContactsQuery();
  const { data: categoryData, error, isLoading, refetch: refetchCategories, } = useGetCategorysQuery();
  const { data: userData, refetch: refetchUser } = useGetUserQuery();
  const [userCount, setUserCount] = useState<number>(0);
  const [adminCount, setAdminCount] = useState<number>(0);
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [managerCount, setManagerCount] = useState<number>(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const totalProducts = productData?.products ? productData.products.length : 0;
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalTintuc, setTotalTintuc] = useState<number>(0);
  useEffect(() => {
    if (tintucData) {
      setTotalTintuc(tintucData.length);
    }
  }, [tintucData]);
  // const [totalContact, setTotalContact] = useState<number>(0);
  // useEffect(() => {
  //   if (contactData) {
  //     setTotalContact(contactData.length);
  //   }
  // }, [contactData]);
  const totalContacts = contactData?.data?.length || 0;
  useEffect(() => {
    if (categoryData) {
      setTotalCategories(categoryData.data.length);
    }
  }, [categoryData]);
  useEffect(() => {
    if (userData?.users) {
      const userCountWithRole = userData.users.filter(
        (user: IUser) => user.role.role_name === 'user'
      ).length;
      setUserCount(userCountWithRole);

      const adminCountWithRole = userData.users.filter(
        (user: IUser) => user.role.role_name === 'admin'
      ).length;
      setAdminCount(adminCountWithRole);

      const employeeCountWithRole = userData.users.filter(
        (user: IUser) => user.role.role_name === 'nhân viên'
      ).length;
      setEmployeeCount(employeeCountWithRole);

      const managerCountWithRole = userData.users.filter(
        (user: IUser) => user.role.role_name === 'quản lý'
      ).length;
      setManagerCount(managerCountWithRole);
    }
  }, [userData]);

  const data = [
    { role: 'User', count: userCount },
    { role: 'Admin', count: adminCount },
    { role: 'Nhân Viên', count: employeeCount },
    { role: 'Quản lý', count: managerCount },
  ];
  const handleResetTotalSales = () => {
    setTotalSales(0);
  };

  const handleCalculateTotalSales = () => {
    // Tính toán tổng số tiền từ các nguồn dữ liệu khác nhau và cập nhật state
    const calculatedTotalSales = 86; // Thay bằng công thức tính tổng số tiền
    setTotalSales(calculatedTotalSales);
  };
  return (
    <section className="bg-white">
      <h2 className="text-lg	font-bold">Thống kê</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        {/* Bên trái */}
        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100">
            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">Sản Phẩm</dt>
              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{totalProducts}</dd>
            </div>

            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">Danh mục</dt>
              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{totalCategories}</dd>
            </div>

            <div className="flex flex-col px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">Đã Bán</dt>
              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">86</dd>
            </div>
            <div className="flex flex-col px-4 py-8 text-center">
              <button
                className="text-blue-600 hover:underline"
                onClick={handleCalculateTotalSales}
              >
                Tính tổng số tiền
              </button>
              <button
                className="text-red-600 hover:underline ml-4"
                onClick={handleResetTotalSales}
              >
                Reset
              </button>
            </div>
            <div className="flex flex-col px-4 py-8 text-center">
              <Link title="Cart" className="" to={"tintuc"}>
                <i className="relative">
                  <AiOutlineDesktop className="heart-icon text-black text-3xl" />Tin Tức
                  <div className="quatity-producst  -top-2 ml-6 absolute">
                    <span className="bg-red-500 text-white rounded-full text-xs px-1 py-[2px]">
                      {totalTintuc}+
                    </span>
                  </div>
                </i>
              </Link>
            </div>
            <div className="flex flex-col px-4 py-8 text-center">
              <Link title="Cart" className="" to={"contact"}>
                <i className="relative">
                  <AiFillPhone  className="heart-icon text-black text-3xl" />Liên hệ
                  <div className="quatity-producst  -top-2 ml-6 absolute">
                    <span className="bg-red-500 text-white rounded-full text-xs px-1 py-[2px]">
                      {totalContacts}+
                    </span>
                  </div>
                </i>
              </Link>
            </div>

          </dl>
        </div>
        {/* Bên phải */}
        <div className="mt-8">
          <Chart height={300} data={data} autoFit>
            <Axis name="Chức vụ" title />
            <Tooltip shared />
            <Interval position="role*count" color="role" adjust={['dodge']} />
            {/* <Legend position="top-center" /> */}
          </Chart>
        </div>
      </div>
    </section>
  );
};

export default HomeAdmin;


