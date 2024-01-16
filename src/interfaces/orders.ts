export interface ISOrder {
    _id?: number| string;
    user_id: string;
    address: string;
    name: string;
    status: string;
    products: Array<string>;
    total_price: number;
}