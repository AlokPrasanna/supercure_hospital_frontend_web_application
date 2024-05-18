import React, { useState } from 'react';
import { ImageUrls } from '../../constants';

const ButtonWithImageBg = ({userId}) => {
    const [ImageUrl , setImageUrl] = useState(ImageUrls.user)
  return (
    <div >
      <button
        className='flex items-center w-[100px] h-[100px] border-none mt-5 rounded-full transform cursor-pointer'
        style={{
            backgroundImage: `url(${ImageUrl})`,
            backgroundSize: `cover`,
        }}
      >
      </button>
      <p className='mt-2 text-[0.9rem] text-slate-50 flex justify-center'>Edit Profile</p>
    </div>
  )
}

export default ButtonWithImageBg
