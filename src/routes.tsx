import { createBrowserRouter } from "react-router-dom";
import { AdminLayout, ClientLayout } from "./pages/layout";
import HomePage from "./pages/Main/HomePage";
import ProductDetailPage from "./pages/Main/ProductDetailPage";
import AddProduct from "./components/admin/Product/AddProduct";
import Product from "./components/admin/Product/Product";
import { default as UpdateProduct, default as UpdateSize } from "./components/admin/Product/UpdateProduct";
import RecycleBin from "./components/admin/Product/recycle-bin";
import AdminCustomerAdd from "./components/admin/customer/add";
import AdminCustomer from "./components/admin/customer/customer";
import AdminCustomerEdit from "./components/admin/customer/edit";
import AddImageProduct from "./components/admin/imageProduct/AddImage";
import AdminRoleAdd from "./components/admin/role/add";
import AdminRole from "./components/admin/role/role";
import AddSize from "./components/admin/size/AddSize";
import Size from "./components/admin/size/size";
import AdminUserAdd from "./components/admin/user/add";
import AdminEditUser from "./components/admin/user/edit";
import AdminUser from "./components/admin/user/user";
import SaleAdminPage from "./components/admin/SaleAdminPage";
import PaymentAdmin from "./components/admin/PaymentAdmin";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/products/:id",
                element: <ProductDetailPage />,
            },
        ],
    },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: "Page admin here",
    },
    {
        path: "sale",
        element: <SaleAdminPage />,
    },
    {
        path: "payment",
        element: <PaymentAdmin />,
    },
      {
        path: "product",
        element: <Product products={[]}/>,
      },
      {

        path: "user",
        element: <AdminUser />,
      },
      {
        path: "user/add",
        element: <AdminUserAdd />,
      },
      {
        path: "user/:id/edit",
        element: <AdminEditUser />,
      },
      {
        path: "customer",
        element: <AdminCustomer />,
      },
      {
        path: "customer/add",
        element: <AdminCustomerAdd />,
      },
      {
        path: "customer/:id",
        element: <AdminCustomerEdit />,
      },
      {
        path: "role",
        element: <AdminRole />,
      },
      {
        path: "role/add",
        element: <AdminRoleAdd />,
      },{
        path: "product/add",
        element: <AddProduct/>,
  
      },
      {
        path: "product/update/:id",
        element: <UpdateProduct/>,
      },
      {
        path: "product/recycle",
        element: <RecycleBin/>,
      },
      {
        path: "size",
        element: <Size/>,
      },
      {
        path: "size/add",
        element: <AddSize/>,
      },
      {
        path: "size/update/:id",
        element: <UpdateSize/>,
      },
      // {
      //   path: "imageProduct",
      //   element: <ImageProduct/>,
      // },
      {
        path: "imageProduct/add",
        element: <AddImageProduct/>,
      },
      // {
      //   path: "size/update/:id",
      //   element: <UpdateSize/>,
      // },

     
      

    ],
  },

  {
    path: "*",
    element: "NotFound Page nhé",
  },
 
  
]);
