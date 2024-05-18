import React from 'react';

const DropDownList = ({name , id , children , backgraoudColor , onChangeFunc}) => {
  return (
    <div>
      <select 
        className='p-2 mb-3 mt-1 w-[200px] text-[20px] italic text-blue-800  border-b-[3px] focus:outline-none focus:border-b-green-400' 
        name={name} 
        id={id}
        style={{
          backgroundColor:backgraoudColor
        }}
        onChange={onChangeFunc}
      >
        {children}
      </select>
    </div>
  )
}

export default DropDownList
