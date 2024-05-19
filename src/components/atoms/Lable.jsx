import React from 'react';

const Lable = ({lableFor,lableName ,color}) => {
  const Color = color ? `text-${color}` : `text-black`;
  return (
    <div className={`text-[1.2rem] font-semibold ${Color}`} >
      <label htmlFor={lableFor}>{lableName}</label>
    </div>
  );
}

export default Lable;
