import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../../../api/product';
import { useGetCategorysQuery } from '../../../api/category';
import { useGetUserQuery } from '../../../api/user';
import { IProduct } from '../../../interfaces/product';
import { IUser } from '../../../interfaces/user';
import { Chart, Interval, Axis, Tooltip, Legend } from 'bizcharts';
import { Link } from 'react-router-dom';
import { useGetTintucQuery } from '@/api/tintuc';
import { useGetContactsQuery } from '@/api/contact';
import {
  useGetAllOrdersQuery,
} from "../../../api/order";
import { ISOrder } from '@/interfaces/orders';
import { DatePicker } from 'antd';
import { Select } from 'antd';
const { Option } = Select;

const { RangePicker } = DatePicker;
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
  const { data: orderClient } = useGetAllOrdersQuery();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTintuc, setTotalTintuc] = useState<number>(0);
  const [totalCanceledOrders, setTotalCanceledOrders] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [dateRange, setDateRange] = useState([null, null]);
  const [weeklyRevenue, setWeeklyRevenue] = useState({});
  const [monthlyYearlyRevenue, setMonthlyYearlyRevenue] = useState({});
  const [weeklyRevenueData, setWeeklyRevenueData] = useState([]);
  const [monthlyRevenueData, setMonthlyRevenueData] = useState([]);
  const [yearlyRevenueData, setYearlyRevenueData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('weekly');

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
  let dataSource = [];
  dataSource = orderClient?.data.map((order: ISOrder) => ({
    code: order._id._id,
    name: order?.user?.name,
    status: order.status,
    address: order.address,
    product: order.products,
    moneny: order.total_price,
  }));
  const calculateTotalRevenueByDateRange = (orders, dateRange) => {
    let total = 0;
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const isWithinRange =
        (!dateRange[0] || orderDate >= dateRange[0]) &&
        (!dateRange[1] || orderDate <= dateRange[1]);

      if (isWithinRange && order.status === 'done') {
        total += order.total_price;
      }
    });

    return { total };
  };
  const calculateTotalRevenueByTime = (orders) => {
    const result = {
      weekly: {},
      monthly: {},
      yearly: {},
    };

    orders.forEach((order) => {
      if (order.status === 'done') {
        const orderDate = new Date(order.createdAt);

        // Tính tổng doanh thu hàng tuần
        const weekNumber = getWeekNumber(orderDate);
        result.weekly[weekNumber] = (result.weekly[weekNumber] || 0) + order.total_price;

        // Tính tổng doanh thu hàng tháng
        const monthYearKey = `${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
        result.monthly[monthYearKey] = (result.monthly[monthYearKey] || 0) + order.total_price;

        // Tính tổng doanh thu hàng năm
        const yearKey = orderDate.getFullYear();
        result.yearly[yearKey] = (result.yearly[yearKey] || 0) + order.total_price;
      }
    });

    return result;
  };

  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  };
  const { data: orderClientData } = useGetAllOrdersQuery();
  const orders = orderClientData?.data || [];
  useEffect(() => {
    const { total } = calculateTotalRevenueByDateRange(orders, dateRange);
    setTotalRevenue(total);
  }, [dateRange, orders]);
  useEffect(() => {
    const { weekly, monthly, yearly } = calculateTotalRevenueByTime(orders);
    setWeeklyRevenue(weekly);
    setMonthlyYearlyRevenue({
      weekly: { ...weekly },
      monthly: { ...monthly },
      yearly: { ...yearly },
    });
  }, [orders]);
  const onChangeSearchOrderDate = (dates) => {
    setDateRange(dates);
  };

  useEffect(() => {
    const weeklyRevenueArray = Object.entries(weeklyRevenue).map(([week, revenue]) => ({
      week: `Tuần ${week}`,
      revenue,
    }));
    setWeeklyRevenueData(weeklyRevenueArray);
  }, [weeklyRevenue]);

  useEffect(() => {
    if (monthlyYearlyRevenue?.monthly) {
      const monthlyRevenueArray = Object.entries(monthlyYearlyRevenue.monthly).map(([monthYear, revenue]) => ({
        monthYear: `Tháng ${monthYear}`,
        revenue,
      }));
      setMonthlyRevenueData(monthlyRevenueArray);
    }
  }, [monthlyYearlyRevenue]);
  useEffect(() => {
    if (monthlyYearlyRevenue?.yearly) {
      const yearlyRevenueArray = Object.entries(monthlyYearlyRevenue.yearly).map(([year, revenue]) => ({
        year: `Năm ${year}`,
        revenue,
      }));
      setYearlyRevenueData(yearlyRevenueArray);
    }
  }, [monthlyYearlyRevenue]);









  const calculateTotalCanceledOrders = () => {
    const canceledOrders = dataSource?.filter(
      (order) => order.status === "cancel"
    );
    setTotalCanceledOrders(canceledOrders?.length || 0);
  };
  useEffect(() => {
    calculateTotalCanceledOrders();
  }, [dataSource]);


  const calculateTotalOrders = () => {
    const canceledOrders = dataSource?.filter(
      (order) => order.status === "pending"
    );
    setTotalOrders(canceledOrders?.length || 0);
  };
  useEffect(() => {
    calculateTotalOrders();
  }, [dataSource]);

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
              {<div className='text-5xl text-white font-semibold pb-[22px]'>{totalOrders}</div>}
              <div className='text-white font-medium text-2xl mb-9'>Đơn Hàng Chưa Xử Lý</div>
            </div>

          </div>
          <div className='bg-rose-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
            <div className='block px-6'>
              {<div className='text-5xl text-white font-semibold pb-[22px]'>{totalCanceledOrders}</div>}
              <div className='text-white font-medium text-2xl mb-9'>Đơn Hàng Đã Hủy</div>
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
      <div >
        <section className="bg-white">
          <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Thống Kê Doanh Thu Cửa Hàng</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20 mx-15">
              <div>
                <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">Thống kê doanh thu theo </label>
                <RangePicker className="my-5" value={dateRange} onChange={onChangeSearchOrderDate} />

                <dt className="order-last text-lg font-medium text-gray-500">Tổng Doanh Thu</dt>
                <dd className="text-4xl font-extrabold text-blue-600 md:text-3xl">{new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalRevenue)}</dd>
              </div>
              <div>
                <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">Thống kê doanh thu theo </label>
                <div className="mt-8">
                  <Select
                    defaultValue="weekly"
                    style={{ width: 120, marginRight: 16 }}
                    onChange={(value) => setSelectedTimeRange(value)}
                  >
                    <Option value="weekly">Tuần</Option>
                    <Option value="monthly">Tháng</Option>
                    <Option value="yearly">Năm</Option>
                  </Select>
                </div>
                {selectedTimeRange === 'weekly' && (
                  <div className="mt-8">
                    <Chart height={300} data={weeklyRevenueData} autoFit>
                      <Axis name="week" title={{ text: 'Tuần' }} />
                      <Axis name="revenue" title={{ text: 'Doanh thu' }} />
                      <Tooltip
                        shared
                       
                      />
                      <Interval position="week*revenue" color="week" />
                      <Legend visible={false} />
                    </Chart>
                  </div>
                )}
                {selectedTimeRange === 'monthly' && (
                  <div className="mt-8">
                    <Chart height={300} data={monthlyRevenueData} autoFit>
                      <Axis name="monthYear" title={{ text: 'Tháng' }} />
                      <Axis name="revenue" title={{ text: 'Doanh thu' }} />
                      <Tooltip
                        shared

                      />
                      <Interval position="monthYear*revenue" color="monthYear" />
                      <Legend visible={false} />
                    </Chart>
                  </div>
                )}
                {selectedTimeRange === 'yearly' && (
                  <div className="mt-8">
                    <Chart height={300} data={yearlyRevenueData} autoFit>
                      <Axis name="year" title={{ text: 'Năm' }} />
                      <Axis name="revenue" title={{ text: 'Doanh thu' }} />
                      <Tooltip
                        shared
                      
                      />
                      <Interval position="year*revenue" color="year" />
                      <Legend visible={false} />
                    </Chart>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

  );
};

export default HomeAdmin;


