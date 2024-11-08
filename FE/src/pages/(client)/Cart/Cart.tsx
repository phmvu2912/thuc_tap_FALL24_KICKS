import { DeleteFilled } from "@ant-design/icons";
import { Button, Image, Table } from "antd";

const Cart = () => {

    const dataSource = [
        {
            key: '1',
            title: 'San pham 1',
            thumbnail: 'https://picsum.photos/id/237/300/200',
            quantity: 1,
            size: '49',
            color: '#fff',
            price: 8000
        },
        {
            key: '2',
            title: 'San pham 2',
            thumbnail: 'https://picsum.photos/id/238/300/200',
            quantity: 2,
            size: '49',
            color: '#fff',
            price: 5000
        },
    ];

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
        },
        {
            title: 'Ảnh',
            render: (_: any, item: any) => (
                <div>
                    <Image
                        width={100}
                        src={item.thumbnail}
                    />
                </div>
            ),
            align: 'center' as const
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            // render: (_: any, item: any) => (
            //     <div>
            //         <InputNumber value={item.quantity}/>
            //     </div>
            // ),
            align: 'center' as const
        },
        {
            title: 'Phân loại',
            // dataIndex: 'address',
            // key: 'address',
            render: (_: any, item: any) => (
                <div className="">
                    <p>Size: <span className="font-semibold">{item.size}</span></p>
                    <p>Màu sắc: <span className="font-semibold">{item.color}</span></p>

                </div>
            ),
        },
        {
            title: 'Tổng tiền',
            // dataIndex: 'quantity',
            // key: 'quantity',
            render: (_: any, item: any) => (
                <div>
                    <p>$ {item.price * item.quantity}</p>
                </div>
            ),
            align: 'center' as const
        },
        {
            title: 'Tools',
            render: ((_: any, item: any) => (
                <div className="space-x-4">
                    {/* delete */}
                    <Button
                        className='btn bg-red-500 py-1 px-4 rounded-md text-white w-16'
                        // onClick={() => handleRemove(item)}
                        icon={<DeleteFilled />}
                    />
                </div>
            )),
            align: 'center' as const
        },
    ];

    return (
        <>

            <div className="container mx-auto my-20">
                <div className="">
                    <div className="heading">
                        <h3 className="text-2xl font-bold text-[#db4444]">Giỏ hàng [{dataSource.length}]</h3>
                    </div>

                    <div className="content py-6 ">
                        <Table columns={columns} dataSource={dataSource} className="w-full" pagination={false} />
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0  w-full ">
                <div className="flex w-full h-full">
                    <div className="bg-[#d3d3d3] w-[80%] py-8 px-4">
                        abc
                    </div>
                    <div className="bg-[#db4444] w-[20%] h-full my-auto py-8 px-4">
                        <p className="font-semibold">Tổng tiền:  
                            {
                                dataSource?.map(item => item.price * item.quantity).reduce((a, b) => a + b, 0)
                            }
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart