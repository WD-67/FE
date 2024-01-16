import React from "react";
import { Button, Table, notification, Spin } from "antd";
import { SyncOutlined, DeleteTwoTone } from "@ant-design/icons";
import {
  useGetDeletedUserQuery,
  usePermanentDeleteUserMutation,
  useRestoreUserMutation,
} from "@/api/user";
import { Link } from "react-router-dom";

type Props = {};

const RecycleBinUser = (props: Props) => {
  const {
    data: deletedUsers,
    isLoading,
    refetch,
  } = useGetDeletedUserQuery();
  const [restoreUser, { isLoading: isRestoring }] = useRestoreUserMutation();
  const [permanentDeleteUser, { isLoading: isDeleting }] =
    usePermanentDeleteUserMutation();

  const handleRestore = async (id: string) => {
    try {
      await restoreUser(id);
      notification.success({
        message: "Thành công",
        description: "Người dùng đã được khôi phục thành công!",
      });
      refetch();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể khôi phục người dùng",
      });
    }
  };

  const handlePermanentDelete = async (id: string) => {
    try {
      await permanentDeleteUser(id);
      notification.success({
        message: "Thành công",
        description: "Người dùng đã bị xóa vĩnh viễn!",
      });
      refetch();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Không thể xóa vĩnh viễn người dùng",
      });
    }
  };

  const dataSource = deletedUsers?.deletedUsers?.map((user: any) => ({
    key: user._id,
    name: user.name,
    fullname: user.fullname,
    ngaysinh: user.ngaysinh,
    phone: user.phone,
    email: user.email,
    role: user.role?.role_name,
    trang_thai: user.trang_thai,
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
      render: (ngaysinh: string) => {
        const date = new Date(ngaysinh);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return formattedDate;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
    },
    {
      title: 'Hành động',
      key: 'action',
      render: ({ key: id }: { key: number | string }) => (
          <>
              <Button onClick={() => handleRestore(id.toString())} disabled={isRestoring}>
              <SyncOutlined spin   style={{ fontSize: '26px', color: '#08c' }}/>
              </Button>
              <Button onClick={() => handlePermanentDelete(id.toString())}  disabled={isDeleting}>
              <DeleteTwoTone style={{ fontSize: '26px', color: 'red' }} />
              </Button>
          </>
      ),
  }
  ];

  if (isLoading) return <Spin />;

  return (
    <div>
      <h2 className="text-2xl">Thùng rác</h2>
      <Table dataSource={dataSource || []} columns={columns} />
    </div>
  );
};

export default RecycleBinUser;