import Item from "@/components/item/item";
import { useGetProductsQuery } from "@/api/product"
import { IProduct } from "@/interfaces/product"

const ListProductSale = () => {
    const { data: productData } = useGetProductsQuery();
    const filteredProducts = productData?.products
    ? [...productData.products].sort((a: IProduct, b: IProduct) => b.sale - a.sale).slice(0, 5)
    : [];
    return (
        <div className="list-new-products hot-sale-scroll p-20 overflow-x-auto">
        <div className="content-list-new-products w-max flex gap-5">
          <div className="content-list-new-products grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product: IProduct, index: any) => (
              <div className="w-full" key={index}>
                <Item product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default ListProductSale;
