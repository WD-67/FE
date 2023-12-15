export interface IProduct {
  _id?: number| string;
  name: string;
  price: number;
  hot_sale?: number ;
  image: Array<string>;
  colorSizes?:  Array<string>;
  categoryId: string | number | object;  
  quantity : number;
  description: string;

}