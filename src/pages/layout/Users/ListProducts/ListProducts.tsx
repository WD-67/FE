import CustomTabs from "../../Users/Tabs/Taps";
import ListProductNew from "../../Users/ListProducts/ListProductNew"
import "./List.css"
import ListProductSale from "./List_productSale";
import BannerCaption from "../../Client/BannerCaption";
import BannerCategory from "../../Client/BannerCategory";
const ListProducts = () => {

  return (
    <>
      {/* <h1 className="text-2xl text-[#222] text-
      center font-bold tracking-wider my-5">DANH MỤC SẢN PHẨM</h1>
      <CustomTabs /> */}
      
       <div className="overflow-hidden mt-5	border py-2">
        <div className="whitespace-nowrap inline-block animate-scrolling-text text-red-500	 text-xl font-mono			">
          NÓNG [ HOT SALE ] NHÂN DỊP KHAI TRƯƠNG RA MẮT SẢN PHẨM MỚI MẪU GIÀY MỚI HOT TREND CỦA NĂM NAY
        </div>
      </div>
      <h1 className="text-2xl text-[#222] text-center font-bold tracking-wider mt-4">SẢN PHẨM SALE LỚN </h1>
      <ListProductSale />
      <BannerCategory />
      <h1 className="text-2xl text-[#222] text-center font-bold tracking-wider mt-7">SẢN PHẨM MỚI</h1>
      <ListProductNew />




    </>
  );
};

export default ListProducts;
