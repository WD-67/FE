import { Pagination ,   notification} from 'antd'
import { EditOutlined } from "@ant-design/icons"
import { Switch, Popconfirm, Button } from "antd"
import { BsFillTrash3Fill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { StarOutlined } from '@ant-design/icons';
import { useGetCommentQuery, useRemoveCommentMutation } from '@/api/comment'
const ListComment = () => {
    const { data: commentData ,refetch} = useGetCommentQuery();
    const [removeComment] = useRemoveCommentMutation()
    const handleSoftDelete = async (id: string) => {
        try {
            await removeComment(id);
            notification.success({
                message: 'Success',
                description: 'Xóa bình luận thành công',
            });
            refetch();
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Xóa bình luận không thành công',
            });
        }
    };
    return (<>
         <div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
                    <h2 className="font-bold text-xl mt-5">Bình Luận  </h2>
                    <div className="ml-auto mb-5">
                        <input
                            className="h-10 w-60 px-4 rounded-xl border-2 mx-2"
                            id="search"
                            type="search"
                            placeholder="Search website..."
                        />
                    </div>
                </div>
                <div >
                    <table className="min-w-full divide-y divide-gray-200 bg-white text-sm w-max ">
                        <thead className="ltr:text-left rtl:text-right ">
                            <tr className="bg-gray-50">
                                <th className="whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5">
                                    <div className="flex items-center">
                                        <div className="mr-2"> Người dùng  </div>
                                    </div>
                                </th>
                                <th className="whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5">
                                    <div className="flex items-center">
                                        <div className="mr-2">Id sản phẩm </div>

                                    </div>
                                </th>
                                <th className="whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5">
                                    <div className="flex items-center">
                                        <div className="mr-2">Nội dung</div>

                                    </div>
                                </th>
                                <th className="whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5">
                                    <div className="flex items-center">
                                        <div className="mr-2">Action </div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 ">
                            {commentData?.length ? (
                                commentData.map((comment, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap font-medium text-gray-900 flex text-left my-5 mx-2 ">
                                            <div className="flex items-center">
                                                <p className="text-xs lg:text-base md:text-xl  mx-1"> {comment.fullname}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap  text-gray-700 py-4 ">
                                            <div className="items-center">
                                                <p className="text-xs lg:text-base md:text-xl mx-1">
                                                    {comment.productId}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap  text-gray-700 py-4 ">
                                            <div className="items-center">
                                                <p className="text-xs lg:text-base md:text-xl mx-8">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap ">
                                            <div className="flex items-center">
                                                <Link
                                                    to={`/admin/comments/${comment._id}`}
                                                    className="px-3  text-xl rounded-md border border-gray-300"
                                                >

                                                    <EditOutlined className="flex items-center py-[5px]" />
                                                </Link>
                                                <div className="px-2 py-4 text-xl cursor-pointer">
                                                    <Popconfirm
                                                        placement="topRight"
                                                        title={`Xóa bình luận "${comment.content}"?`}
                                                        onConfirm={() => handleSoftDelete(comment._id as string)}
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
                                    <td colSpan={2}>No colors found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                    <Pagination defaultCurrent={1} total={100} />
                </div>
            </div>
    </>
    );

}

export default ListComment