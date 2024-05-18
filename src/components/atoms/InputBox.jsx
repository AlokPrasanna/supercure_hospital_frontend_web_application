import React from 'react'

const InputBox = ({ inputType , placeholderText , backgraoudColor , mrBtm ,  btr , btl , bbr , bbl , inputWidth , onChnageFunc , value}) => {
 
  const width = inputWidth ? inputWidth : inputType === 'date' ? 'w-[200px]' : 'w-[600px]';
  const marginbottom = mrBtm === undefined || mrBtm === null || mrBtm === '' ? 'mb-3' : `mb-${mrBtm}`;
  const borderBottomRightRadius = bbr === undefined || bbr === null || bbr === '' ? '' : `rounded-br-${bbr}`;
  const borderBottomLefttRadius = bbl === undefined || bbl === null || bbl === '' ? '' : `rounded-bl-${bbl}`;
  const borderTopRightRadius = btr === undefined || btr === null || btr === '' ? '' : `rounded-tr-${btr}`;
  const borderTopLeftRadius = btl === undefined || btl === null || btl === '' ? '' : `rounded-tl-${btl}`; 
  return (
    <div>
      <input
        className={`p-2 text-[20px] text-blue-800 italic border-b-[3px] placeholder-blue-800 placeholder:italic  focus:outline-none focus:border-b-green-400 ${width} ${marginbottom} ${borderBottomLefttRadius} ${borderBottomRightRadius} ${borderTopLeftRadius} ${borderTopRightRadius}`}
        style={{
          backgroundColor:backgraoudColor === 'transparent' ? 'transparent' : backgraoudColor,

        }}
        type={inputType} 
        placeholder={placeholderText}
        required
        value={value}
        onChange={onChnageFunc}
      />
    </div>
  )
}

export default InputBox
