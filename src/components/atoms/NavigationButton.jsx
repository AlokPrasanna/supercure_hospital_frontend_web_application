import React from 'react';
import { Link } from 'react-router-dom';
import { Colors } from '../../constants';


const NavigationButton = ({buttonType , buttonName , buttonColor , path , width , size , style }) => {
  const Style = style ? style : " ";
  const Width = width ? `w-[${width}]` : `w-[580px]`;
  const FontSize = size ? `${size}` : `text-[19px]`;
  return (
    <div>
      <Link to={path}>
        <button
            className={`p-2 ${Style} ${Width} ${FontSize} rounded-md`}
            style={{
            borderColor:buttonColor,
            backgroundColor:buttonColor
            }}
            type={buttonType}
        >{buttonName}</button>
      </Link>
    </div>
  )
}

export default NavigationButton;
