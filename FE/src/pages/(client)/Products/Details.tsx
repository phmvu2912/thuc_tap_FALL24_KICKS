import { CarOutlined, HeartOutlined } from '@ant-design/icons'
import { Button, InputNumber, Rate } from 'antd'
import styles from './scss/details.module.scss'
import Card from '../../../components/(client)/Card/Card'
import { useState } from 'react'

const Details = () => {
    const [activeItem, setActiveItem] = useState();

    const data = [
        { id: 1, name: 'San pham 1', thumbnail: 'https://picsum.photos/200/300?random=1', price: 100, originPrice: 199, rating: 4.5 },
        { id: 2, name: 'San pham 2', thumbnail: 'https://picsum.photos/200/300?random=2', price: 200, originPrice: 299, rating: 5 },
        { id: 3, name: 'San pham 3', thumbnail: 'https://picsum.photos/200/300?random=3', price: 300, originPrice: 399, rating: 3 },
        { id: 4, name: 'San pham 4', thumbnail: 'https://picsum.photos/200/300?random=4', price: 400, originPrice: 499, rating: 2 },
    ];

    // data fake
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500'];

    const sizes = [49, 50, 51, 52, 53, 54];

    const handleActive = (item: any) => {
        setActiveItem(item);
    };

    return (
        <div className='container mx-auto space-y-16'>
            <div className="flex items-start space-x-6 h-full">

                {/* Ảnh */}
                <div className="left flex w-[60%] space-x-4 h-full">
                    <div className="subImgs flex flex-col space-y-4">
                        <div className="img flex-1">
                            <img src="https://via.placeholder.com/500" alt="product" width={200} />
                        </div>
                        <div className="img flex-1">
                            <img src="https://via.placeholder.com/500" alt="product" width={200} />
                        </div>
                        <div className="img flex-1">
                            <img src="https://via.placeholder.com/500" alt="product" width={200} />
                        </div>
                        <div className="img flex-1">
                            <img src="https://via.placeholder.com/500" alt="product" width={200} />
                        </div>
                    </div>

                    <div className="mainImg w-full">
                        <img src="https://via.placeholder.com/500" alt="product" className='h-full w-full' />
                    </div>
                </div>

                {/* Thông tin sp */}
                <div className="right flex-1 h-[100%] space-y-8">
                    <div className="title">
                        <h5 className='font-bold text-3xl'>Havic HV G-92 Gamepad</h5>
                    </div>

                    {/* rating */}
                    <div className="rating flex items-center">
                        <Rate disabled defaultValue={4} />
                    </div>

                    {/* Price */}
                    <div className="price">
                        <span className='text-2xl font-semibold'>$ 100</span>
                    </div>

                    <hr />

                    {/* Colors */}
                    <div className="colors flex items-center space-x-4">
                        <h5 className='text-lg font-semibold'>Màu sắc: </h5>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                                {colors.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`color w-8 h-8 rounded-full cursor-pointer ${item} ${activeItem === item ? 'border-4 border-black' : ''}`}
                                        onClick={() => handleActive(item)}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sizes */}
                    <div className="sizes flex items-center space-x-4">
                        <h5 className='text-lg font-semibold'>Size: </h5>
                        <div className="flex items-center space-x-2">
                            {
                                sizes.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`size w-8 h-8 rounded-md border font-semibold flex justify-center items-center p-6 cursor-pointer 
                                        ${activeItem === item ? 'bg-[#DB4444] text-white' : ''}`}
                                        onClick={() => handleActive(item)}
                                    >
                                        {item}
                                    </div>
                                ))
                            }
                            {/* 
                            <div className="color w-8 h-8 rounded-md border flex justify-center items-center p-6 cursor-pointer">50</div>
                            <div className="color w-8 h-8 rounded-md border flex justify-center items-center p-6 cursor-pointer">51</div>
                            <div className="color w-8 h-8 rounded-md border flex justify-center items-center p-6 cursor-pointer">52</div>
                            <div className="color w-8 h-8 rounded-md border flex justify-center items-center p-6 cursor-pointer">53</div>
                            <div className="color w-8 h-8 rounded-md border flex justify-center items-center p-6 cursor-pointer">54</div> */}
                        </div>
                    </div>

                    {/* actions */}
                    <div className="actions flex gap-4">
                        <div className="flex-1 flex items-stretch gap-4">
                            <div className="w-full">
                                <InputNumber min={1} className='w-full h-full ' />
                            </div>
                            <div className="w-full">
                                <Button className='w-full h-full bg-[#DB4444] text-white font-semibold'>Mua ngay</Button>
                            </div>
                        </div>

                        <div className="">
                            <div className="color w-8 h-8 rounded-md border flex justify-center items-center p-6 cursor-pointer">
                                <HeartOutlined />
                            </div>
                        </div>
                    </div>

                    {/* services */}
                    <div className="services h-full ">
                        <div className="item border p-6 h-full flex items-center gap-4">
                            <CarOutlined />
                            <span>Miễn phí vận chuyển</span>
                        </div>
                        <div className="item border p-6 h-full flex items-center gap-4">
                            <CarOutlined />
                            <span>Miễn phí vận chuyển</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products */}
            <section>
                <div className="container mx-auto">

                    {/* New Products */}
                    <div className={`${styles['parent']}`}>
                        <div className={`${styles['heading']} py-2 my-4 font-semibold text-xl`} >
                            <h2>
                                Có thể bạn cũng thích
                            </h2>
                        </div>

                        <div className={`${styles['contentNewProducts']} flex justify-between items-start gap-4`}>
                            {
                                data.map((item, index) => (
                                    <Card props={item} key={index} />
                                ))
                            }
                        </div>

                        {/* View more */}
                        {/* <div className={`${styles['act']} flex justify-center my-4`}>
                            <button className={`${styles['btn']} px-6 py-2 rounded-md`}>
                                Xem thêm
                            </button>
                        </div> */}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Details