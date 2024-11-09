import { PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, message, Modal, Table } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, removeProductById } from '../../../../services/product';
import './list.scss';
import { TProduct } from '../../../../interfaces/product';
const Products_List = () => {

    const queryClient = useQueryClient();

    const [ellipsis, setEllipsis] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const { data, isError, error, isLoading, isFetching } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts()
    });

    const { mutate } = useMutation({
        mutationFn: async (id: string) => {
            try {
                await removeProductById(id)
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
                queryKey: ['products']
            });
        }
    })

    const products = data?.data?.data;

    //! Delete
    const handleRemove = (item: TProduct) => {
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

    const dataTable: any[] = products?.map((item: any, index: number) => (
        {
            key: index + 1,
            ...item
        }
    ));

    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            align: 'center' as const
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'title',
            key: 'title',
            className: 'table-cell-ellipsis'
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            className: 'table-cell-ellipsis'

        },
        {
            title: 'Tools',
            render: ((_: any, item: any) => (
                <div className="space-x-4">

                    {/* edit */}
                    <Link
                        to={`/admin/product/update/${item._id}`}
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

                    {/* detail */}
                    <Button
                        className='btn bg-yellow-500 py-1 px-4 rounded-md text-whit w-16'
                        onClick={() => setModalOpen(true)}
                    >
                        Chi tiết
                    </Button>
                    <Modal
                        title={<p className='text-center'>Chi tiết sản phẩm</p>}
                        centered
                        open={modalOpen}
                        onCancel={() => setModalOpen(false)}
                        width={1000}
                        footer={null}
                    >
                        <div className='space-y-4'>
                            {/* Tên sp */}
                            <p><span className='font-semibold'>Tên sản phẩm:</span> {item.title}</p>
                            <p><span className='font-semibold'>Danh mục:</span> {item?.category?.name}</p>
                            {/* Mô tả */}
                            <div className="">
                                <span className='font-semibold'>Mô tả:</span>

                                <Paragraph ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'Xem thêm' } : false} className='text-justify'>
                                    {item.description}
                                </Paragraph>
                            </div>

                            {/* Màu sắc*/}
                            <div className="">
                                <span className='font-semibold'>Màu sắc:</span>
                                <div className='flex space-x-2'> {/* Thêm flex để căn chỉnh các vòng tròn */}
                                    {item.variants.map((variant: any, index: number) => (
                                        <span
                                            key={index}
                                            className='inline-block w-6 h-6 rounded-full border' // Thay đổi kích thước và thêm border-radius
                                            style={{ backgroundColor: variant.color }} // Sử dụng inline style
                                        >
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Số lượng còn lại */}
                            <div className="">
                                <span className='font-semibold'>Số lượng còn lại: </span>

                                {
                                    item.variants.reduce((accumulator: any, variant: any) => {
                                        return accumulator + variant.stock;
                                    }, 0)
                                }
                            </div>

                            {/* Giá */}
                        </div>
                    </Modal>
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
                <h5 className='font-semibold text-lg'>Danh sách sản phẩm</h5>

                <Link to={'/admin/product/create'} className='flex items-center gap-2 btn bg-blue-200 py-1 px-4 rounded-md hover:text-white hover:bg-slate-500'>
                    <PlusOutlined />
                    Thêm mới
                </Link>
            </div>

            <div className="content py-6">
                <Table dataSource={dataTable} columns={columns} />
            </div>
        </>
    )
}

export default Products_List