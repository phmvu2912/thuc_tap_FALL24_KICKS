import { useState } from 'react';
import styles from './notification.module.scss';

const Notification = () => {

    const [visible, setVisable] = useState<boolean>(false)

    const handleClick = () => {
        setVisable(true)
    }

    // console.log(visible)

    return (
        <>
            <div className={`${styles['parent']} py-3 ${visible && 'hidden'}`}>
                <div className={`${styles['content']} container mx-auto flex items-center justify-between `}>
                    <p className='space-x-2'>
                        <span className=''>
                            Khuyến mãi đợt hè đang diễn ra - Giảm tối đa 50%
                        </span>

                        <b className={`cursor-pointer hover:underline`} onClick={handleClick}>Ẩn thông báo</b>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Notification