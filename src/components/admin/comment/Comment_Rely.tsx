import { FaRegPaperPlane } from 'react-icons/fa';
import { SubmitHandler } from 'react-hook-form';
import { Form, Button, Input, message, Popconfirm, notification } from 'antd';
import { Icomment } from '@/interfaces/comment';
import { useParams } from 'react-router-dom';
import { useAddCommentMutation, useGetCommentQuery, useRemoveCommentMutation } from '../../../api/comment';
import { useState } from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';

type commentType = {
  content: String;
};

const Comment_Rely = () => {
  const { TextArea } = Input;
  const { id } = useParams<{ id: string }>();
  const { data: commentData, refetch } = useGetCommentQuery();
  const userString = localStorage.getItem('user');
  const userObject = JSON.parse(userString);
  const userId = userObject?._id;
  const fullname = userObject?.fullname;
  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
  const [removeComment] = useRemoveCommentMutation();
  const [form] = Form.useForm();
  const isLoggedIn = userId && fullname;
  const [commentSuccess, setCommentSuccess] = useState(false);

  const onFinish: SubmitHandler<Icomment> = (values) => {
    if (userId) {
      values.productId = id;
      values.userId = userId;
      values.fullname = fullname;
      addComment(values)
        .unwrap()
        .then((data) => {
          refetch();
          form.resetFields(['content']);
          setCommentSuccess(true);
          message.success('Đã đăng bình luận thành công');
        })
        .catch((error) => {
          console.error('Lỗi khi thêm bình luận:', error);
        });
    } else {
      console.error('Không tìm thấy User Id.');
      return (
        <div>
          <p className="text-base text-gray-800">Bạn cần đăng nhập để bình luận.</p>
        </div>
      );
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await removeComment(commentId);
      notification.success({
        message: 'Success',
        description: 'Xóa bình luận thành công!',
      });
      refetch();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Xóa bình luận không thành công',
      });
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800 }}
          onFinish={onFinish}
          autoComplete="off"
          className="flex items-start"
        >
         <Form.Item
          label="Thông Tin bình luận "
          name="content"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
          className="flex-grow"
        >
          <Input.TextArea
            className="inp-comment text-sm rounded-lg min-h-[420px] max-h-72"
            placeholder="Xin mời để lại bình luận, đánh giá"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className="ml-auto">
          <Button type="primary" danger htmlType="submit" className="flex items-center gap-1 px-3 rounded-lg">
            <i className="text-lg"><FaRegPaperPlane /></i>
            Gửi
          </Button>
        </Form.Item>
        </Form>
      ) : (
        <div>
          <p className="text-base text-gray-800">Bạn cần đăng nhập để bình luận.</p>
        </div>
      )}
      {commentData?.length ? (
        commentData.map((comment, index) => (
          comment.productId === id && (
            <div key={index} className="user-image mt-5">
              <div className="comment-container flex">
                <div className="comment-text-user relative p-3 rounded-lg min-h-[70px] mt-2 ml-8 flex-grow">
                  <span className="font-semibold text-base pb-5">{comment.fullname}</span>
                  <p className="text-sm text-gray-800">{comment.content}</p>
                </div>
                {userId === comment.userId && (
                  <div className="trash-icon-container ml-auto ml-10">
                    <Popconfirm
                      placement="topRight"
                      title={`Xóa bình luận "${comment.content}"?`}
                      onConfirm={() => handleDeleteComment(comment._id as string)}
                      okText="Yes"
                      cancelText="No"
                      okButtonProps={{ style: { background: 'red' } }}
                    >
                      <Button>
                        <BsFillTrash3Fill />
                      </Button>
                    </Popconfirm>
                  </div>
                )}
              </div>
            </div>
          )
        ))
      ) : (
        <div>
          <p className="text-base text-gray-800">Chưa có bình luận nào được thêm</p>
        </div>
      )}
    </>
  );
};

export default Comment_Rely;
