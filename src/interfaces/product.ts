export interface IProduct {
  _id?: number| string;
  name: string;
  price: number;
  hot_sale?: number  ;
  image: Array<string>;
  listQuantityRemain:  Array<string>;
  categoryId: string | number | object;  
  description: string;

}