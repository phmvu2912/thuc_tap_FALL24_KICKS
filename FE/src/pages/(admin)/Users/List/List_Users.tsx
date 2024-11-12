import { PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, message, Modal, Table } from 'antd';
import { Link } from 'react-router-dom';
import { removeCategoryById } from '../../../../services/category';
import { getUsers } from '../../../../services/user';
import './list.scss';

const List_Users = () => {

    const queryClient = useQueryClient();

    const { data, isError, error, isLoading, isFetching } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers()
    })

    const users = data?.data?.data;

    // console.log(users)

    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            try {
                await removeCategoryById(id)
            } catch (error) {
                console.log(error)
            }
        },
        onError: (error) => {
            console.log(error)
            message.error('Xóa thất bại');
        }, 
        onSuccess: () => {
            message.success('Xóa thành công!');
            
            queryClient.invalidateQueries({
                queryKey: ['categories']
            });
        }
    })

    const dataTable: any[] = users?.map((item: any, index: number) => (
        {
            key: index + 1,
            ...item
        }
    ));

    //! Delete
    const handleRemove = (item: any) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa bản ghi này?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            centered: true,
            onOk() {
                mutate(item._id);
            },
            onCancel() {
                console.log('Đã hủy');
            },
        });
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            align: 'center' as const
        },
        {
            title: 'Tên đầy đủ',
            dataIndex: 'username',
            key: 'username',
            className: 'table-cell-ellipsis'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            // dataIndex: 'phoneNumber',
            // key: 'phoneNumber',
            render: (_: any, item: any) => (
                <div className="">
                    {item.phoneNumber ? item.phoneNumber : 'Chưa cập nhật'}
                </div>
            ),
            align: 'center' as const
        },
        {
            title: 'Địa chỉ',
            render: (_: any, item: any) => (
                <div className="">
                    {item.address ? item.address : 'Chưa cập nhật'}
                </div>
            )
        },
        {
            title: 'Chức vụ',
            // dataIndex: 'phoneNumber',
            // key: 'phoneNumber',
            render: (_: any, item: any) => (
                <div className="">
                    {item.role}
                </div>
            ),
            align: 'center' as const
        },
        {
            title: 'Tools',
            render: ((_: any, item: any) => (
                <div className="space-x-4">

                    {/* edit */}
                    <Link
                        to={`/admin/user/update/${item._id}`}
                    >
                        <Button type='primary' className='btn py-1 px-4 rounded-md hover:text-white hover:bg-slate-500 w-16'>
                            Sửa
                        </Button>
                    </Link>

                    {/* delete */}
                    <Button
                        className='btn bg-red-500 py-1 px-4 rounded-md text-white w-16'
                        onClick={() => handleRemove(item)}
                    >
                        Xóa
                    </Button>
                </div>
            )),
            align: 'center' as const
        },
    ];

    if (isLoading && isFetching) return <p>Loading...</p>
    if (isError) return <p>Error: {error.message}</p>

    return (
        <>
            <div className="heading flex justify-between items-center">
                <h5 className='font-semibold text-lg'>Danh sách người dùng</h5>

                {/* <Link to={'/admin/category/create'} className='flex items-center gap-2 btn bg-blue-200 py-1 px-4 rounded-md hover:text-white hover:bg-slate-500'>
                    <PlusOutlined />
                    Thêm mới
                </Link> */}
            </div>

            <div className="content py-6">
                <Table dataSource={dataTable} columns={columns} />
            </div>
        </>
    )
}

export default List_Users