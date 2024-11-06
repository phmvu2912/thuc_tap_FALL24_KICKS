import { Carousel } from 'antd';
import banner4 from '../../../../public/images/banner_5.jpg';
import banner5 from '../../../../public/images/banner_6.jpg';
import banner6 from '../../../../public/images/banner_7.jpg';


const Slider = () => {

    return (
        <>
            <Carousel autoplay>
                <div className='w-full h-[520px] overflow-hidden bg-[#d9d9d9]'>
                    <img src={banner4} className='object-cover w-full h-full'/>
                </div>
                <div className='w-full h-[520px] overflow-hidden bg-[#db4444]'>
                    <img src={banner5} className='object-cover w-full h-full'/>
                </div>
                <div className='w-full h-[520px] overflow-hidden bg-[#db4444]'>
                    <img src={banner6} className='object-cover w-full h-full'/>
                </div>
            </Carousel>
        </>
    )
}

export default Slider