import React from 'react';
import Image from './Image';
import Text from './Text';

const AdminDashboardCard = ({title , count, iconName , url ,height , width}) => {
  return (
    <div>
      <div className='w-[250px] h-[300px] bg-slate-500 border-3 rounded-lg flex flex-col transform transition duration-300 ease-in-out hover:scale-110'>
        <div className={`w-[${width}] h-[${height}] flex flex-col justify-center items-center mt-[50px]`} >
          <Image src={url} alt={iconName} height={height} width={width} />
        </div>
        <div className='flex flex-col items-center mt-5 font-semibold'>
          <Text content={title} size='25px' color="white" />
          <div className='mt-[10px] border-yellow-600 border-[5px] p-2 rounded-lg hover:border-green-400'>
            <Text content={count} size="30px" color="white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardCard
