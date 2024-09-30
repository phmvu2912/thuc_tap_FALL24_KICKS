import { Link } from 'react-router-dom';
import styles from './notification.module.scss';

const Notification = () => {
    return (
        <>
            <div className={`${styles['parent']} py-3 `}>
                <div className={`${styles['content']} container mx-auto flex items-center justify-between `}>
                    <p className='space-x-2'>
                        <span>
                            Khuyến mãi đợt hè đang diễn ra - Giảm tối đa 50%
                        </span>

                        <Link to={''} className='underline'>Xem chi tiết</Link>
                    </p>

                    {/* Đóng noti */}
                    <div className="">
                        X
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification