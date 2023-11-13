import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ClientLayout = () => {
    return (
        <>
            <div className="h-8 flex">
                <span className="m-auto text-[rgb(68,68,68)] text-sm">Hotline: 0903.150.443 | Free Ship cho đơn hàng trên 1tr đồng</span>
            </div>
            <Header />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
};

export default ClientLayout;
