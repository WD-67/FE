import { Pagination ,notification} from 'antd'
import { EditOutlined } from "@ant-design/icons"
import { Switch, Popconfirm, Button } from "antd"
import { BsFillTrash3Fill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { useEffect } from "react";
import Message from "../../action/Message/Message"
import Loading from '../../action/Loading/Loading'
import { useGetTintucQuery, useRemoveTintucMutation } from '@/api/tintuc'
const DanhSachTinTuc = () => {
    const { data: tintucData, error, isLoading } = useGetTintucQuery();
    const [removeTintuc] = useRemoveTintucMutation()
    const handleSoftDelete = async (id: string) => {
        try {
            await removeTintuc(id);
            notification.success({
                message: 'Success',
                description: 'Xóa tin tức thành công',
            })
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Xóa tin tức không thành công',
            });
        }
    };
    return (<>
             {isLoading ? (
                <Loading />
            ) : error ? (
                "Error"
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
                        <h2 className="font-bold text-xl mt-5">Tin Tức </h2>
                        <div className="ml-auto mb-5">
                            <input
                                className="h-10 w-60 px-4 rounded-xl border-2 mx-2"
                                id="search"
                                type="search"
                                placeholder="Search website..."
                            />
                            <Link to={'/admin/tintuc/add'} className="my-2 border rounded p-2 bg-blue-500 hover:bg-red-700 font-bold py-2 px-4 text-white w-full lg:w-40 ">Add Tin Tức </Link>
                        </div>
                    </div>
                    <div >
                        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm w-max ">
                            <thead className="ltr:text-left rtl:text-right ">
                                <tr className="bg-gray-50">
                                    <th className="whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5">
                                        <div className="flex items-center">
                                            <div className="mr-2">Tiêu Đề</div>
                                        </div>
                                    </th>
                                    <th className="whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5">
                                        <div className="flex items-center">
                                            <div className="mr-2">Nội Dung</div>

                                        </div>
                                    </th>
                                    <th className="whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5">
                                        <div className="flex items-center">
                                            <div className="mr-2">Trạng Thái</div>

                                        </div>
                                    </th>
                                    <th className="whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5">
                                        <div className="flex items-center">
                                            <div className="mr-2">Action</div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 ">
                                {tintucData?.length ? (
                                    tintucData.map((tintuc, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap font-medium text-gray-900 flex text-left my-5 mx-2 ">
                                                <div className="flex items-center">
                                                    <p className="text-xs lg:text-base md:text-xl  mx-2"> {tintuc.tieude}</p>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap  text-gray-700 py-4 ">
                                                <div className="items-center">
                                                    <p className="text-xs lg:text-base md:text-xl ">
                                                        {tintuc.noidung}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap  text-gray-700 py-4 ">
                                                <div className="items-center">
                                                    <p className="text-xs lg:text-base md:text-xl mx-10">
                                                        {tintuc.trang_thai}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap ">
                                                <div className="flex items-center">
                                                    <Link
                                                        to={`/admin/tintuc/${tintuc._id}`}
                                                        className="px-3  text-xl rounded-md border border-gray-300"
                                                    >
                                                        <EditOutlined className="flex items-center py-[5px]" />
                                                    </Link>
                                                    <div className="px-2 py-4 text-xl cursor-pointer">
                                                        <Popconfirm
                                                            placement="topRight"
                                                            title={`Delete the news "${tintuc.tieude}"?`}
                                                            onConfirm={() => handleSoftDelete(tintuc._id!)}
                                                            okText="Yes"
                                                            cancelText="No"
                                                            okButtonProps={{ style: { background: "red" } }}
                                                        >
                                                            <Button>
                                                                <BsFillTrash3Fill />
                                                            </Button>
                                                        </Popconfirm>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2}>No tintuc found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>
                    <div className="flex justify-center">
                        <Pagination defaultCurrent={1} total={100} />
                    </div>
                </div>
            )}
    </>
    );
}


export default DanhSachTinTuc