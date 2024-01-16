export interface IUser {
    value: unknown;
	messages(arg0: string, messages: unknown): unknown;
	data: IUser;
    _id: string | number;
    name: string;
    fullname: string;
    ngaysinh: Date; 
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    trang_thai: "Active" | "Inactive";
    image_url: string; 
    favoriteProducts: string[]; 
    addressUser: string[];     
    newPassword:string,
    oldPassword:string
}
