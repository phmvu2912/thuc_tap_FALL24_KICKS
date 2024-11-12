import { DeleteFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Image, Input, Table } from "antd";
import { useState } from "react";
import { getCartById } from "../../../services/cart";

const Cart = () => {

    const [showInput, setShowInput] = useState(false)

    // Lấy id user ở session
    const userSession = sessionStorage.getItem('userInfo');

    const user = userSession ? JSON.parse(userSession) : null;

    // console.log(user?.user?._id);

    const { data, isError, error, isFetching, isLoading } = useQuery({
        queryKey: ['carts'],
        queryFn: () => getCartById(user?.user?._id)
    })

    console.log(data?.data?.cart)

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
                        width={120}
                        height={120}
                        src={item.thumbnail}
                    />
                </div>
            ),
            align: 'center' as const
        },
        {
            title: 'Số lượng',
            render: (_: any, item: any) => (
                <form className="">
                    <input type="number" defaultValue={item.quantity} className="w-[100px] text-center" />
                </form>
            ),
            align: 'center' as const,
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
            minWidth: 200
        },
        {
            title: 'Tổng tiền',
            render: (_: any, item: any) => (
                <div>
                    <p>$ {item.price * item.quantity}</p>
                </div>
            ),
            align: 'center' as const,
            minWidth: 100
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

    if (isLoading && isFetching) return <p>Loading...</p>
    if (isError) return <p>Error: {error.message}</p>

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

                        <div className="border rounded-md w-[30%] p-3 h-auto flex flex-col justify-between">
                            <div className="">
                                <div className="font-semibold text-lg">
                                    Thanh toán: {dataSource?.length} sản phẩm
                                </div>

                                <div className="space-y-2">
                                    <h5 className="font-semibold">Thông tin đặt hàng:</h5>


                                    {
                                        showInput ? (
                                            <div className="space-y-3">
                                                <p>
                                                    <Input placeholder="Nhập tên người nhận" />
                                                </p>

                                                <p>
                                                    <Input placeholder="Nhập số điện thoại" />
                                                </p>

                                                <p>
                                                    <Input placeholder="Nhập địa chỉ nhận hàng" />
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">

                                                <p className="font-semibold">Tên người nhận: <span className="font-normal">Phạm Đào Vũ</span></p>

                                                <p className="font-semibold">Số điện thoại: <span className="font-normal">0987654321</span></p>

                                                <p className="font-semibold">Địa chỉ: <span className="font-normal">Hà Nội - Việt Nam</span></p>

                                            </div>
                                        )
                                    }

                                    <div className="flex items-center gap-3">
                                        {
                                            showInput ? (
                                                <span
                                                    className="text-black text-sm font-semibold cursor-pointer"
                                                    onClick={() => setShowInput(false)}
                                                >
                                                    Hủy thay đổi
                                                </span>
                                            ) : (
                                                <span
                                                    className="text-sm underline text-[#db4444] font-semibold cursor-pointer"
                                                    onClick={() => setShowInput(true)}
                                                >
                                                    Thay đổi địa chỉ nhận hàng
                                                </span>
                                            )
                                        }
                                    </div>
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