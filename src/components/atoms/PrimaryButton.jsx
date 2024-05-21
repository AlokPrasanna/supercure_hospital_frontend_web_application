import React from 'react'
import { Colors } from '../../constants';

const PrimaryButton = ({buttonTitle , buttonType , buttonColor , onClickFunc , height , width , style}) => {
  const Height = height ? height : '';
  const Width = width ? width : "200px";
  const Style = style ? style : '';
  return (
    <div className=''>
      <button
        className={`px-3 py-2 text-[1rem] rounded-[10px] ${Style}`} 
        style={{
          color:Colors.white,
          borderColor:buttonColor,
          backgroundColor:buttonColor,
          height:`${Height}`,
          width:Width
        }}
        type={buttonType}
        onClick={onClickFunc}
      >{buttonTitle}</button>
    </div>
  )
}

export default PrimaryButton;
