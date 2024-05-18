import React, { useEffect, useState } from 'react';
import { NavigationBar , NavigationButton, Text , Footer } from '../components/atoms';
import { ImageUrls } from '../constants';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PendingUser = () => {
  const {userId} = useParams();
  const [Name , setName] = useState("New User");

  const toPascalCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  const UserName = toPascalCase(Name);


  const notify = (message, type) => {
		switch(type) {
		  case 'success':
			toast.success(message , {position: "top-right"});
			break;
		  case 'info':
			toast.info(message, {position: "top-right"});
			break;
		  case 'warning':
			toast.warning(message, {position: "top-right"});
			break;
		  case 'error':
			toast.error(message, {position: "top-right"});
			break;
		  default:
			toast(message, {position: "top-right"});
		}
	  };

    useEffect(() => {
      getName();
    },[userId]);

  const getName = async() => {
    try {
      const response = await fetch(`http://localhost:3300/api/users/one/${userId}`);

			const data = await response.json();

			if(response.ok){
					setName(data.user.fullName);
			}else{
				notify("Data fetch failed!" , 'warning');
			}
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div
        className='z-0 w-full h-screen '
        style={{
        backgroundImage: `url(${ImageUrls.pendingBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: "fixed",
        overflowX:'hidden',
        }} 
    >
       <div className='w-full h-[75px] flex items-center  '>
         <NavigationBar style={` border-b-[3px] hover:border-b-yellow-500`} />
       </div>
       <div className='flex flex-col items-center justify-center w-full mt-28'>
        <div className='flex items-center justify-center w-full'>
            <Text content={`Hi ${UserName},`} style={`text-[1.5rem] flex justify-center items-center p-2 font-bold text-white`}/>
        </div>
        <div className='flex items-center justify-center w-1/2'>
            <Text content={`Your account has not been approved yet!
                            Our administrative Team will be checking it soon.
                            And soon your admission will be confirmed. 
                            You will get to access after confirmation.
                            Thank you for signing up. We'll see you soon.`}
                   style={`text-[1.2rem] break-words text-yellow-100 mt-[50px]`}         
             />
        </div>
        <div className='mt-[1.4rem] flex justify-center'>
            <NavigationButton buttonName={`Click here go to Home page`} path={"/"} style={`text-[1.2rem] text-white border-[3px] w-[270px] hover:text-black hover:border-yellow-500 hover:bg-white`} />
        </div>
       </div>
       <div className='absolute bottom-0 w-full'>
        <Footer content="&copy; SuperCure Hospital - All rights reserved" style={`h-[58px] text-[1.1rem] text-slate-200 font-semibold w-full flex items-center justify-center bg-orange-100 bg-opacity-30`} />
      </div> 
    </div>
  )
}

export default PendingUser
