import React from 'react';

const Text = ({content , size , color , style}) => {
  const Style = style ? style : " ";
  return (
    <div 
       >
      <span  
        className={`${Style}`}
        style={{
            fontSize: size,
            color: color
        }}
        >{content}</span>
    </div>
  )
}

export default Text
