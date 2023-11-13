import { useGetAllPaymentQuery } from "@/api/payment";
import Table, { ColumnsType } from "antd/es/table";
import { format } from "date-fns";
import { useEffect, useState } from "react";

type DataType = {
    key: string;
} & any;

const PaymentAdmin =()=> {
    const [dataSource, setDataSource] = useState<DataType[]>([]);

    const { data: payments, isFetching } = useGetAllPaymentQuery();

    useEffect(() => {
        const _dataSource = payments?.data?.map((item, index) => ({
            key: item._id,
            index: index + 1,
            ...item,
        }));
        setDataSource(_dataSource as DataType[]);
    }, [payments]);
    const columns: ColumnsType<DataType> = [
        {
            title: "Thông tin người chuyển",
            dataIndex: "name",
            children: [
                {
                    title: "Họ và tên",
                    dataIndex: "user",
                    width: 200,
                    render: (user_booking) => (
                        <p
                            style={{
                                maxWidth: "200px",
                                whiteSpace: "normal",
                                color: "#334155",
                            }}
                            className="text-line-3 text-base font-medium"
                        >
                            {user_booking?.fullname}
                        </p>
                    ),
                },
                {
                    title: "Email",
                    dataIndex: "user_booking",
                    width: 200,
                    render: (user_booking) => (
                        <p
                            style={{
                                maxWidth: "200px",
                                whiteSpace: "normal",
                                color: "#334155",
                            }}
                            className="text-line-3 text-base font-medium"
                        >
                            {user_booking?.email}
                        </p>
                    ),
                },
            ],
        },
        {
            title: "Số tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            width: 150,
            render: (totalPrice) => (
                <p
                className="text-center"
                style={{
                    color: "#10b981",
                    backgroundColor: "#10b98119",
                    padding: "4px 8px",
                    borderRadius: "4px",
                }}
            >
                {totalPrice?.toLocaleString()} VNĐ
            </p>
            ),
        },
        {
            title: "Hình thưc",
            dataIndex: "payment_function",
            key: "payment_function",
            width: 150,
            render: (payment_function) => (
                <p
                    style={{
                        maxWidth: "200px",
                        whiteSpace: "normal",
                        color: "#334155",
                    }}
                    className="text-line-3 text-base font-medium"
                >
                    {payment_function==='cash'?'Tiền mặt':'Chuyển khoản'}
                </p>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            width: 100,
            key: "status",
            render: (status) => (
                <span
                    style={{
                        color: status === "success" ? "#3917d2" : "#fcfcfc",
                        backgroundColor: status === "success" ? "#23d707" : "red",
                        padding: "4px 8px",
                        borderRadius: "4px",
                    }}
                >
                    {status}
                </span>
            ),
        },
        {
            title: "Ngày thanh toán",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 150,
            render: (createdAt) => (
                <div className="flex flex-col">
                    <span style={{ color: "#64748b", fontWeight: "600", fontSize: "15px" }}>{format(new Date(createdAt), "dd-MM-yyyy")}</span>

                    <span className="text-sm mt-0.5" style={{ color: "#64748b", fontWeight: "500" }}>
                        {format(new Date(createdAt), "HH:mm:ss")}
                    </span>
                </div>
            ),
        },

       
    ];
    return  <div className="mt-6">
    <Table loading={isFetching} columns={columns} dataSource={dataSource} />
</div>

}

export default PaymentAdmin