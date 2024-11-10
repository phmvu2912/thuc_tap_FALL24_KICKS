import { DeleteFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Image, Table } from "antd";
import { getCartById } from "../../../services/cart";
import { render } from "sass";

const Cart = () => {

    // Lấy id user ở session
    const userSession = sessionStorage.getItem('userInfo');

    const user = userSession ? JSON.parse(userSession) : null;

    // console.log(user?.user?._id);

    const { data, isError, error, isFetching, isLoading } = useQuery({
        queryKey: ['carts'],
        queryFn: () => getCartById(user?.user?._id)
    })

    // console.log(data?.data?.cart)

    const dataSource = data?.data?.cart?.items.map((item: any, index: number) => (
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
            // dataIndex: 'quantity',
            // key: 'quantity',
            render: (_: any, item: any) => (
                <form className="">
                    <input type="number" defaultValue={item.quantity}/>
                </form>
            ),
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
                        <h3 className="text-2xl font-bold text-[#db4444]">Giỏ hàng [{dataSource?.length}]</h3>
                    </div>

                    <div className="content py-6 flex gap-6">
                        <div className="w-[70%]">
                            <Table columns={columns} dataSource={dataSource} className="w-full" pagination={false} />
                        </div>

                        <div className="border rounded-md w-[30%] p-3 h-[300px] flex flex-col justify-between">
                            <div className="">
                                <div className="font-semibold">
                                    Thanh toán: {dataSource?.length} sản phẩm
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="">
                                    <p className="text-lg font-semibold">Tổng tiền: <span className="text-[#db4444]">{data?.data?.cart?.totalPrice} $</span></p>
                                </div>

                                <div className="checkout w-full bg-[#db4444] text-center p-2 rounded-md text-white">
                                    Mua ngay
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart