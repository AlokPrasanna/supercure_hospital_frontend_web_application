import React, { useEffect, useState } from 'react';
import { DropDownList, Icon, InputBox, Lable, PrimaryButton, SpecializedFieldCard } from '../../atoms';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { Colors } from '../../../constants';
import { SpecialtiesAreas } from '../../../data';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FadeLoader } from 'react-spinners';

const DoctorHead = () => {
  const Navigate = useNavigate();

  const UserId = localStorage.getItem('userId');
  const Token = localStorage.getItem('token');

  const [showProfessionalDetailsPopup , setShowProfessionalDetailsPopup] = useState(false);
  const [academicDetails, setAcademicDetails] = useState([{ id: 1, value: "" }]);
  const [selectedFields, setSelectedFields] = useState([]);

  const [dateTime , setDateTime] = useState({
    date:'',
    time:''
  });

  const [Loading , setLoading] = useState(false);

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

  const HandelLogout = () => {
    Swal.fire({
      title: "",
      text: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor:"#ff0000",
      confirmButtonText: "Yes,Logout",
      cancelButtonText:"No",
      allowOutsideClick: true
    }).then((result) => {
      if (result.isConfirmed) {
      localStorage.setItem('token', "");
      Navigate("/login");
      }
    });
  }

  const fetchDoctorDetails = async() => {
    try {
      const response  = await fetch(`http://localhost:3300/api/doctor/details/${UserId}`,{
        method:"GET",
        headers:{
          'token':`Bearer ${Token}`
        }
      });

      const data  = await response.json();
      console.log(data);
      if(data.status && data.details.length > 0){
        const details = data.details[0];
        setAcademicDetails(details.degree.map((degree , index) => ({id:index+1 , value:degree})));
        setSelectedFields(details.specialty);
        setDateTime({date:details.dateCreated , time:details.timeCreated});
        setLoading(false);
      }else if(!data.status && data.error.message === "No doctor available for the provided user id!"){
        setLoading(false);
        notify("Save your professional details...", 'info');
      }else{
        setLoading(false);
        notify(data.error.message , 'error');
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      notify("Something went wrong!", 'error');
    }
  }

  const HandelProfessionalDetailsButton = () => {
    fetchDoctorDetails();
    setShowProfessionalDetailsPopup(true);
    setLoading(true);
  }

  const addAcademicDetail = () => {
    setAcademicDetails([...academicDetails, { id: academicDetails.length + 1, value: "" }]);
  };

  const handleAcademicDetailChange = (id, value) => {
    setAcademicDetails(academicDetails.map(detail =>
      detail.id === id ? { ...detail, value } : detail
    ));
  }

  const deleteAcademicDetail = (id) => {
    setAcademicDetails(academicDetails.filter(detail => detail.id !== id));
  };

  const handleFieldSelect = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue && !selectedFields.includes(selectedValue)) {
      setSelectedFields([...selectedFields, selectedValue]);
    }
  };

  const removeField = (field) => {
    setSelectedFields(selectedFields.filter(f => f !== field));
  };

  const handleCanselButton = () => {
    setShowProfessionalDetailsPopup(false);
    setAcademicDetails([{ id: 1, value: "" }]);
    setSelectedFields([]);
  }

  const handelSaveButton = () => {
    if(selectedFields.length === 0 || academicDetails.length === 0){
      notify("Can't save empty field!" , 'warning');
      return;
    }
    Swal.fire({
      title: "Are you sure to save details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save!"
    }).then((result) => {
      if (!result.isConfirmed) {
        Swal.fire({
          title: "Cancel!",
          icon: "success"
        });
      }else{
        setLoading(true);
        saveDetails();
      }
    });
  }

  console.log(academicDetails);
  console.log(selectedFields);

  const saveDetails = async() => {

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
      doctorId:UserId,
      degree:academicDetails.map((detail) => detail.value),
      specialty:selectedFields,
      dateCreated:dateTime.date ? dateTime.date : formattedDate,
      timeCreated:dateTime.time ? dateTime.time : formattedTime,
      dateUpdated:formattedDate,
      timeUpdated:formattedTime
    }

    try {
      const response = await fetch(`http://localhost:3300/api/doctor/save`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
          'token': `Bearer ${Token}`
        },
        body: JSON.stringify(data)
      });

      const Data = await response.json();
      if(Data.status){
        notify("Save details successfully!" , 'success');
        fetchDoctorDetails();
      }else{
        notify(`${Data.error.message}`, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      notify("Failed to save data!", 'error');
    }finally{
      setLoading(false);
    }
  }
 
  return (
    <div className='z-50'>
    <div className="h-[58px] bg-slate-400">
      <div className='flex items-center justify-end h-full gap-10 mr-14 '>
        <div className='flex items-center justify-center duration-300 ease-in-out transform rounded-md cursor-pointer hover:scale-105'>
          <PrimaryButton 
            buttonTitle="Professional Details" 
            buttonColor={Colors.lightBlue} 
            height="40px" 
            width="200px"
            style={`flex items-center justify-center h-full`}
            onClickFunc={HandelProfessionalDetailsButton}
            />
        </div>
        <div className='flex items-center justify-center duration-300 ease-in-out transform rounded-md cursor-pointer hover:bg-red-600' onClick={HandelLogout}>
          <Icon type="regular" name="log-out-circle" color="white"  size="35px" border="square" />
        </div>
      </div>
    </div> 
    {Loading && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full'>
          <FadeLoader
            color="#A9A9A9"
            cssOverride={{}}
            loading={Loading}
            size={50}
            speedMultiplier={2}
          />
        </div>
      )}
      {showProfessionalDetailsPopup && !Loading && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full text-slate-600' style={{backgroundColor:"rgba(0,0,0,0.2)"}}>
          <div className='bg-white w-[40%] max-h-[80vh] rounded-md px-3 py-2'>
            <div className='flex gap-10 m-5'>
                <Lable lableName="Academic Details" />
                <div className='h-[35px] w-[35px] hover:bg-green-500 rounded-md' onClick={addAcademicDetail}>
                  <Icon type="regular" name="add-to-queue" color="black"  size="35px" border="square" />
                </div>
            </div>
            <div className='w-full max-h-[28vh] overflow-y-auto overflow-x-hidden'>
              {academicDetails.map((detail, index) => (
                <div key={detail.id} className='flex w-full gap-3 ml-5 mr-5'>
                  <InputBox
                    inputWidth="w-[562px]"
                    value={detail.value}
                    backgroundColor={Colors.gray}
                    onChnageFunc={(e) => handleAcademicDetailChange(detail.id, e.target.value)}
                    placeholderText="Ex: MBBS, University of Cambridge"
                  />
                  <div className='h-[35px] w-[35px] hover:bg-red-500 rounded-md' onClick={() => deleteAcademicDetail(detail.id)}>
                    <Icon type="regular" name="trash" color="black"  size="35px" border="square" />
                  </div>
                </div>
              ))}
            </div>
            <div className='flex items-center gap-10 m-5'>
              <Lable lableName="Specialized field" />
              <div className=''>
                <DropDownList width="350px" onChangeFunc={handleFieldSelect}>
                  {SpecialtiesAreas.map( field => (
                    <option key={field.id} value={field.value}>{field.value}</option>
                  ))}
                </DropDownList>
              </div>
            </div>
            <div className='flex flex-wrap gap-2 m-5 max-h-[18vh] overflow-y-auto'>
              {selectedFields.map((field, index) => (
                <SpecializedFieldCard key={index} text={field} onClickFunc={() => removeField(field)} />
              ))}
            </div>
            <div className='flex items-center h-[10vh] gap-10 m-5'>
              <div className='duration-300 ease-in-out transform hover:scale-110'>
                <PrimaryButton 
                  buttonTitle="Cansel" 
                  buttonColor={Colors.red}
                  onClickFunc={handleCanselButton} 
                  width="200px" 
                  height="40px" 
                  style={"flex items-center justify-center h-full"} />
              </div>
              <div className='duration-300 ease-in-out transform hover:scale-110'>
                <PrimaryButton 
                  buttonTitle="Save" 
                  buttonColor={Colors.green}
                  onClickFunc={handelSaveButton} 
                  width="200px" 
                  height="40px" 
                  style={"flex items-center justify-center h-full"} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorHead
