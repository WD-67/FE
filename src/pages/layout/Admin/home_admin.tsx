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

  return (
    <div>
      <div className='text-4xl pb-10'>Tổng quan</div>
      <div className='grid grid-cols-3'>


        <Link to="product">
          <div className='bg-yellow-500 rounded-lg pt-4 mb-6 block  w-[300px] h-[150px]'>
          <div className='block  px-6'>
            {<div className='text-5xl text-white font-semibold pb-[22px]'>{totalProducts}</div>}
            <div className='text-white font-medium text-2xl mb-6'>Sản Phẩm</div>
          </div>
        </div>
        </Link>
        <Link to="category">
        <div className='bg-green-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
          <div className='block px-6'>
            {<div className='text-5xl text-white font-semibold pb-[22px]'>{totalCategories}</div>}
            <div className='text-white font-medium text-2xl mb-9'>Danh Mục Sản Phẩm</div>
          </div>

        </div>
        </Link>
        <Link to="tintuc">
        <div className='bg-orange-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
          <div className='block px-6'>
            {<div className='text-5xl text-white font-semibold pb-[22px]'>   {totalTintuc}  </div>}
            <div className='text-white font-medium text-2xl mb-9'>Tin Tức</div>
          </div>

        </div>
        </Link>
      </div>
      <Link to="contact">
      <div className='grid grid-cols-3 mt-10'>
        <div className='bg-purple-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
          <div className='block px-6'>
            {<div className='text-5xl text-white font-semibold pb-[22px]'> {totalContacts}</div>}
            <div className='text-white font-medium text-2xl mb-9'>Danh Sách Liên Hệ</div>
          </div>

        </div>

        <div className='bg-rose-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
          <div className='block px-6'>
            {<div className='text-5xl text-white font-semibold pb-[22px]'></div>}
            <div className='text-white font-medium text-2xl mb-9'>Đơn Hàng Chưa Xử Lý</div>
          </div>

        </div>



      </div>
      </Link>
      <div className="mt-8">
        <Chart height={300} data={data} autoFit>
          <Axis name="Chức vụ" title />
          <Tooltip shared />
          <Interval position="role*count" color="role" adjust={['dodge']} />

        </Chart>
      </div>
    </div>
  );
};

export default HomeAdmin;


