import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { getCategories } from '../../../../services/category';
import './list.scss';

const Categories_List = () => {

    // const queryClient = useQueryClient();

    const { data, isError, error, isLoading, isFetching } = useQuery({
        queryKey: ['categories'],
        queryFn: () => getCategories()
    })

    const categories = data?.data?.data;

    console.log(categories)

    const dataTable: any[] = categories?.map((item: any, index: number) => (
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
            dataIndex: 'name',
            key: 'name',
            className: 'table-cell-ellipsis'
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Tools',
            render: ((_: any, item: any) => (
                <div className="space-x-4">

                    {/* edit */}
                    <Link
                        to={`/admin/product/update/${item._id}`}
                    >
                        <Button className='btn bg-red-200 py-1 px-4 rounded-md hover:text-white hover:bg-slate-500 w-16'>
                            Sửa
                        </Button>
                    </Link>
                    {/* delete */}
                    <Button className='btn bg-red-200 py-1 px-4 rounded-md hover:text-white hover:bg-slate-500 w-16'>Xóa</Button>
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
                <h5 className='font-semibold text-lg'>Danh sách danh mục</h5>

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

export default Categories_List