import React from 'react';

const DropDownList = ({name , id , children , backgraoudColor , onChangeFunc , width}) => {
  const Width = width ? width : "200px"
  return (
    <div>
      <select 
        className={`p-2 mb-3 mt-1 w-[${Width}] text-[1rem] text-blue-900  border-b-[3px] focus:outline-none focus:border-b-green-400`} 
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
