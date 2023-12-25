import { Form, Button, Input, DatePicker, message } from "antd";
import LoadingOutlined from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAddUserMutation, useSignupUserMutation } from "@/api/user";
import { IUser } from "@/interfaces/user";
import { useForm } from "react-hook-form";
import zxcvbn from "zxcvbn";
type FieldType = {
  name: string;
  fullname: string;
  ngaysinh: Date;
  email: string;
  password: string;
  confirmPassword: string;
  trang_thai: string;
};
const Signup = () => {
  const { handleSubmit, register, getValues } = useForm<IUser>();
  const [signup, { isLoading }] = useSignupUserMutation();
  const navigate = useNavigate();
  const onFinish = (values: IUser) => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (password.length < 6) {
      message.error("Mật khẩu phải có ít nhất 6 kí tự!");
      return;
    }

    signup(values)
      .unwrap()
      .then(() => {
        message.success("Đăng ký thành công!");
        navigate("/signin");
      })
      .catch((error) => {
        message.error("Đăng ký thất bại. Vui lòng thử lại!");
        console.log(error);
      });
  };
  return (
    <>
      <script
        src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"
        defer
      ></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js"></script>
      <style>
        @import
        url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')
      </style>

      <div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-black rounded-3xl shadow-xl w-full overflow-hidden">
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-black py-10 px-10">
              <img
                src="https://cf.shopee.vn/file/67461f130625a015fcfff3180aa1c0a9"
                className="w-full  rounded-3xl"
                alt=""
              />
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900 mb-5">
                  Đăng ký
                </h1>
                <p>Nhập thông tin của bạn để đăng ký</p>
              </div>
              <div>
                <form onSubmit={handleSubmit(onFinish)}>
                  <div className="flex -mx-3">
                    <div className="w-1/2 px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Họ và tên
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập họ và tên"
                          id="fullname"
                          {...register("fullname")}
                          required
                        />
                      </div>
                    </div>
                    <div className="w-1/2 px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Tên tài khoản
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="text"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập tên tài khoản"
                          id="name"
                          {...register("name")}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-1/2 px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Ngày sinh
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="date"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập địa chỉ"
                          id="ngaysinh"
                          {...register("ngaysinh")}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Email
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="email"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập email có dạng johnsmith@example.com"
                          id="email"
                          {...register("email")}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Mật khẩu
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="password"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập mật khẩu"
                          id="password"
                          {...register("password")}
                          required
                        />
                      </div>
                      {getValues("password") && (
                        <div className="text-red-500 text-xs mt-1">
                          {zxcvbn(getValues("password")).feedback.warning}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="" className="text-xs font-semibold px-1">
                        Xác nhận mật khẩu
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input
                          type="password"
                          className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                          placeholder="Nhập lại mật khẩu"
                          id="confirmPassword"
                          {...register("confirmPassword")}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <button
                        type="submit"
                        className="mt-5 tracking-wide font-semibold bg-slate-900 text-white w-full py-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </div>
                </form>
                <div className="flex -mx-3 mt-3">
                  <div className="w-full px-3 mb-5 text-center text-black hover:text-blue-400">
                    <Link to="/signin">
                      Bạn có muốn chuyển sang trang đăng nhập?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
