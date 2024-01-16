import {
  useGetUserQuery,
  useRemoveUserMutation,
  useChangeStatusToInactiveMutation,
  useChangeStatusToActiveMutation,
} from "../../../api/user";
import { IUser } from "@/interfaces/user";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, Select, notification, Modal } from "antd";
import { DeleteTwoTone, EditOutlined, CloseOutlined } from "@ant-design/icons";
import { Switch } from "antd";
const { Search } = Input;
const { Option } = Select;

type Props = {};
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : {};
const AdminUser = (props: Props) => {
  const { data: userData, refetch, isLoading } = useGetUserQuery();
  const [
    removeUser,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useRemoveUserMutation();
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [changeStatusToInactive] = useChangeStatusToInactiveMutation();

  const [changeStatusToActive] = useChangeStatusToActiveMutation();

  const handleToggle = async (checked: boolean, userId: string) => {
    if (userId === currentUser._id) {
      // Ngăn người dùng chỉnh sửa trạng thái của chính họ
      return;
    }
  
    try {
      if (checked) {
        await changeStatusToActive(userId);
      } else {
        await changeStatusToInactive(userId);
      }
      console.log("New trang_thai:", checked ? "Active" : "Inactive");
      refetch();
    } catch (error) {
      // Xử lý lỗi (nếu có)
    }
  };
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleRoleFilter = (value: string) => {
    setRoleFilter(value);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setRoleFilter("");
  };

  const filteredDataSource = userData?.users?.filter((user: IUser) => {
    const nameMatch = user.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const emailMatch = user.email
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const roleMatch = roleFilter === "" || user.role?.role_name === roleFilter;

    return (nameMatch || emailMatch) && roleMatch;
  });

  const handleSoftDelete = (id: number | string) => {
    Modal.confirm({
      title: "Bạn có muốn xóa người dùng này?",
      content: "Hành động này không thể hoàn tác.",
      onOk: async () => {
        setLoading(true);
        try {
          await removeUser(id);
          notification.success({
            message: "Thành công",
            description: "Người dùng đã được xóa mềm thành công!",
          });
          // Gọi lại API để cập nhật danh sách người dùng
          refetch();
        } catch (error) {
          notification.error({
            message: "Lỗi",
            description: "Không thể xóa mềm người dùng",
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };
  const dataSource = filteredDataSource?.map((user: IUser) => ({
    key: user._id,
    name: user.name,
    fullname: user.fullname,
    ngaysinh: user.ngaysinh,
    phone: user?.phone,
    email: user.email,
    password: user.password,
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
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai",
      key: "trang_thai",
      render: (trang_thai: string, record: { key: string | number, role_name: string, role: { role_name: string } }) => {
        if (currentUser?.role?.role_name === "quản lý" && record.key !== currentUser._id) {
          if (record.role !== "quản lý" && record.role !== "admin") {
            return (
              <Switch
                checked={trang_thai === "Active"}
                onChange={(checked) => handleToggle(checked, record.key.toString())}
              />
            );
          } else {
            return (
              <Switch
                checked={trang_thai === "Active"}
                disabled
              />
            );
          }
        } else if (currentUser?.role?.role_name === "admin" && record.key !== currentUser._id) {
          if (record.role_name !== "admin") {
            return (
              <Switch
                checked={trang_thai === "Active"}
                onChange={(checked) => handleToggle(checked, record.key.toString())}
              />
            );
          } else {
            return (
              <Switch
                checked={trang_thai === "Active"}
                disabled
              />
            );
          }
        } else {
          return (
            <Switch
              checked={trang_thai === "Active"}
              disabled
            />
          );
        }
      },
    },
    // {
    //   title: "favoriteProducts",
    //   dataIndex: "favoriteProducts",
    //   key: "favoriteProducts",
    // },
    // {
    //   title: "addressUser",
    //   dataIndex: "addressUser",
    //   key: "addressUser",
    // },
    {
      render: ({ key: id, role }: { key: string | number; role: string }) => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (
          user &&
          user.role &&
          user.role.role_name === "admin" &&
          role !== "admin"
        ) {
          return (
            <>
              <div className="flex space-x-2">
                <Button>
                  <Link to={`/admin/user/edit/${id}`}>
                    <EditOutlined />
                  </Link>
                </Button>
                <Button
                  onClick={() => handleSoftDelete(id.toString())}
                  type="text"
                  danger
                  className="ml-2"
                >
                  <DeleteTwoTone />
                </Button>
              </div>
            </>
          );
        }
      },
    },
  ];

  return (
    <div>
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-2xl">Quản lý user</h2>
        <div className="flex items-center space-x-4">
          <Search
            placeholder="Tìm kiếm theo tên hoặc email"
            onSearch={handleSearch}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
          <Select
            placeholder="Lọc theo role"
            onChange={handleRoleFilter}
            value={roleFilter || undefined}
            style={{ width: 150 }}
          >
            <Option value="admin">Admin</Option>
            <Option value="user">Khách hàng</Option>
            <Option value="nhân viên">Nhân viên</Option>
            <Option value="quản lý">Quản lý</Option>
          </Select>
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteTwoTone />}
            onClick={handleClearFilters}
          />
        </div>
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

export default AdminUser;
