import Item from "@/components/item/item";
import { useGetProductsQuery } from "@/api/product"
import { IProduct } from "@/interfaces/product"

const ListProductNew = () => {
    const { data: productData } = useGetProductsQuery();
    return (
        <div className="list-new-products hot-sale-scroll p-20 overflow-x-auto  ">
          
        <div className="content-list-new-products w-max flex gap-5  ">
    
            <div className="content-list-new-products   grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 "> 
            {productData?.products.map((product: IProduct, index: any) => (
           < div className="w-full">
    <Item product={product} key={index} />
</div>
 ))} 
            </div> 
           
        </div>
        
    </div>
    
    );
};

export default ListProductNew;
