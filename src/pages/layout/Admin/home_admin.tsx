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
import { DatePicker, Button } from 'antd';
import { Select } from 'antd';
import {
  SyncOutlined,
} from '@ant-design/icons';
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
  const [totalSuccessfulOrders, setTotalSuccessfulOrders] = useState(0);
  const [totalCancelledRevenue, setTotalCancelledRevenue] = useState(0);
  const [totalCancelledOrders, setTotalCancelledOrders] = useState(0);
  const [quarterlyRevenueData, setQuarterlyRevenueData] = useState([]);
  const [dailyRevenueData, setDailyRevenueData] = useState([]);
  const [dailyOrderData, setDailyOrderData] = useState([]);

  const [weeklyOrderData, setWeeklyOrderData] = useState([]);
  const [monthlyOrderData, setMonthlyOrderData] = useState([]);
  const [yearlyOrderData, setYearlyOrderData] = useState([]);
  const [selectedTimeRangee, setSelectedTimeRangee] = useState('Ngày');
  const [totalOrderss, settotalOrderss] = useState(0);


  const [totalNewCustomers, setTotalNewCustomers] = useState(0);

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
    name: order.user?.name,
    status: order.status,
    address: order.address,
    product: order.products,
    moneny: order.total_price,
  }));
  const calculateTotalRevenueByDateRange = (orders, dateRange) => {
    let total = 0;
    let totalSuccessfulOrders = 0;
    let totalCancelledOrders = 0;
    let totalOrderss = 0;
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const isWithinRange =
        (!dateRange[0] || orderDate >= dateRange[0]) &&
        (!dateRange[1] || orderDate <= dateRange[1]);

      if (isWithinRange && order.status === 'done') {
        total += order.total_price;
        totalOrderss += 1;
      }
      if (isWithinRange) {
        totalSuccessfulOrders += 1;
      }
      if (isWithinRange && order.status === 'cancel') {
        totalCancelledOrders += 1;
      }
    });

    return { total, totalSuccessfulOrders, totalCancelledOrders, totalOrderss };
  };
  const calculateTotalRevenueByTime = (orders) => {
    const result = {
      weekly: {},
      monthly: {},
      yearly: {},
      quarterly: {},
      daily: {},
    };

    orders.forEach((order) => {
      if (order.status === 'done') {
        const orderDate = new Date(order.createdAt);
        // Tính tổng doanh thu hàng ngày
        const dayKey = `${orderDate.getDate()}-${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
        result.daily[dayKey] = (result.daily[dayKey] || 0) + order.total_price;

        // Tính tổng doanh thu hàng tuần
        const weekNumber = getWeekNumber(orderDate);
        result.weekly[weekNumber] = (result.weekly[weekNumber] || 0) + order.total_price;

        // Tính tổng doanh thu hàng tháng
        const monthYearKey = `${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
        result.monthly[monthYearKey] = (result.monthly[monthYearKey] || 0) + order.total_price;

        // Tính tổng doanh thu hàng năm
        const yearKey = orderDate.getFullYear();
        result.yearly[yearKey] = (result.yearly[yearKey] || 0) + order.total_price;
        // Tính tổng doanh thu hàng quý
        const quarter = Math.floor((orderDate.getMonth() + 3) / 3);  // Tính quý từ tháng
        const quarterKey = `${quarter}-${orderDate.getFullYear()}`;
        result.quarterly[quarterKey] = (result.quarterly[quarterKey] || 0) + order.total_price;
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
    const { total, totalSuccessfulOrders, totalCancelledOrders, totalOrderss } = calculateTotalRevenueByDateRange(orders, dateRange);
    setTotalRevenue(total);
    setTotalSuccessfulOrders(totalSuccessfulOrders);
    setTotalCancelledOrders(totalCancelledOrders);
    settotalOrderss(totalOrderss)
  }, [dateRange, orders]);

  useEffect(() => {
    const { weekly, monthly, yearly, quarterly, daily } = calculateTotalRevenueByTime(orders);
    setWeeklyRevenue(weekly);
    setMonthlyYearlyRevenue({
      weekly: { ...weekly },
      monthly: { ...monthly },
      yearly: { ...yearly },
      quarterly: { ...quarterly },
      daily: { ...daily },
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

  useEffect(() => {
    if (monthlyYearlyRevenue?.quarterly) {
      const quarterlyRevenueArray = Object.entries(monthlyYearlyRevenue.quarterly).map(([quarterYear, revenue]) => ({
        quarterYear: `Quý ${quarterYear}`,
        revenue,
      }));
      setQuarterlyRevenueData(quarterlyRevenueArray);
    }
  }, [monthlyYearlyRevenue]);

  useEffect(() => {
    if (monthlyYearlyRevenue?.daily) {
      const dailyRevenueArray = Object.entries(monthlyYearlyRevenue.daily).map(([day, revenue]) => ({
        day,
        revenue,
      }));
      setDailyRevenueData(dailyRevenueArray);
    }
  }, [monthlyYearlyRevenue]);

  const calculateTotalOrdersByTime = (orders) => {
    const result = {
      daily: {},
      weekly: {},
      monthly: {},
      yearly: {},
    };

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);

      // Calculate total orders per day
      const dayKey = `${orderDate.getDate()}-${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
      result.daily[dayKey] = (result.daily[dayKey] || 0) + 1;

      // Calculate total orders per week
      const weekNumber = getWeekNumber(orderDate);
      result.weekly[weekNumber] = (result.weekly[weekNumber] || 0) + 1;
      // Calculate total orders per month
      const monthYearKey = `${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
      result.monthly[monthYearKey] = (result.monthly[monthYearKey] || 0) + 1;


      // Calculate total orders per year
      const yearKey = orderDate.getFullYear();
      result.yearly[yearKey] = (result.yearly[yearKey] || 0) + 1;
    });

    return result;
  };

  // Update the useEffect hook to calculate and set the total orders by time
  useEffect(() => {
    const { daily, weekly, monthly, yearly } = calculateTotalOrdersByTime(orders);
    setDailyOrderData(Object.entries(daily).map(([day, count]) => ({ day, count })));
    setWeeklyOrderData(Object.entries(weekly).map(([week, count]) => ({ week, count })));
    setMonthlyOrderData(Object.entries(monthly).map(([monthYear, count]) => ({ monthYear, count })));
    setYearlyOrderData(Object.entries(yearly).map(([year, count]) => ({ year, count })));
  }, [orders]);

  const calculateNewCustomersByTime = (users, dateRange) => {
    let newCustomers = 0;
    users.forEach((user) => {
      const userSignUpDate = new Date(user.createdAt);
      const isWithinRange =
        (!dateRange[0] || userSignUpDate >= dateRange[0]) &&
        (!dateRange[1] || userSignUpDate <= dateRange[1]);

      // Check if the user has the role 'user'
      const isUser = user.role.role_name === 'user';

      if (isWithinRange && isUser) {
        newCustomers += 1;
      }
    });

    return newCustomers;
  };

  useEffect(() => {
    if (userData?.users) {
      const newCustomers = calculateNewCustomersByTime(userData.users, dateRange);
      setTotalNewCustomers(newCustomers);
    }
  }, [dateRange, userData]);




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
  const orderData = [
    { status: 'Đơn hàng được tạo mới', count: totalSuccessfulOrders },
    { status: 'Đơn hàng hủy', count: totalCancelledOrders },
  ];
  const handleResetDateRange = () => {
    // Handle the logic to reset the date range, for example, set it to an initial state
    setDateRange([null, null]);
  };

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

      <div className='grid grid-cols-3 mt-10'>
        <Link to="contact">
          <div className='bg-purple-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
            <div className='block px-6'>
              {<div className='text-5xl text-white font-semibold pb-[22px]'> {totalContacts}</div>}
              <div className='text-white font-medium text-2xl mb-9'>Danh Sách Liên Hệ</div>
            </div>

          </div>
        </Link>
        <Link to="order">
          <div className='bg-rose-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
            <div className='block px-6'>
              {<div className='text-5xl text-white font-semibold pb-[22px]'>{totalOrders}</div>}
              <div className='text-white font-medium text-2xl mb-9'>Đơn Hàng Chưa Xử Lý</div>
            </div>

          </div>
        </Link>
        <Link to="order">
          <div className='bg-rose-500 rounded-lg pt-6 mb-8 block w-[300px] h-[150px]'>
            <div className='block px-6'>
              {<div className='text-5xl text-white font-semibold pb-[22px]'>{totalCanceledOrders}</div>}
              <div className='text-white font-medium text-2xl mb-9'>Đơn Hàng Đã Hủy</div>
            </div>

          </div>
        </Link>

      </div>

      <div className="mt-8 mx-10">
        <Chart height={300} data={data} autoFit>
          <Axis name="Chức vụ" title />
          <Tooltip shared />
          <Interval position="role*count" color="role" adjust={['dodge']} />

        </Chart>
      </div>
      <div >
        <section className="bg-white">
          <div className="mx-auto max-w-screen-xl px-2 py-10 sm:px-6 md:py-16 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Thống Kê Doanh Thu Cửa Hàng</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
              <div>
                <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">Thống kê doanh thu theo </label>
                <RangePicker className="my-5" value={dateRange} onChange={onChangeSearchOrderDate} />
                <Button className='mx-2' type="default" onClick={handleResetDateRange}>
         
    <SyncOutlined spin />
   
        </Button>
                <div className="flex flex-wrap items-center">
                  <div className="flex-1">
                    <dt className="order-last text-lg font-medium text-gray-500">Tổng Doanh Thu</dt>
                    <dd className="text-4xl font-extrabold text-blue-600 md:text-3xl">{new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalRevenue)}</dd>
                  </div>

                  <div className="flex-1">
                    <dt className="text-lg font-medium text-gray-500">Số khách hàng đăng ký mới:</dt>
                    <dd className="text-4xl font-extrabold text-green-600 md:text-3xl">{totalNewCustomers}</dd>
                  </div>

                </div>
                <div className="flex items-center mt-5">
                  <dt className="text-lg font-medium text-gray-500">Số đơn hàng đã hoàn thành:</dt>
                  <dd className="text-4xl font-extrabold text-green-600 md:text-3xl ml-2">{totalOrderss}</dd>
                </div>

                <div className="mt-8">
                  {/* Bar chart for successful and cancelled orders */}
                  <Chart height={300} data={orderData} autoFit>
                    <Axis name="Đơn hàng " title />
                    <Tooltip shared />
                    <Interval position="status*count" color="status" />
                  </Chart>
                </div>
              </div>

              <div >
                <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">Thống kê doanh thu những đơn hàng thành công theo </label>
                <div className="mt-7 mb-40">
                  <Select
                    defaultValue="weekly"
                    style={{ width: 120, marginRight: 16 }}
                    onChange={(value) => setSelectedTimeRange(value)}
                  > <Option value="daily">Ngày</Option>
                    <Option value="weekly">Tuần</Option>
                    <Option value="monthly">Tháng</Option>
                    <Option value="quarterly">Quý</Option>
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
                {selectedTimeRange === 'quarterly' && (
                  <div className="mt-8">
                    <Chart height={300} data={quarterlyRevenueData} autoFit>
                      <Axis name="quarterYear" title={{ text: 'Quý' }} />
                      <Axis name="revenue" title={{ text: 'Doanh thu' }} />
                      <Tooltip shared />
                      <Interval position="quarterYear*revenue" color="quarterYear" />
                      <Legend visible={false} />
                    </Chart>
                  </div>
                )}
                {selectedTimeRange === 'daily' && (
                  <div className="mt-8">
                    <Chart height={300} data={dailyRevenueData} autoFit>
                      <Axis name="day" title={{ text: 'Ngày' }} />
                      <Axis name="revenue" title={{ text: 'Doanh thu' }} />
                      <Tooltip shared />
                      <Interval position="day*revenue" color="day" />
                      <Legend visible={false} />
                    </Chart>
                  </div>
                )}


              </div>
            </div>
          </div>
          <div className="mx-10">
            <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">Thống kê đơn hàng được tạo mới theo </label>
            <div className="mt-8">
              <Select
                defaultValue="Ngày"
                style={{ width: 120, marginRight: 16 }}
                onChange={(value) => setSelectedTimeRangee(value)}
              > <Option value="Ngày">Ngày</Option>
                <Option value="Tuần">Tuần</Option>
                <Option value="Tháng">Tháng</Option>
                <Option value="Năm">Năm</Option>
              </Select>
            </div>
            {selectedTimeRangee === 'Ngày' && (
              <div className="mt-8">
                <Chart height={300} data={dailyOrderData} autoFit>
                  <Axis name="day" title={{ text: 'Ngày' }} />
                  <Axis name="count" title={{ text: 'Số đơn hàng' }} />
                  <Tooltip shared />
                  <Interval position="day*count" color="day" />
                  <Legend visible={false} />
                </Chart>
              </div>
            )}

            {selectedTimeRangee === 'Tuần' && (
              <div className="mt-8">
                <Chart height={300} data={weeklyOrderData} autoFit>
                  <Axis name="week" title={{ text: 'Tuần' }} />
                  <Axis name="count" title={{ text: 'Số đơn hàng' }} />
                  <Tooltip shared />
                  <Interval position="week*count" color="week" />
                  <Legend visible={false} />
                </Chart>
              </div>
            )}
            {selectedTimeRangee === 'Tháng' && (
              <div className="mt-8">
                <Chart height={300} data={monthlyOrderData} autoFit>
                  <Axis name="monthYear" title={{ text: 'Tháng' }} />
                  <Axis name="count" title={{ text: 'Số đơn hàng' }} />
                  <Tooltip shared />
                  <Interval position="monthYear*count" color="monthYear" />
                  <Legend visible={false} />
                </Chart>
              </div>
            )}
            {selectedTimeRangee === 'Năm' && (
              <div className="mt-8">
                <Chart height={300} data={yearlyOrderData} autoFit>
                  <Axis name="year" title={{ text: 'Năm' }} />
                  <Axis name="count" title={{ text: 'Số đơn hàng' }} />
                  <Tooltip shared />
                  <Interval position="year*count" color="year" />
                  <Legend visible={false} />
                </Chart>
              </div>
            )}

          </div>
        </section>
      </div>
    </div>

  );
};

export default HomeAdmin;


