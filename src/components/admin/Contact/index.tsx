import { IContact } from '../../../interfaces/contact';
import React from 'react'
import { Table, Button, Skeleton, Popconfirm, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { useGetContactsQuery, useRemoveContactMutation } from '../../../api/contact';


const AdminContact = () => {
    const { data: contactData, error, isLoading } = useGetContactsQuery();
    const [removeContact, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveContactMutation();

    const confirm = (id: any) => {
        removeContact(id);
    };
    const dataSource = contactData?.data?.map((contact: IContact) => ({
        key: contact._id,
        firstName: contact.firstName,
        email: contact.email,
        phone: contact.phone,
        content: contact.content,
    }));
    console.log(contactData)

    const columns = [
        {
            title: "Tên",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "",
            render: ({ key: _id }: any) => {
                return (
                    <>
                        <div className="space-x-2">
                            <Popconfirm
                                title="Bạn có muốn xóa"
                                onConfirm={() => confirm(_id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type='primary' danger className='bg-red-600'>
                                    <AiTwotoneDelete />
                                </Button>
                            </Popconfirm>

                            <Button type='primary' className='bg-blue-600'>
                                <Link to={`/admin/contact/${_id}/edit`}><AiTwotoneEdit /></Link>

                            </Button>
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý contact</h2>
            </header>
            {isRemoveSuccess && <Alert message="Xóa thành công" type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};

export default AdminContact;