import React, { useEffect, useState} from 'react';
import Image from './Image';
import { ImageUrls} from '../../constants';
import Text from './Text';

const ViewProfile = ({ userId , Token}) => {
  console.log(userId);
  console.log(Token);
  const [ImageUrl, setImageUrl] = useState("");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [NIC, setNIC] = useState("");
  const [Address, setAddress] = useState("");
  const [DOB, setDOB] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [Gender, setGender] = useState("");

  useEffect(() => {
    fetchData();
  },[userId]);

  const fetchData = async() => {
    try {
      const response = await fetch(`http://localhost:3300/api/users/one/${userId}`,{
        headers:{
          'token':`Bearer ${Token}`
        }
      });

      const data = await response.json();
      console.log(data);
      if(data.status){
        setName(data.user.fullName);
        setEmail(data.user.emailAddress);
        setImageUrl(data.user.imageUrl);
        setNIC(data.user.nicNumber);
        setAddress(data.user.address);
        setDOB(data.user.dateOfBirth);
        setContactNumber(data.user.phoneNumber);
        setGender(data.user.gender);
      }else{
        console.error(data.error.message);
      }
    } catch (error) {
      console.error("Error! " , error);
    }
  }

  return (
        <div className='flex flex-col w-[600px] h-[520px] bg-slate-200 z-20 p-2 rounded-lg'>
          <div className='flex flex-col items-center mt-5'>
            <Image src={ImageUrl ? ImageUrl : ImageUrls.user} alt="User Profile" style={`w-[200px] h-[200px] rounded-full hover:scale-110 duration-300`} />
          </div>
          <div className='mt-10 font-semibold ml-[100px] '>
            <ul className='list-disc'>
              <li><Text content={Name} color="black" size="1.2rem" /></li>
              <li><Text content={Email} color="black" size="1.2rem" /></li>
              <li><Text content={NIC} color="black" size="1.2rem" /></li>
              <li><Text content={Address} color="black" size="1.2rem" /></li>
              <li><Text content={DOB} color="black" size="1.2rem" /></li>
              <li><Text content={ContactNumber} color="black" size="1.2rem" /></li>
              <li><Text content={Gender} color="black" size="1.2rem" /></li>
            </ul>
          </div>
        </div>
  )
}

export default ViewProfile;
