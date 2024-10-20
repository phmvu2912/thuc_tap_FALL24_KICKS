import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../../../services/products/getProducts';
import './list.scss'
import Paragraph from 'antd/es/typography/Paragraph';
const Products_List = () => {

  // const queryClient = useQueryClient();
  const [ellipsis, setEllipsis] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts()
  })

  const products = data?.data?.data;

  //test
  // const qtt = [10, 20, 30, 40];

  // let a = 0;

  // for (let kq of qtt) {
  //   a += kq;
  // }
  // console.log(a);

  let stock = 0;


  const abc = products?.map((item: any) => (
    item.variants.map((variant: any) => (
      variant.stock
    ))
  ))

  console.log(abc)

  // console.log(products)

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
      title: 'Tên sản phẩm',
      dataIndex: 'title',
      key: 'title',
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
            to={`/admin/product/edit/${item._id}`}
          >
            <Button className='btn bg-red-200 py-1 px-4 rounded-md hover:text-white hover:bg-slate-500 w-16'>
              Sửa
            </Button>
          </Link>
          {/* delete */}
          <Button className='btn bg-red-200 py-1 px-4 rounded-md hover:text-white hover:bg-slate-500 w-16'>Xóa</Button>
          {/* detail */}
          <Button
            className='btn bg-red-200 py-1 px-4 rounded-md hover:text-white hover:bg-slate-500 w-16'
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
              <p><span className='font-semibold'>Danh mục:</span> {item.category.name}</p>
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