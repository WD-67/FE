import { useGetCustomerQuery, useRemoveCustomerMutation } from "../../../api/customer";
import { ICustomer } from "../../../interfaces/customer";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";

type Props = {};

const AdminCustomer = (props: Props) => {
  const { data: customerData, error, isLoading } = useGetCustomerQuery();
  const [
    removeCustomer,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useRemoveCustomerMutation();

  const confirm = (id: number | string) => {
    removeCustomer(id);
  };
  const dataSource = customerData?.customers?.map((customer: ICustomer) => ({
    key: customer.id,
    name: customer.name,
    fullname: customer.fullname,
    ngaysinh: customer.ngaysinh,
    email: customer.email,
    password: customer.password,
    trang_thai: customer.trang_thai,
  }));
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaysinh",
      key: "ngaysinh",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
    },
    {
      render: ({ key: id }: { key: string | number }) => {
        return (
          <>
            <div className="flex space-x-2">
              <Popconfirm
                title="Bạn muốn xóa không?"
                onConfirm={() => confirm(id)}
                okText="Yes"
                cancelText="No"
              >
                <Button>
                  Xóa
                </Button>
              </Popconfirm>
              <Button type="primary" danger>
                <Link to={`/admin/customer/${id}`}>Sửa</Link>
              </Button>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl">Quản lý khách hàng</h2>
      </header>
      {isRemoveSuccess && <Alert message="Success Text" type="success" />}
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table dataSource={dataSource} columns={columns} />
      )}
    </div>
  );
};

export default AdminCustomer;