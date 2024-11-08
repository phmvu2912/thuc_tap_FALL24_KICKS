import { Link } from "react-router-dom"

// css
import styles from './homepage.module.scss'
import Slider from "../../../components/(client)/Slider/Slider"
import Card from "../../../components/(client)/Card/Card"
import { serviceImg, serviceImg2, serviceImg3 } from "../../../constants/client"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../../services/product"

const Homepage = () => {


    const {data: products, isError, error, isFetching, isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts()
    })

    // console.log(products?.data?.data)

    if(isLoading && isFetching) return <p>Loading...</p>
    if(isError) return <p>Error: {error.message}</p>

    return (
        <div className="">
            {/* Carousel */}
            <section className="">
                <Slider />
            </section>

            {/* Products */}
            <section>
                <div className="container mx-auto">

                    {/* New Products */}
                    <div className={`${styles['parent']}`}>
                        <div className={`${styles['heading']} py-2 my-4 font-semibold text-xl`} >
                            <h2>
                                Sản phẩm mới
                            </h2>
                        </div>

                        <div className={`${styles['contentNewProducts']} grid grid-cols-4 gap-4 justify-between`}>
                            {
                                products?.data?.data?.map((item: any, index: number) => (
                                    <Card props={item} key={index} />
                                ))
                            }
                        </div>

                        {/* View more */}
                        <div className={`${styles['act']} flex justify-center my-4`}>
                            <button className={`${styles['btn']} px-6 py-2 rounded-md`}>
                                Xem thêm
                            </button>
                        </div>
                    </div>

                    <div className="container mx-auto my-6">
                        <hr />
                    </div>


                </div>
            </section>

            {/* Categories */}
            <section>
                <div className="container mx-auto">
                    {/* Categories */}
                    <div className={`${styles['parent']}`}>
                        <div className={`${styles['heading']} py-2 my-4 font-semibold text-xl`} >
                            <h2>
                                Danh mục
                            </h2>
                        </div>

                        <div className={`${styles['contentCategory']} flex justify-between items-start space-x-6`}>
                            <Link to={''} className={`${styles['item']} `}>
                                Sneaker
                            </Link>

                            <Link to={''} className={`${styles['item']} `}>
                                Chạy bộ
                            </Link>

                            <Link to={''} className={`${styles['item']} `}>
                                Dành cho Nam
                            </Link>

                            <Link to={''} className={`${styles['item']} `}>
                                Dành cho Nữ
                            </Link>

                        </div>

                        {/* View more */}
                        <div className={`${styles['act']} flex justify-center my-4`}>
                            <button className={`${styles['btn']} px-6 py-2 rounded-md`}>
                                Xem thêm
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="container mx-auto my-10">
                <div className="flex justify-evenly">
                    <div className="flex-1 flex flex-col items-center space-y-3">
                        <img src={serviceImg} alt="" />

                        <div className="text-center">
                            <h5 className="font-bold text-xl">Miễn phí vận chuyển</h5>
                            <p>Miễn phí vận chuyển cho tổng hóa đơn trên 1 triêu</p>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center space-y-3">
                        <img src={serviceImg2} alt="" />
                        <div className="text-center">
                            <h5 className="font-bold text-xl">Hỗ trợ 24/7</h5>
                            <p>Hỗ trợ thân thiện 24/7</p>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center space-y-3">
                        <img src={serviceImg3} alt="" />
                        <div className="text-center">
                            <h5 className="font-bold text-xl">Hoàn trả miễn phí</h5>
                            <p>Hỗ trợ hoàn trả trong vòng 15 ngày</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Homepage