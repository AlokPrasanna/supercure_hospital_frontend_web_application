import React from 'react';
import Icon from './Icon';

const SpecializedFieldCard = ({text , onClickFunc}) => {
  return (
    <div className='flex gap-3 max-w-[500px] w-fit py-2 px-3 bg-blue-900 text-white rounded-md'>
      <span>{text}</span>
      <sup className='font-semibold text-red-500 duration-200 ease-in-out transform hover:scale-125' onClick={onClickFunc}>
        <Icon type="regular" name="x" color="red"  size="20px" />
      </sup>
    </div>
  )
}

export default SpecializedFieldCard
