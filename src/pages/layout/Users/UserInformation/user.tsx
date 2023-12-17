import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Dropdown, Popover, Button, message } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import ChangePassword from "./changePassword";
import UserProfile from "./userProfile";
const { Item, Divider } = Menu;

const UserInformation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : {};
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(user?.role?.role_name === "admin");
  }, [user]);

  const handleShowChangePassword = () => {
    setShowChangePassword(true);
    setShowMenu(false);
    setShowProfile(false);
  };

  const handleHideChangePassword = () => {
    setShowChangePassword(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    message.success("Đã đăng xuất thành công");
    navigate("/");
  };

  const handleMenuClick = (e: any) => {
    if (e.key === "profile") {
      setShowProfile(true);
      setShowMenu(false);
    } else if (e.key === "logout") {
      handleLogout();
    }
  };

  const handleVisibleChange = (visible: boolean) => {
    setShowMenu(visible);
  };

  const handleProfileClose = () => {
    setShowProfile(false);
  };

  const formatDate = (dateString: string) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const profileFields = [
    { label: "Tên", value: user.name },
    { label: "Họ Và Tên", value: user.fullname },
    { label: "Email", value: user.email },
    { label: "Ngày sinh", value: formatDate(user.ngaysinh) },
    // Thêm các trường thông tin người dùng khác vào đây
  ];

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Item key="profile">Hồ sơ</Item>

      {isAdmin && (
        <Item key={location.pathname === "/" ? "admin" : "home"}>
          <Link to={location.pathname === "/" ? "/admin" : "/"}>
            {location.pathname === "/" ? "Trang Admin" : "Trang chủ"}
          </Link>
        </Item>
      )}

      <Item key="history">
        <Link to="/order-history">
          Lịch sử mua hàng
        </Link>
      </Item>

      <Item key="changePassword" onClick={handleShowChangePassword}>
        <span>Đổi mật khẩu</span>
      </Item>
      <Divider />
      <Item key="logout">
        <span>
          <LogoutOutlined /> Đăng xuất
        </span>
      </Item>
    </Menu>
  );

  const profileContent = (
    <div>
      {profileFields.map((field, index) => (
        <p key={index}>
          {field.label}: {field.value}
        </p>
      ))}
      <Button onClick={handleProfileClose}>Đóng</Button>
    </div>
  );

  return (
    <div>
      {user && user.name ? (
        <div>
          <Dropdown
            overlay={menu}
            onVisibleChange={handleVisibleChange}
            visible={showMenu}
            trigger={["click"]}
          >
            <button
              type="button"
              className="group flex shrink-0 items-center rounded-lg transition"
            >
              <span className="sr-only">Menu</span>
              <img
                alt="Man"
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-10 w-10 rounded-full object-cover"
              />
              <p className="ms-2 hidden text-left text-xs sm:block ">
                <strong className="block font-medium text-sm">
                  {user.name}
                </strong>
                {/* <span className="text-gray-500">{user.email}</span> */}
              </p>
            </button>
          </Dropdown>

          {showChangePassword && (
            <Popover
              visible={showChangePassword}
              content={
                <ChangePassword
                  handleHideChangePassword={handleHideChangePassword}
                />
              }
              trigger="click"
              placement="bottom"
            ></Popover>
          )}

          {/* <Popover
            visible={showProfile}
            content={profileContent}
            title="Thông tin người dùng"
            trigger="click"
            onVisibleChange={handleProfileClose}
            placement="bottom"
          ></Popover> */}
          {showProfile && (
            <Popover
              visible={showProfile}
              content={
                <UserProfile
                  handleHideUserProfile={() => setShowProfile(false)}
                />
              }
              trigger="click"
              placement="bottom"
            ></Popover>
          )}
        </div>
      ) : (
        <div>
          <Link to="/signin">
            <Button className="login-button rounded-lg">Đăng nhập</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInformation;
