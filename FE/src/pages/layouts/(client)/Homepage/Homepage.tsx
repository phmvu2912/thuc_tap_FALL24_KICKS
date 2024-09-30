import { Link } from "react-router-dom"
import Card from "../../../../components/(client)/Card/Card"
import Header from "../../../../components/(client)/Header/HeaderClient"

// css
import styles from './homepage.module.scss'

const Homepage = () => {

    const data = [
        { id: 1, name: 'San pham 1', thumbnail: 'https://picsum.photos/200/300?random=1', price: 100, originPrice: 199, rating: 4.5 },
        { id: 2, name: 'San pham 2', thumbnail: 'https://picsum.photos/200/300?random=2', price: 200, originPrice: 299, rating: 5 },
        { id: 3, name: 'San pham 3', thumbnail: 'https://picsum.photos/200/300?random=3', price: 300, originPrice: 399, rating: 3 },
        { id: 4, name: 'San pham 4', thumbnail: 'https://picsum.photos/200/300?random=4', price: 400, originPrice: 499, rating: 2 },
    ]

    return (
        <>
            <section>
                <div className="container mx-auto">

                    {/* New Products */}
                    <div className={`${styles['parent']}`}>
                        <div className={`${styles['heading']} py-2 my-4 font-semibold text-xl`} >
                            <h2>
                                Sản phẩm mới
                            </h2>
                        </div>

                        <div className={`${styles['contentNewProducts']} flex justify-between items-start`}>
                            {
                                data.map((item, index) => (
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
        </>
    )
}

export default Homepage