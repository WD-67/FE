import Header from "./Header"
import BannerCaption from "./BannerCaption"
import BannerCategory from "./BannerCategory"
import BannerHome from "./BannerHome"
import HeaderHomeInfo from "./HeaderHomeInfo"
import Footer from "./Footer"
import Blog from "../Users/Blog/Blog"
import Contact from "../Users/Contact/Contact"
import About from "../Users/About/About"
import ListProducts from "../Users/ListProducts/ListProducts"
import Shop_Products from "../Users/Shop-Products/Shop_Products"
import Item from "../../../components/item/item"
import Detail_Product from "../Users/Detail-Product/Detail_Product"
import { Outlet } from "react-router-dom"
type Props = object

const Container = (props: Props) => {
    return (
        <div>

            <BannerHome />
            <ListProducts />
    
            <BannerCaption />
         
        </div>
    )
}

export default Container