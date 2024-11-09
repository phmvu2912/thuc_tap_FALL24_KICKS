import { CarOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Carousel, message, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { TProduct, TVariants } from '../../../interfaces/product'
import { getProductById } from '../../../services/product'
import styles from './scss/details.module.scss'

const Details = () => {

    const { id } = useParams();

    const { register, handleSubmit, reset, setValue } = useForm<TProduct>();

    const [activeItem, setActiveItem] = useState();

    const [productPresent, setProductPresent] = useState<TVariants>();

    const [imgPresent, setImgPresent] = useState<string>();

    const [quantity, setQuantity] = useState(1)

    const { data, isError, error, isFetching, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: () => getProductById(id)
    })

    const product = data?.data?.data;
    const variants = product?.variants;

    // Mặc định khi render lại thì mặc định set biến thể đầu tiên trong mảng để hiển thị
    useEffect(() => {
        if (variants?.length > 0) {
            setProductPresent(variants[0]); // Cập nhật khi variants thay đổi
            setImgPresent(variants[0]?.thumbnail); // Cập nhật khi variants thay đổi
        }
    }, [variants]);

    const handleActive = (item: any) => {
        setActiveItem(item);
        setValue('size', item);
    };

    const handleChangeVariant = (indexChange: any) => {
        setProductPresent(variants[indexChange])
    }

    const handleChangeImg = (path: string) => {
        // console.log(path)
        setImgPresent(path)
    }

    const minusBtn = () => {
        if (quantity <= 1) {
            return message.error('Số lượng cần ít nhất là 1');
        }
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        setValue('quantity', newQuantity);  // Cập nhật vào React Hook Form
    };

    const plusBtn = () => {
        if (quantity >= productPresent?.stock) {
            return message.error('Số lượng bạn muốn không được phép vượt quá số lượng hàng trong kho!');
        }
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        setValue('quantity', newQuantity);  // Cập nhật vào React Hook Form
    };

    console.log(quantity)

    const onSubmit = (data: TProduct) => {

        if (!data.size) {
            return message.error('Vui lòng chọn một kích thước!');
        }

        console.log({
            ...data,
            title: product?.title,
            color: productPresent?.color,
            thumbnail: productPresent?.thumbnail,
            price: productPresent?.price
        })
    }

    if (isLoading && isFetching) return <p>Loading...</p>
    if (isError) return <p>Error: {error.message}</p>

    console.log("isLoading:", isLoading, "isFetching:", isFetching);


    return (
        <div className='container mx-auto my-20 space-y-16'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-start space-x-6 h-full">

                {/* Ảnh */}
                <div className="left flex w-[60%] space-x-4 h-full">
                    <div className={`${styles['subImgs']} flex flex-col space-y-4`}>
                        {
                            product?.variants?.map((variant: any, index: number) => (
                                <div className={`${styles['img']} flex-1`} key={index} onClick={() => handleChangeImg(variant.thumbnail)}>
                                    <img src={variant.thumbnail} alt="product" />
                                </div>
                            ))
                        }
                    </div>

                    <div className={`${styles['mainImg']} w-full`}>
                        {
                            isFetching ? (
                                <Spin tip="Loading" size='large' />
                            ) : (
                                <img src={imgPresent} alt="product" className='h-full' />
                            )
                        }


                    </div>
                </div>

                {/* Thông tin sp */}
                <div className="right flex-1 h-[100%] space-y-8">
                    <div className="title">
                        <h5 className='font-bold text-3xl'>{product.title}</h5>
                    </div>

                    {/* rating */}
                    <div className="rating flex items-center space-x-2">
                        {/* <Rate disabled defaultValue={4} /> */}
                        <span className='font-semibold'>Danh mục: </span>
                        <Link to={'/'} className='underline text-[#DB4444] font-medium'>{product.category.name}</Link>
                    </div>

                    {/* Stock */}
                    <div className="stock flex items-center space-x-2">
                        {/* <Rate disabled defaultValue={4} /> */}
                        <p className='font-semibold'>Màu hiện tại còn <span className='text-[#db4444] font-semibold'>{productPresent?.stock}</span> sản phẩm</p>
                    </div>

                    {/* Price */}
                    <div className="price">
                        <span className='text-2xl font-semibold'>$ {productPresent?.price}</span>
                    </div>

                    <hr />

                    {/* Colors */}
                    <div className="colors flex items-center space-x-4">
                        <h5 className='text-lg font-semibold'>Màu sắc: </h5>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                                {
                                    product?.variants.map((variant: any, index: number) => (
                                        <div
                                            key={index} // Key duy nhất cho mỗi biến thể
                                            className={`color w-8 h-8 rounded-full border cursor-pointer ${activeItem === variant.color ? 'border-4 border-black' : ''}`} // Nếu màu đang được chọn, thêm viền đen
                                            style={{ backgroundColor: variant.color }} // Sử dụng màu sắc từ `variant.color` làm màu nền
                                            onClick={() => handleChangeVariant(index)} // Gọi hàm để cập nhật màu được chọn
                                        >
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    {/* Sizes */}
                    <div className="sizes flex items-stretch space-x-4">
                        <h5 className="text-lg font-semibold pt-2">Size: </h5>
                        <div className="grid grid-cols-7 gap-2">
                            {product?.sizes.map((size, index) => (
                                <div
                                    key={index}
                                    className={`size w-8 h-8 rounded-md border font-semibold flex justify-center items-center p-6 cursor-pointer 
                    ${activeItem === size ? 'bg-[#DB4444] text-white' : ''}`}
                                    onClick={() => handleActive(size)}
                                >
                                    {size}
                                </div>
                            ))}
                            <input type="hidden" {...register('size')} /> {/* Input ẩn để lưu giá trị size */}
                        </div>
                    </div>

                    {/* actions */}
                    {/* <form className="actions flex gap-4"> */}
                    <div
                        className="actions flex gap-4"
                    >
                        <div className="flex-1 flex items-stretch gap-4">
                            <div className={`${styles['quantity']} w-full`}>

                                <input
                                    className='w-full h-full text-center font-semibold'
                                    value={quantity}
                                    {...register('quantity', { valueAsNumber: true })}
                                />

                                <div className={`${styles['changeQtt']}`}>
                                    <div className="" onClick={() => minusBtn()}>
                                        <MinusOutlined />
                                    </div>

                                    <div className="" onClick={() => plusBtn()}>
                                        <PlusOutlined />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <Button htmlType='submit' className='w-full h-full bg-[#DB4444] text-white font-semibold'>Mua ngay</Button>
                            </div>
                        </div>

                        <div className="">
                            <div
                                className="
                                    color
                                    w-8 
                                    h-8 
                                    rounded-md 
                                    border 
                                    flex 
                                    justify-center 
                                    items-center 
                                    p-6 
                                    cursor-pointer
                                    
                                    hover:bg-[#DB4444]
                                    hover:text-white
                                "
                            >
                                <ShoppingCartOutlined />
                            </div>
                        </div>
                    </div>

                    {/* services */}
                    <div className="services h-full ">
                        <div className="item border p-6 h-full flex items-center gap-4">
                            <CarOutlined />
                            <span>Miễn phí vận chuyển</span>
                        </div>
                    </div>
                </div>
            </form>

            {/* Description */}
            <div className="">
                <div className={`text-[#db4444] py-2 my-4 font-semibold text-xl`} >
                    <h2>
                        Mô tả sản phẩm
                    </h2>
                </div>

                <p className='text-justify'>{product?.description}</p>
            </div>

            {/* How to use true size */}

            <div className="">
                <div className={`text-[#db4444] py-2 my-4 font-semibold text-xl`} >

                    <h2>
                        Hướng dẫn chọn size
                    </h2>
                </div>

                <p className=''>
                    <Carousel arrows infinite={false}>

                        {/* <div className='bg-slate-400'>
                            <table width={'100%'}>
                                <tr>
                                    <th>US</th>
                                    <td>6.5</td>
                                    <td>7</td>
                                    <td>7.5</td>
                                    <td>8</td>
                                    <td>8.5</td>
                                    <td>9</td>
                                    <td>9.5</td>
                                    <td>10</td>
                                    <td>10.5</td>
                                    <td>11</td>
                                </tr>

                                <tr>
                                    <th>UK</th>
                                    <td>5.5</td>
                                    <td>6</td>
                                    <td>6.5</td>
                                    <td>7</td>
                                    <td>7.5</td>
                                    <td>8</td>
                                    <td>8.5</td>
                                    <td>9</td>
                                    <td>9.5</td>
                                    <td>10</td>
                                </tr>

                                <tr>
                                    <th>EU</th>
                                    <td>39</td>
                                    <td>39 2/3</td>
                                    <td>40 1/3</td>
                                    <td>41</td>
                                    <td>41 2/3</td>
                                    <td>42 1/3</td>
                                    <td>43</td>
                                    <td>43 2/3</td>
                                    <td>44 1/3</td>
                                    <td>45</td>
                                </tr>
                                <tr>
                                    <th>CM</th>
                                    <td>24</td>
                                    <td>24.5</td>
                                    <td>25</td>
                                    <td>25.5</td>
                                    <td>26</td>
                                    <td>26.5</td>
                                    <td>27</td>
                                    <td>27.5</td>
                                    <td>28</td>
                                    <td>28.5</td>
                                </tr>
                            </table>
                        </div>

                        <div className="">23</div> */}
                    </Carousel>
                </p>
            </div>

            {/* Products */}
            <section>
                <div className="container mx-auto">

                    <div className={`${styles['parent']}`}>
                        <div className={`${styles['heading']} py-2 my-4 font-semibold text-xl`} >
                            <h2>
                                Có thể bạn cũng thích
                            </h2>
                        </div>

                        <div className={`${styles['contentNewProducts']} flex justify-between items-start gap-4`}>
                            {/* {
                                data.map((item, index) => (
                                    <Card props={item} key={index} />
                                ))
                            } */}
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