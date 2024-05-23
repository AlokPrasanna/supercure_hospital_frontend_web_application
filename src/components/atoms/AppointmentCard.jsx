import React, { useState } from 'react';
import { ImageUrls } from '../../constants';
import Image from './Image';
import Text from './Text';

const AppointmentCard = ({doctorName , patientName , date , time , userType , status , image}) => {
    const Name = userType === "Doctor" ? doctorName : userType === "Patient" ? patientName : "Unknown";

    const appointmentTime  = time.split(" - ")[1];
    const getBackgroundColorClass = () => {
      const appointmentDateTime = new Date(`${date} ${appointmentTime}`);
      const currentDateTime = new Date();

      if (status === "Cansel") {
          return 'bg-yellow-300';
      } else if (appointmentDateTime < currentDateTime) {
          return 'bg-red-300';
      } else {
          return 'bg-green-300';
      }
    };

    const backgroundColorClass = getBackgroundColorClass();
  return (
    <div className='z-0 mt-5 duration-300 ml-7 hover:scale-105'>
      <div className={`max-w-[400px] min-w-[380px] h-[180px] rounded-[15px] p-2 ${backgroundColorClass}`}>
        <div className='flex items-center justify-between w-[90%] ml-4 gap-9 h-3/4'>
            <div className=''>
                <Image src={image ? image : ImageUrls.user} style={`flex items-center w-[100px] h-[100px] border-none bg-cover rounded-full transform transform transition duration-300 ease-in-out hover:scale-105`} />
            </div>
            <div className='text-[1rem] font-semibold'>
                <div>
                    <Text content={`Date: ${date}`} />
                </div>
                <div>
                    <Text content={`Time: ${time}`} />
                </div>
            </div>
        </div>
        <div className='ml-4 text-[1rem] font-semibold w-[90%]'>
            <Text content={`${userType}: ${Name}`} />
        </div>

      </div>
    </div>
  )
}

export default AppointmentCard
