import React from 'react'
import Lable from './Lable'
import Icon from './Icon'
import Text from './Text'
import { Colors } from '../../constants'

const DoctorDetailsCard = ({name, degree = [], specialties = [] , onClickFunc}) => {
  return (
    <div className='fixed w-1/3 max-h-[80vh] min-h-[390px] overflow-y-auto bg-slate-50 py-2 px-3 rounded-md'>
      <sup className='flex items-center justify-end mt-2 font-semibold'>
        <div className='w-[30px] h-[30px] rounded-md bg-red-600 hover:scale-110 duration-300'>
            <Icon 
                type="regular" 
                name="x" 
                color={Colors.white} 
                size="30px" 
                border="square" 
                onClickFunc={onClickFunc}
            />
        </div>
      </sup>
      <div className='px-2 mt-3'>
        <Lable lableName="Name"/>
        <div className='ml-6'>
            <Text content={`Dr. ${name}`} />
        </div>
        <div className='mt-5'>
            <Lable lableName="Academic Details" />
            {degree.length > 0 && degree.map(deg => (
                <div className='ml-6'>
                    <Text content={deg} />
                </div>
            ))}
        </div>
        <div className='mt-5'>
            <Lable lableName="Specialties" />
            {specialties.length > 0 && specialties.map(spe => (
                <div className='ml-6'>
                    <Text content={spe} />
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDetailsCard
