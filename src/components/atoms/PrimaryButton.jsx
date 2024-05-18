import React from 'react'
import { Colors } from '../../constants';

const PrimaryButton = ({buttonTitle , buttonType , buttonColor , onClickFunc}) => {
  return (
    <div className='mt-2'>
      <button
        className='p-3 text-[18px] rounded-[10px] w-[120px]'
        style={{
          color:Colors.white,
          borderColor:buttonColor,
          backgroundColor:buttonColor
        }}
        type={buttonType}
        onClick={onClickFunc}
      >{buttonTitle}</button>
    </div>
  )
}

export default PrimaryButton;
