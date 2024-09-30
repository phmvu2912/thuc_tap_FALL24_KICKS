import { Rate } from 'antd'

// css
import styles from './card.module.scss'

// định dạng dữ liệu cho props
type Props = {
    props: any
}

const Card = ({ props }: Props) => {
    return (
        <>
            <div className={`${styles['parent']}`}>
                <div className={`${styles['img']}`}>
                    <img src={props.thumbnail} alt={props.name} />

                    {/* Hover */}
                    <div className={`${styles['act']}`} onClick={() => alert('Thêm thành công')}>
                        Thêm vào giỏ hàng
                    </div>
                </div>

                <div className={`${styles['info']} space-y-2 py-2`}>
                    <div className={`${styles['title']}`}>
                        <p>{props.name}</p>
                    </div>

                    <div className={`${styles['prices']} flex items-center space-x-3`}>
                        <div className={`${styles['sale']}`}>
                            $ {props.price}
                        </div>

                        <div className={`${styles['origin']}`}>
                            $ {props.originPrice}
                        </div>
                    </div>

                    <div className={`${styles['rating']} flex items-center`}>
                        <div className="">
                            <Rate disabled defaultValue={props.rating} />
                        </div>

                        {/* <span className='py-03'>
                            ({props.rating})
                        </span> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card