import React, { useEffect, useState } from 'react';
import { ImageUrls } from '../../constants';

const ButtonWithImageBg = ({userId}) => {
    const [ImageUrl , setImageUrl] = useState("");

    const authenticationDetails = {
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token')
    };

    useEffect(() => {
      fetchData();
    },[userId])

    const fetchData = async() => {
      try {
        const response = await fetch(`http://localhost:3300/api/users/one/${authenticationDetails.userId}`,{
          headers:{
            'token':`Bearer ${authenticationDetails.token}`
          }
        });
  
        const data = await response.json();
        console.log(data);
        if(data.status){
          setImageUrl(data.user.imageUrl);
        }else{
          console.error(data.error.message);
        }
      } catch (error) {
        console.error("Error! " , error);
      }
    }
  return (
    <div >
      <button
        className='flex items-center w-[100px] h-[100px] border-none mt-5 rounded-full transform cursor-pointer'
        style={{
            backgroundImage: `url(${ImageUrl ?  ImageUrl : ImageUrls.user})`,
            backgroundSize: `cover`,
        }}
      >
      </button>
      <p className='mt-2 text-[0.9rem] text-slate-50 flex justify-center'>Edit Profile</p>
    </div>
  )
}

export default ButtonWithImageBg
