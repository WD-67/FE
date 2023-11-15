import { createBrowserRouter } from "react-router-dom";
// import { MyComponent } from "./components";
import { AdminLayout, ClientLayout } from "./pages/layout"
import Product from "./components/admin/Product/Product"
import Order from "./components/admin/order/order"
import AddProduct from "./components/admin/Product/AddProduct"
import Size from "./components/admin/size/size"
import AddSize from "./components/admin/size/AddSize"
import UpdateProduct from "./components/admin/Product/UpdateProduct";
import RecycleBin from "./components/admin/Product/recycle-bin";
import UpdateSize from "./components/admin/size/UpdateSize";
import ImageProduct from "./components/admin/imageProduct/imageProduct"
import AddImage from "./components/admin/imageProduct/AddImage";
import HomeAdmin from "./pages/layout/Admin/home_admin";
import ListComment from "./components/admin/comment/list";
import SuaImageTinTuc from "./components/admin/imagetintuc/update";
import ThemImageTinTuc from "./components/admin/imagetintuc/add";
import ImageTinTuc from "./components/admin/imagetintuc/list";
import ThemTinTuc from "./components/admin/tintuc/add";
import DanhSachTinTuc from "./components/admin/tintuc/list";
import SuaTinTuc from "./components/admin/tintuc/update";
import UpdateImage from "./components/admin/imageProduct/UpdateImage";


import AdminCategory from "./components/admin/Category";
import CategoryAdd from "./components/admin/Category/add";
import CategoryEdit from "./components/admin/Category/edit";
import AdminContact from "./components/admin/Contact";
import ContactAdd from "./components/admin/Contact/add";
import ContactEdit from "./components/admin/Contact/edit";
import AdminInformation from "./components/admin/Inpormation";
import InformationAdd from "./components/admin/Inpormation/add";
import InformationEdit from "./components/admin/Inpormation/edit";


import AdminUser from "./components/admin/user/user";
import AdminUserAdd from "./components/admin/user/add";
import AdminEditUser from "./components/admin/user/edit";
import AdminCustomer from "./components/admin/customer/customer";
import AdminCustomerAdd from "./components/admin/customer/add";
import AdminCustomerEdit from "./components/admin/customer/edit";
import AdminRole from "./components/admin/role/role";
import AdminRoleAdd from "./components/admin/role/add";
import AdminRoleEdit from "./components/admin/role/edit";

import SaleAdminPage from "./components/SaleAdminPage";
import PaymentAdmin from "./components/PaymentAdmin";



export const routers = createBrowserRouter([
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        // index: true,
        // element: <MyComponent />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "product",
        element: <Product products={[]} />,
      },
      {
        path: "product/add",
        element: <AddProduct />,

      },
      {
        path: "product/update/:id",
        element: <UpdateProduct />,
      },
      {
        path: "product/recycle",
        element: <RecycleBin />,
      },
      {
        path: "size",
        element: <Size />,
      },
      {
        path: "size/add",
        element: <AddSize />,
      },
      {
        path: "size/update/:id",
        element: <UpdateSize />,
      },
      {
        path: "imageProduct",
        element: <ImageProduct />,
      },
      {
        path: "imageProduct/add",
        element: <AddImage />,
      },
      {
        path: "imageProduct/update/:id",
        element: <UpdateImage/>,
      },
      {
        path: "/admin",
        element: <HomeAdmin />,
      },
      {
        path: "tintuc",
        element: <DanhSachTinTuc />,
      },
      {
        path: "tintuc/add",
        element: <ThemTinTuc />,
      },
      {
        path: "tintuc/:id",
        element: <SuaTinTuc />,
      },
      {
        path: "imagetintuc",
        element: <ImageTinTuc />,
      },
      {
        path: "imagetintuc/add",
        element: <ThemImageTinTuc />,
      },
      {
        path: "imagetintuc/:id",
        element: <SuaImageTinTuc />,
      },
      {
        path: "comments",
        element: <ListComment />,
      },
      {
        path: "category",
        element: <AdminCategory />,
      },
      {
        path: "category/add",
        element: <CategoryAdd />,
      },
      {
        path: "category/:idCategory/edit",
        element: <CategoryEdit />,
      },
      {
        path: "contact",
        element: <AdminContact />,
      },
      {
        path: "contact/add",
        element: <ContactAdd />,
      },
      {
        path: "contact/:idContact/edit",
        element: <ContactEdit />,
      },
      {
        path: "information",
        element: <AdminInformation />,
      },
      {
        path: "information/add",
        element: <InformationAdd />,
      },
      {
        path: "information/:idInformation/edit",
        element: <InformationEdit />,
      },
      {
        path: "user",
        element: <AdminUser/>,
      },
      {
        path: "user/add",
        element: <AdminUserAdd/>,
      },
      {
        path: "user/edit/:id",
        element: <AdminEditUser/>,
      },
      {
        path: "customer",
        element: <AdminCustomer/>,
      },
      {
        path: "customer/add",
        element: <AdminCustomerAdd/>,
      },
      {
        path: "customer/edit/:id",
        element: <AdminCustomerEdit/>,
      },
      {
        path: "role",
        element: <AdminRole/>,
      },
      {
        path: "role/add",
        element: <AdminRoleAdd/>,
      },
      {
        path: "role/edit/:id",
        element: <AdminRoleEdit/>,
      },
      {
        path: "order",
        element: <Order/>,
      },
      {
        path: "sale",
        element: <SaleAdminPage />,
    },
    {
        path: "payment",
        element: <PaymentAdmin />,
    },

    ],
  },
  {
    path: "*",
    element: "NotFound Page nhé",
  },
]);
