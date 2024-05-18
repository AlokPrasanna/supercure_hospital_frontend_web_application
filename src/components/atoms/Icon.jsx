import React from 'react';
import 'boxicons'

const Icon = ({type , name , color , size , border , animation}) => {
  return (
    <div>
        <box-icon 
            type={type} 
            name={name} 
            color={color} 
            size={size}
            border={border}
            animation={animation}     
        ></box-icon>
    </div>
  )
}

export default Icon
