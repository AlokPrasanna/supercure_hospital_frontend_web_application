import React, { useEffect, useState } from 'react';
import { InputBox , PrimaryButton , NavigationButton ,Lable , NavigationBar , Footer } from '../components/atoms';
import {Colors , ImageUrls} from '../constants';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  
  const [userDetails , setUserDetails] = useState({
    email:'',
    password:''
  });

  const Token = localStorage.getItem('token');
  const UserType = localStorage.getItem('userType');
  const UserId = localStorage.getItem('userId');

  useEffect(() => {
    if(Token !==  ""){
      if(UserType === "Admin"){
        navigate(`/admin/${UserId}`);
      }else if(UserType === "Doctor"){
        navigate(`/doctor/${UserId}`);
      }else if(UserType === "Patient"){
        navigate(`/patient/${UserId}`);
      }
    }
  },[])


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

  const handelLoginButton = () => {
    if(
      !userDetails.email
      || !userDetails.password
    ){
      notify("Fill all required fields!" , 'warning');
      return
    }

    Login();
  }

  const Login = async() => {
    const data = {
      emailAddress:userDetails.email,
      password:userDetails.password
    };

    try {
      const response = await fetch('http://localhost:3300/api/users/login' , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const Data = await response.json();
      if(Data.status){
        if(Data.user.userType === "NewUser"){
          navigate(`/new/user/${Data.user._id}`);
        }else if(Data.user.userType === "Doctor"){
          notify("Loging Success!", 'success');
          localStorage.setItem('token' , Data.accessToken);
          localStorage.setItem('userType' , Data.user.userType);
          localStorage.setItem('userId' , Data.user._id);
          navigate(`/doctor/${Data.user._id}`);
        }else if(Data.user.userType === "Patient"){
          notify("Loging Success!", 'success');
          localStorage.setItem('token' , Data.accessToken);
          localStorage.setItem('userType' , Data.user.userType);
          localStorage.setItem('userId' , Data.user._id);
          navigate(`/patient/${Data.user._id}`);
        }else if(Data.user.userType === "Admin"){
          notify("Loging Success!", 'success');
          localStorage.setItem('token' , Data.accessToken);
          localStorage.setItem('userType' , Data.user.userType);
          localStorage.setItem('userId' , Data.user._id);
          navigate(`/admin/${Data.user._id}`);
        }else if(Data.user.userType === "Blocked"){
          navigate(`/blocked/${Data.user._id}`);
        }else{
          notify("Invalid User Type!", 'error');
        }
      }else{
        notify(`${Data.error.message}`, 'error');
      }
    } catch (error) {
      console.error("Error:", error);
      notify("Failed to Login!", 'error');
    }
  }

  const handelClearButton = () => {
    setUserDetails({
      email:'',
      password:''
    })
  }

  return (
    <div 
      className='flex flex-col items-center justify-center'
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${ImageUrls.regLogBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className='w-full h-[75px] flex items-center mt-6 top-0 absolute '>
        <NavigationBar />
      </div>
      <div className='z-50 flex flex-col items-center justify-center h-full'>
        <div className='' >
          <div className='flex justify-center text-[30px] font-semibold p-4 text-black' >
            <p>Login Here</p>
          </div>
          <div className='mt-2 '>
            <Lable lableName="Email Address" lableFor="email" color="black"/>
            <InputBox inputType="email" value={userDetails.email} onChnageFunc={(e) => setUserDetails({ ...userDetails, email:e.target.value})} placeholderText="Enter email address here" backgraoudColor="transparent" focus="true"/>
            <Lable lableName="Password" lableFor="password" color="black"/>
            <InputBox inputType="password" value={userDetails.password} onChnageFunc={(e) => setUserDetails({ ...userDetails, password:e.target.value})} placeholderText="Enter password here" backgraoudColor="transparent"/>
          </div>
          <div className='flex justify-start p-2 mt-2 space-x-5 '>
            <PrimaryButton 
              buttonTitle="Clear" 
              onClickFunc={handelClearButton} 
              buttonType="submit" 
              buttonColor={Colors.red}
              width="200px" 
              height="40px" 
              style={"flex items-center justify-center duration-300 ease-in-out transform hover:scale-110"}
            />
            <div>
              <PrimaryButton 
                buttonTitle="Login" 
                onClickFunc={handelLoginButton} 
                buttonType="submit" 
                buttonColor={Colors.lightBlue} 
                width="200px" 
                height="40px" 
                style={"flex items-center justify-center duration-300 ease-in-out transform hover:scale-110"}
              />
            </div>
          </div>
          <div className='p-2 mt-2'>
            <p className='text-[1rem] font-semibold mb-2'>If you don't have an account click Register button</p>
            <NavigationButton 
              buttonName="Register" 
              buttonType="button" 
              path={"/register"}
              style={"flex items-center bg-green-600 duration-300 transform ease-in-out justify-center hover:bg-slate-900 hover:text-white"}
            />
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 w-full'>
          <Footer content="&copy; SuperCure Hospital - All rights reserved" style={`h-[58px] text-[1.1rem] text-slate-200 font-semibold w-full flex items-center justify-center bg-orange-100 bg-opacity-30`} />
        </div>
    </div>
  );
}

export default Login;
