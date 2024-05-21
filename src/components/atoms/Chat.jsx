import React , {useEffect, useState} from 'react';
import 'react-chat-elements/dist/main.css';
import { MessageList, Input } from 'react-chat-elements';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Colors, ImageUrls } from '../../constants';
import Icon from './Icon';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lable from './Lable';
import DropDownList from './DropDownList';
import InputBox from './InputBox'
import { AppointmentTimes } from '../../data';
import PrimaryButton from './PrimaryButton';

const Chat = () => {
  const authenticationDetails = {
    userId:localStorage.getItem('userId'),
    token:localStorage.getItem('token')
  };

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const [symtomCategory , setSymtomCategory] = useState(["Cardiology", "Dermatology", "Orthopedics"]);
  const [doctorsList , setDoctorsList] = useState([{id:1 , name:""}]);
  const [appointmentDetails , setAppointmentDetails] = useState({
    doctorId:'',
    date:'',
    time:AppointmentTimes[0].value
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

  console.log(doctorsList);


  useEffect(() => {
    if(symtomCategory.length > 0){
      getDoctorsList();
    }
  },[symtomCategory])
  
    const handleSendMessage = () => {
        if (inputText.trim() !== '') {
          const newMessage = {
            position: 'right',
            type: 'text',
            text: inputText,
            date: new Date(),
          };
          setMessages([...messages, newMessage]);
          setInputText('');
        }
      };

  const getDoctorsList = async() => {
    const sendData = {
      specialties:symtomCategory
    }
      try {
        const response = await fetch('http://localhost:3300/api/doctor/specialized',{
          method:"POST",
          headers:{
            'Content-Type': 'application/json',
            'token':`Bearer ${authenticationDetails.token}`
          },
          body: JSON.stringify(sendData),
        });

        const data = await response.json();
        console.log(data);
        if(data.status && data.doctors.length > 0){
          const doctors = data.doctors;
          setDoctorsList(doctors.map((doctor) => ({id:doctor._id , name:doctor.name})));
        }else{
          notify(data.error.message , "warning");
          console.log(data.error.message);
        }
      } catch (error) {
        console.error("Error! ", error);
        notify("Something went wrong!" , "error");
      }
  }

  const handleDoctorSelection = (doctorId) => {
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      doctorId
    }));
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      date: value
    }));
  };

  const handleTimeChange = (event) => {
    const { value } = event.target;
    setAppointmentDetails((prevDetails) => ({
      ...prevDetails,
      time: value
    }));
  };


  const handleCanselButton = () => {
    setSymtomCategory([]);
    setAppointmentDetails({
      doctorId:'',
      date:'',
      time:AppointmentTimes[0].value
    });
  }

  const handleSaveButton = () => {

    if(!appointmentDetails.doctorId || !appointmentDetails.date || !appointmentDetails.time){
      notify('Fill all fiels before click save button' , 'warning');
      return;
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
        createAppointment();
      }
    });
  }

  const createAppointment = async() => {
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
      doctorId:appointmentDetails.doctorId,
      patientId:authenticationDetails.userId,
      appointmentDate:appointmentDetails.date,
      appointmentState:"Scheduled",
      appointmentTime:appointmentDetails.time,
      dateCreated:formattedDate,
      timeCreated:formattedTime,
      dateUpdated:formattedDate,
      timeUpdated:formattedTime
    }

    try {
      const response = await fetch('http://localhost:3300/api/appointment/save',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token":`Bearer ${authenticationDetails.token}`
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if(responseData.status){
        notify("Appointment scheduled successfully!", 'success');
      }else{
        notify(responseData.error.message , 'error');
      }
    } catch (error) {
      console.error("Error! ", error);
      notify("Something went wrong!", 'error');
    }
  }

  return (
    <div>
      <div className='flex flex-col items-center justify-center h-[80vh] '>
        <div 
            className='flex flex-col p-4 border-[10px] rounded-[15px] border-orange-600 h-[500px] w-[800px]'
            style={{
            backgroundImage: `url(${ImageUrls.chatBgImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            overflowY:'hidden'
            }}    
        >
            <ScrollToBottom className="flex-grow overflow-y-auto">
            <MessageList
                className="message-list"
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={messages}
            />
            </ScrollToBottom>
            <div className='flex items-center justify-between mt-4'>
                <div className='border border-gray-300 w-[700px]'>
                    <Input
                        placeholder="Type here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                        }}
                    />
                </div>
                <div className='duration-300 ease-in-out bg-white rounded-md hover:scale-110' onClick={handleSendMessage}>
                  <Icon type="regular" name="send" color="#2471A3"  size="35px" border="square" />
                </div>
            </div>
        </div>
      </div>
        {symtomCategory.length !== 0 ? (
          <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full text-slate-600' style={{backgroundColor:"rgba(0,0,0,0.2)"}}>
          <div className='w-1/3 bg-white max-h-[80vh] min-h-[390px] rounded-md px-3 py-2 overflow-y-auto'>
            <div className='mt-5'>
              <Lable lableName="Doctors List" />
              <div className='max-h-[45vh] overflow-y-auto'>
                {doctorsList.map((doctor,index) => (
                  <div key={index} className='flex items-center justify-between px-3 py-1'>
                    <p>Dr. {doctor.name}</p>
                    <input 
                      type='checkbox'
                      onChange={() => handleDoctorSelection(doctor.id)} 
                      style={{width:"15px", height:"15px"}}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='mt-5'>
              <Lable lableName="Appointment Date" />
              <InputBox inputType="date" onChnageFunc={handleDateChange}/>
            </div>
            <div className='mt-5'>
              <Lable lableName="Appointment Time" />
              <DropDownList onChangeFunc={handleTimeChange}>
                  {AppointmentTimes.map((timeSlot) => (
                    <option key={timeSlot.id} value={timeSlot.value}>{timeSlot.value}</option>
                  ))}
              </DropDownList>
            </div>
            <div className='flex items-center justify-center gap-10 mt-5'>
              <PrimaryButton 
                buttonTitle="Cansel" 
                buttonColor={Colors.red}
                onClickFunc={handleCanselButton} 
                width="200px"
                style={"transform hover:scale-110 duration-300 ease-in-out"}
              />
              <PrimaryButton 
                buttonTitle="Save" 
                buttonColor={Colors.blue}
                onClickFunc={handleSaveButton}
                width="200px"
                style={"transform hover:scale-110 duration-300 ease-in-out"}
              />
            </div>
          </div>
          </div>
        ): ""}
    </div>
  )
}

export default Chat
