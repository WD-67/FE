import { useGetRoleQuery, useRemoveRoleMutation } from "../../../api/role";
import { IRole } from "../../../interfaces/role";
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";

type Props = {};

const AdminRole = (props: Props) => {
  const { data: roleData, error, isLoading } = useGetRoleQuery();
  const [
    removeRole,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useRemoveRoleMutation();

  const confirm = (_id: number | string) => {
    removeRole(_id);
  };
  const dataSource = roleData?.map((role: IRole) => ({
    key: role._id,
    description: role.description,
    role_name: role.role_name,
    trang_thai: role.trang_thai,
  }));
//   console.log(dataSource);
  
  const columns = [
    {
      title: "Tên vai trò",
      dataIndex: "role_name",
      key: "role_name",
    },
    {
        title: "Mô tả vai trò",
        dataIndex: "description",
        key: "description",
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
                <Link to={`/admin/role/${id}/edit`}>Sửa</Link>
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
        <h2 className="text-2xl">Quản lý vai trò</h2>
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

export default AdminRole;