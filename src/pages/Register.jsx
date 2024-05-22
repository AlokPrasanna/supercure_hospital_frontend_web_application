import React , {useState} from 'react';
import { InputBox , PrimaryButton , Lable , NavigationButton ,DropDownList , NavigationBar , Footer } from '../components/atoms';
import {Colors , ImageUrls} from '../constants';

import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [userDetails , setUserDetails] = useState({
    name:'',
    email:'',
    nic:'',
    contact:'',
    address:'',
    gender:'Male',
    birthday:'',
    password:''
  });

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

  const handelRegisterButton = () => {
    if(!userDetails.name 
      || !userDetails.email
      || !userDetails.address
      || !userDetails.birthday
      || !userDetails.contact
      || !userDetails.gender
      || !userDetails.nic
      || !userDetails.password
    ){
      notify("Fill all required fields!" , 'warning');
      return
    }
    Swal.fire({
      title: "Are you sure to continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit!"
    }).then((result) => {
      if (!result.isConfirmed) {
        Swal.fire({
          title: "Cancel!",
          icon: "success"
        });
      }else{
        Register();
      }
    });

  }

  const Register = async() => {
    const currentDate = new Date();

    // Current Date
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
  
    // Current Time
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const data = {
      fullName:userDetails.name,
      emailAddress:userDetails.email,
      nicNumber:userDetails.nic,
      address:userDetails.address,
      password:userDetails.password,
      phoneNumber:userDetails.contact,
      gender:userDetails.gender,
      userType:"NewUser",
      dateOfBirth:userDetails.birthday,
      imageUrl:"",
      dateCreated:formattedDate,
      timeCreated:formattedTime,
      dateUpdated:formattedDate,
      timeUpdated:formattedTime,
    };

    try {

      const response = await fetch('http://localhost:3300/api/users/register',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const Data = await response.json();

      if(response.ok){
        handelClearButton();
        notify("Registration Successfully!", 'success');
        navigate("/login");
      }else{
        notify(`${Data.error.message}`, 'error');
      }
      
    } catch (error) {
      console.error("Error:", error);
      notify("Failed to save application!", 'error');
    }
  }
console.log(userDetails);
  const handelClearButton = () => {
    setUserDetails({
      name:'',
      email:'',
      nic:'',
      contact:'',
      address:'',
      gender:'Male',
      birthday:'',
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
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
        backgroundAttachment: "fixed",
      }}
    >
      <div className='w-full h-[75px] mt-3 flex items-center top-0 '>
          <NavigationBar />
      </div>
      <div className='flex flex-col items-center justify-center h-full '>
        <div className='' >
          <div className='flex justify-center text-[30px] font-semibold p-4' >
            <p>Register Here</p>
          </div>
          <div className='mt-2 '>
            <Lable lableName="Full  Name" lableFor="name"/>
            <InputBox inputType="text" value={userDetails.name} onChnageFunc={(e) => setUserDetails({ ...userDetails, name:e.target.value})} placeholderText="Enter your name here" backgraoudColor="transparent"/>
            <Lable lableName="Email Address" lableFor="email"/>
            <InputBox inputType="email" value={userDetails.email} onChnageFunc={(e) => setUserDetails({ ...userDetails, email:e.target.value})} placeholderText="Enter email address here" backgraoudColor="transparent"/>
            <div className='flex items-center justify-between h-full'>
              <div>
                <Lable lableName="NIC Number" lableFor="nic"/>
                <InputBox inputType="text" value={userDetails.nic} onChnageFunc={(e) => setUserDetails({ ...userDetails, nic:e.target.value})} placeholderText="Enter NIC Number here" backgraoudColor="transparent" inputWidth="w-[250px]"/>
              </div>
              <div>
                <Lable lableName="Contact Number" lableFor="phoneNumber"/>
                <InputBox inputType="tel" value={userDetails.contact} onChnageFunc={(e) => setUserDetails({ ...userDetails, contact:e.target.value})} placeholderText="Enter mobile number here" backgraoudColor="transparent" inputWidth="w-[250px]"/>
              </div>
            </div>
            <Lable lableName="Address" lableFor="address"/>
            <InputBox inputType="text" value={userDetails.address} onChnageFunc={(e) => setUserDetails({ ...userDetails, address:e.target.value})} placeholderText="Enter address here" backgraoudColor="transparent"/>            
            <div className='flex items-center justify-between ml-2 mr-2'>
              <div className=''>
                <Lable lableName="Gender" lableFor="gender"/>
                <DropDownList name={"gender"} id={"gender"} value={userDetails.gender} backgraoudColor="transparent" onChangeFunc={(e) => setUserDetails({...userDetails , gender:e.target.value})}>
                  <option value="Male" >Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </DropDownList>
              </div>
              <div>
                <Lable lableName="Birthday" lableFor="birthday" />
                <InputBox inputType="date" backgraoudColor="transparent" value={userDetails.birthday} onChnageFunc={(e) => setUserDetails({ ...userDetails, birthday:e.target.value})} />
              </div>
            </div>
            <Lable lableName="Password" lableFor="password" />
            <InputBox inputType="password" value={userDetails.password} onChnageFunc={(e) => setUserDetails({ ...userDetails, password:e.target.value})} placeholderText="Enter  password number here" backgraoudColor="transparent" />
          </div>
          <div className='flex justify-start p-3 mt-4 space-x-5'>
              <PrimaryButton 
                buttonTitle="Clear" 
                onClickFunc={handelClearButton} 
                buttonType="submit" 
                buttonColor={Colors.red}
                width="200px" 
                height="40px" 
                style={"flex items-center justify-center duration-300 ease-in-out transform hover:scale-110"}
              />
              <PrimaryButton 
                buttonTitle="Register" 
                onClickFunc={handelRegisterButton} 
                buttonType="submit" 
                buttonColor={Colors.lightBlue}
                width="200px" 
                height="40px" 
                style={"flex items-center justify-center duration-300 ease-in-out transform hover:scale-110"} 
              />
          </div>
          <div className='p-2 mt-4 mb-[80px] z-50'>
            <p className='text-[1rem] font-semibold mb-2'>If you already have an accoun clik Login Button</p>
            <NavigationButton 
              buttonName="Login" 
              buttonType="button" 
              style={"flex items-center bg-green-600 duration-300 transform ease-in-out justify-center hover:bg-slate-900 hover:text-white"}
              path={"/login"}
            />
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 left-0 w-full '>
          <Footer content="&copy; SuperCure Hospital - All rights reserved" style={`h-[58px] text-[1.1rem] text-slate-200 font-semibold w-full flex items-center justify-center bg-orange-100 bg-opacity-30`} />
        </div>
    </div>
  )
}

export default Register
