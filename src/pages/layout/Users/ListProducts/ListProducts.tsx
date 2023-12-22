import  CustomTabs  from "../../Users/Tabs/Taps";
import ListProductNew  from "../../Users/ListProducts/ListProductNew"
import "./List.css"
import ListProductSale from "./List_productSale";
import BannerCaption from "../../Client/BannerCaption";
const ListProducts = () => {
  return (
    <>
      <h1 className="text-2xl text-[#222] text-center font-bold tracking-wider my-5">DANH MỤC SẢN PHẨM</h1>
      <CustomTabs />
      <h1 className="text-2xl text-[#222] text-center font-bold tracking-wider mt-7">SẢN PHẨM SALE LỚN </h1>
      <ListProductSale />
      <BannerCaption />
      <h1 className="text-2xl text-[#222] text-center font-bold tracking-wider mt-7">SẢN PHẨM MỚI</h1>
      <ListProductNew />

      
      
    </>
  );
};

export default ListProducts;
