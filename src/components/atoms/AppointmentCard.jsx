import React, { useState } from 'react';
import { ImageUrls } from '../../constants';
import Image from './Image';
import Text from './Text';

const AppointmentCard = () => {
    const [ImageUrl , setImageUrl] = useState(ImageUrls.user)
  return (
    <div className='z-0 mt-5 ml-5'>
      <div className='w-[350px] h-[180px] bg-red-300 rounded-[15px] p-2'>
        <div className='flex items-center w-full gap-8 ml-4 h-3/4'>
            <div className=''>
                <Image src={ImageUrl} style={`flex items-center w-[100px] h-[100px] border-none bg-cover rounded-full transform transform transition duration-300 ease-in-out hover:scale-105`} />
            </div>
            <div className='text-[18px] font-semibold'>
                <div>
                    <Text content={`Date:`} />
                </div>
                <div>
                    <Text content={`Time:`} />
                </div>
            </div>
        </div>
        <div className='ml-4 text-[18px] font-semibold'>
            <Text content={`Doctor: `} />
        </div>

      </div>
    </div>
  )
}

export default AppointmentCard
