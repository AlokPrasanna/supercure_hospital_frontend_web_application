import React, {useState , useEffect} from 'react';
import ImageUpload from './ImageUpload';
import Text from './Text';
import DropDownList from './DropDownList';
import Lable from './Lable';
import InputBox from './InputBox';
import { Colors } from '../../constants';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProfile = ({userId , updateValue , clearValue , Token}) => {
   console.log(Token);
    const [DropdownListValue , setDropDownListValue] = useState("fullName");
    const [AdminData , setAdminData] = useState({
        image:'',
        name:'',
        email:'',
        nic:'',
        address:'',
        birthday:'',
        tele:'',
        gender:'',
        currentPassword:'',
        newPassword:''
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

    const HandeleDropDownChange = (event) => {
        setDropDownListValue(event.target.value);
    };

    const HandleCanselButton = () => {
        setAdminData({
            image:'',
            name:'',
            email:'',
            nic:'',
            address:'',
            birthday:'',
            tele:'',
            gender:'',
            currentPassword:'',
            newPassword:''
        })
    }

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
            setAdminData({
                image:data.user.imageUrl,
                name: data.user.fullName,
                email: data.user.emailAddress,
                nic: data.user.nicNumber,
                address: data.user.address,
                birthday: data.user.dateOfBirth,
                tele: data.user.phoneNumber,
                gender: data.user.gender,
                currentPassword: '',
                newPassword: ''
            });
          }else{
            console.error("Can not fetch data");
          }
        } catch (error) {
          console.error("Error! " , error);
        }
      }

      console.log(AdminData);

      const updateData = async() => {
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
            fullName:AdminData.name,
            emailAddress:AdminData.email,
            nicNumber:AdminData.nic,
            address:AdminData.address,
            phoneNumber:AdminData.tele,
            gender:AdminData.gender,
            dateOfBirth:AdminData.birthday,
            dateUpdated:formattedDate,
            timeUpdated:formattedTime
        }
        try {
            const response = await fetch(`http://localhost:3300/api/users/update/${userId}`,{
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                'token':`Bearer ${Token}`
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            if(responseData.status){
                console.log(responseData.user);
                notify("Data Updated!" , 'success');
            }else{
                notify("Data Could not update!" , 'error');
            }
        } catch (error) {
            console.log("Error! ", error);
            notify("Data Could not update!" , 'error');
        }
      }

    useEffect(() => {
        if(updateValue){
            updateData();
        }
        if(clearValue){
            HandleCanselButton();
        }
    },[updateValue , clearValue]);

    console.log(AdminData.name);
    
  return (
    <div className='flex flex-col w-[600px] max-h-[90vh] min-h-96 bg-slate-200 z-20 p-2 rounded-lg'>
        <div className='flex flex-col ml-5 mt-7'>
            <div>
                <div className='font-semibold'>
                    <Text content=". Update Profile Picture"  color="black" size="1.2rem"/>
                </div>
                <div className=''>
                    <ImageUpload  imageUrl={AdminData.image}/>
                </div>
            </div>
            <div className='mt-5'>
                <div className='font-semibold '>
                    <Text content=". Update details" color="black" size="1.2rem"/>
                </div>
                <div className='mt-2 ml-8' onChange={HandeleDropDownChange}>
                    <DropDownList>
                        <option value="fullName">Name</option>
                        <option value="address">Address</option>
                        <option value="nic">NIC Number</option>
                        <option value="contactNumber">Contact Number</option>
                        <option value="gender">Gender</option>
                        <option value="birthday">Birthday</option>
                        <option value="password">Password</option>
                    </DropDownList>
                </div>
                <div className='mt-8 ml-10'>
                    {DropdownListValue && DropdownListValue === "gender" ? (
                        <div>
                        <Lable lableName="Gender" lableFor="gender"/>
                        <DropDownList 
                            name={"gender"} 
                            id={"gender"} 
                            backgraoudColor={Colors.white} 
                            value={AdminData.gender}
                            onChangeFunc={(e) => {setAdminData({AdminData , gender:e.target.value})}}>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </DropDownList>
                      </div>
                    ): DropdownListValue === "birthday" ? (
                        <div>
                            <Lable lableName="Birthday" lableFor="birthday" />
                            <InputBox 
                                inputType="date" 
                                backgraoudColor={Colors.white}
                                value={AdminData.birthday}
                                onChnageFunc={(e) => {setAdminData({AdminData , birthday:e.target.value})}} 
                            />
                        </div>
                    ): DropdownListValue === "fullName" ? (
                        <div>
                            <Lable lableName="Full  Name" lableFor="name"/>
                            <InputBox 
                                inputType="text" 
                                placeholderText="Enter your name here" 
                                backgraoudColor={Colors.white} 
                                inputWidth="w-[500px]"
                                value={AdminData.name}
                                onChnageFunc={(e) => {setAdminData({AdminData , name:e.target.value})}}
                            />
                        </div>
                    ): DropdownListValue === "address" ? (
                        <div>
                            <Lable lableName="Address" lableFor="address"/>
                            <InputBox 
                                inputType="text" 
                                placeholderText="Enter address here" 
                                backgraoudColor={Colors.white} 
                                inputWidth="w-[500px]"
                                value={AdminData.address}
                                onChnageFunc={(e) => {setAdminData({AdminData , address:e.target.value})}}
                            />
                        </div>
                    ): DropdownListValue === "nic" ? (
                        <div>
                            <Lable lableName="NIC Number" lableFor="nic"/>
                            <InputBox 
                                inputType="text" 
                                placeholderText="Enter NIC Number here" 
                                backgraoudColor={Colors.white} 
                                inputWidth='w-[300px]'
                                value={AdminData.nic}
                                onChnageFunc={(e) => {setAdminData({AdminData , nic:e.target.value})}}
                            />
                        </div>
                    ): DropdownListValue === "contactNumber" ? (
                        <div>
                            <Lable lableName="Contact Number" lableFor="phoneNumber"/>
                            <InputBox 
                                inputType="tel" 
                                placeholderText="Enter mobile number here" 
                                backgraoudColor={Colors.white} 
                                inputWidth="w-[300px]"
                                value={AdminData.tele}
                                onChnageFunc={(e) => {setAdminData({AdminData , tele:e.target.value})}}
                            />
                        </div>
                    ): DropdownListValue === "password" ? (
                        <div>
                        <div>
                            <Lable lableName="Current Password" lableFor="password" />
                            <InputBox 
                                inputType="password" 
                                placeholderText="Enter current  password here" 
                                backgraoudColor={Colors.white} 
                                inputWidth="w-[500px]"
                                onChnageFunc={(e) => {setAdminData({AdminData , currentPassword:e.target.value})}} 
                            />
                        </div>
                        <div>
                            <Lable lableName="New Password" lableFor="password" />
                            <InputBox 
                                inputType="password" 
                                placeholderText="Enter New  password here" 
                                backgraoudColor={Colors.white} 
                                inputWidth="w-[500px]"
                                onChnageFunc={(e) => {setAdminData({AdminData , newPassword:e.target.value})}} 
                            />
                        </div>
                    </div>
                    ): ""}
                </div>
            </div>
        </div>
    </div>
  ) 
}

export default UpdateProfile
