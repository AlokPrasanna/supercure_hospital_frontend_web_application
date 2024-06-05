import React , {useEffect, useState} from 'react';
import 'react-chat-elements/dist/main.css';
import { MessageList, Input ,MessageBox , Button } from 'react-chat-elements';
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
import DoctorDetailsCard from './DoctorDetailsCard';

const Chat = () => {
  const authenticationDetails = {
    userId:localStorage.getItem('userId'),
    token:localStorage.getItem('token')
  };

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [symtomCategory , setSymtomCategory] = useState("Cardiology");
  const [doctorsList , setDoctorsList] = useState([]);
  const [appointmentDetails , setAppointmentDetails] = useState({
    doctorId:'',
    date:'',
    time:AppointmentTimes[0].value
  });

  const [welcome , setWelcome] = useState('');

  const [IconName , setIconName] = useState("chevron-down");
  const [showDoctorList , setshowDoctorList] = useState(false);
  const [ShowDoctorDetails , setShowDoctorDetails] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    console.log("Stored messages", storedMessages);
    if (storedMessages) {  // Check if storedMessages is not null
        try {
            const parsedMessages = JSON.parse(storedMessages); // Parse the stored messages
            if (Array.isArray(parsedMessages) && parsedMessages.length > 0) { // Check if parsedMessages is a non-empty array
                const updatedMessages = parsedMessages.map((msg) => ({
                    ...msg,
                    position: msg.sender === 'user' ? 'right' : 'left',
                }));
                setMessages(updatedMessages);
                console.log(updatedMessages);
            } else {
                handleSendMessage();
            }
        } catch (error) {
            console.error("Failed to parse stored messages:", error);
            handleSendMessage();
        }
    } else {
        handleSendMessage();
    }
}, []);

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
    if(symtomCategory.length > 0){
      getDoctorsList();
    }
  },[symtomCategory]);

 const messageList = [
  {
    id:0,
    message:welcome,
    showButton: false
  },
  {
    id:9,
    message:"To schedule an appointment, click button below",
    showButton: true
  },
  {
    id:2,
    message:"Do you have any other symptoms or concerns?",
    showButton: false
  },
  {
    id:3,
    message:"Don't worry. I will help you find a doctor. First, tell me your symptoms.",
    showButton: false
  },
  {
    id:4,
    message:"Unable to process your request at the moment. Please check your internet connection and try again.",
    showButton: false
  },{
    id:5,
    message:"Your appointment has been scheduled.",
    showButton: false
  },
  {
    id:6,
    message:"First, tell me your symptoms. Then, you will be shown a button labeled 'Schedule Appointment'. By clicking that, you can choose your doctor and create an appointment.",
    showButton: false
  },{
    id:7,
    message:"Your message can't recognize me. Could you please send that message again?",
    showButton: false
  },{
    id:8,
    message:"Hello! How can I assist you?",
    showButton: false
  },
  {
    id:1,
    message:`Our system suggests that a ${symtomCategory} is the best specialist for your symptoms.`,
    showButton: false
  },
  {
    id:10,
    message:"I'm sorry, but I'm unable to provide that kind of information. If you have any other questions or need assistance with your symptoms, feel free to ask. I'm here to help!",
    showButton:false
  },{
    id:11,
    message:"My name is Care Bot. You can call me as just Bot.",
    showButton: false
  },{
    id:12,
    message:"You're welcome. Do you have any other symptoms or concerns? Please tell me. I'm here to help you.",
    showButton:false
  },{
    id:13,
    message:"Thank you for using our service. If you have further questions, please don't hesitate to ask. Have a wonderful day! Goodbye!",
    showButton:false
  }
  ,{
    id:14,
    message:"Ok, If you have further questions, please don't hesitate to ask. Have a wonderful day! Goodbye!",
    showButton:false
  }
 ]

 const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good Morning';
  } else if (currentHour < 15) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
};
  
const handleSendMessage = () => {
  if (welcome === '' && messages.length === 0) {

    setTimeout(() => {
      const welcomeMessage = `Hi, ${getGreeting()}! Please describe your symptoms, and I'll help you find the right doctor.`;
      setWelcome(welcomeMessage);
      setMessages([...messages, { position: 'left', title: 'Chat Bot', type: 'text', sender: 'bot', text: welcomeMessage, date: new Date(), showButton: false, buttonDisable: false }]);
    }, 2500);

  } else if (inputText.trim() !== '') {
    const newMessage = {
      position: 'right',
      type: 'text',
      title: 'You',
      text: inputText,
      date: new Date(),
      sender: 'user',
      showButton: false,
      buttonDisable: false
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputText('');
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

    // Check for specific keywords to generate automated replies
    let selectedReplies = [];
    if (['hi', 'Hi', 'welcome'].some(keyword => inputText.toLowerCase().includes(keyword))) {
      selectedReplies = messageList.filter(message => message.id === 8);
    } else if (['other symptoms', 'other'].some(keyword => inputText.toLowerCase().includes(keyword))) {
      selectedReplies = messageList.filter(message => message.id === 2);
    } else if (['doctor', 'how to find doctor', 'find doctor'].some(keyword => inputText.toLowerCase().includes(keyword))) {
      selectedReplies = messageList.filter(message => message.id === 3);
    } else if (['create appointment', 'appointment', 'new appointment'].some(keyword => inputText.toLowerCase().includes(keyword))) {
      selectedReplies = messageList.filter(message => message.id === 6);
    } else if (['contact information', 'email', 'contact number', 'telephone number', 'telephone'].some(keyword => inputText.toLowerCase().includes(keyword))) {
      selectedReplies = messageList.filter(message => message.id === 10);
    } else if (['name', 'your name', 'what is your name', 'tell me your name'].some(keyword => inputText.toLowerCase().includes(keyword))) {
      selectedReplies = messageList.filter(message => message.id === 11);
    } else if (['thank you', 'thanks for your help', 'thanks', 'for your help', 'your help'].some(keyword => inputText.toLowerCase().includes(keyword))) {
      selectedReplies = messageList.filter(message => message.id === 12);
    } else if (['bye', 'tc', 'take care', 'have a nice day', 'have a great day', 'goodbye', 'good night'].some(keyword => inputText.toLowerCase().includes(keyword))) {
      selectedReplies = messageList.filter(message => message.id === 13);
    } else if (['no', 'I am good', "I'm good", 'No any pain'].some(keyword => inputText.toLowerCase().includes(keyword))) {
      const updatedMessages = messages.map(msg => {
        if (msg.showButton) {
          return { ...msg, buttonDisable: true };
        }
        return msg;
      });

      setMessages(updatedMessages);
      localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));

      selectedReplies = messageList.filter(message => message.id === 14);
    } else {
      selectedReplies = messageList.filter(message => [1, 9].includes(message.id));
      selectedReplies.sort((a, b) => a.id - b.id);
    }

    setTimeout(() => {
      if (selectedReplies.length > 0) {
        const automatedReplies = selectedReplies.map(reply => {
          let messageText = reply.message;
          return {
            position: 'left',
            title: 'Care Bot',
            type: 'text',
            sender: 'bot',
            date: new Date(),
            text: messageText,
            showButton: reply.showButton,
            buttonDisable: false
          };
        });
        const finalMessages = [...updatedMessages, ...automatedReplies];
        setMessages(finalMessages);
        localStorage.setItem('chatMessages', JSON.stringify(finalMessages));
      }
    }, 1000);
  }
};

const handelShowDoctorList = () => {
  setshowDoctorList(true);
  setSymtomCategory("Cardiology")
}

  console.log("INput text ",inputText)

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
          const doctors = data.doctors.map((doctor) => {
            const details = data.details.find(detail => detail.doctorId === doctor._id);
            return {
              id: doctor._id,
              name: doctor.name,
              degree: details.degree,
              specialties: details.specialty
            };
          });
  
          setDoctorsList(doctors);
        }else{
          notify(data.error.message , "warning");
          console.log(data.error.message);
        }
      } catch (error) {
        console.error("Error! ", error);
        notify("Something went wrong!" , "error");
      }
  }

  console.log(doctorsList)

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

  const handelIconName = (doctor) => {
    setSelectedDoctor(doctor);
    setIconName("chevron-right");
    setShowDoctorDetails(true);
  };
  
  const handelCanselIcon = () => {
    setIconName("chevron-down");
    setShowDoctorDetails(false);
  }

  const handleCanselButton = () => {
    setSymtomCategory([]);
    setAppointmentDetails({
      doctorId:'',
      date:'',
      time:AppointmentTimes[0].value
    });
    const canselMessage = messageList.find(message => message.id === 2);
    setTimeout(() => {
      const newMessage = {
        position: 'left',
        title: 'Care Bot',
        type: 'text',
        sender: 'bot',
        date: new Date(),
        text: canselMessage.message,
        showButton: canselMessage.showButton,
        buttonDisable: false
      };

      const finalMessages = [...messages, newMessage];

      setMessages(finalMessages);
      localStorage.setItem('chatMessages', JSON.stringify(finalMessages));
    })
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
        setshowDoctorList(false);

        const updatedMessages = messages.map(msg => {
          if (msg.showButton) {
            return { ...msg, buttonDisable: true };
          }
          return msg;
        });

        const thankYouMessage = messageList.find(message => message.id === 5);
        setTimeout(() => {
          const newMessage = {
            position: 'left',
            title: 'Care Bot',
            type: 'text',
            sender: 'bot',
            date: new Date(),
            text: thankYouMessage.message,
            showButton: thankYouMessage.showButton,
            buttonDisable: false
          };
    
          const finalMessages = [...updatedMessages, newMessage];
    
          setMessages(finalMessages);
          localStorage.setItem('chatMessages', JSON.stringify(finalMessages));
        },1000)
      }else{
        notify(responseData.error.message , 'error');
      }
    } catch (error) {
      console.error("Error! ", error);
      notify("Something went wrong!", 'error');
      setshowDoctorList(false);

      const errorMessage = messageList.find(message => message.id === 4);

      setTimeout(() => {
        const newMessage = {
          position: 'left',
          title: 'Care Bot',
          type: 'text',
          sender: 'bot',
          date: new Date(),
          text: errorMessage.message,
          showButton: errorMessage.showButton,
          buttonDisable: false
        };
  
        const finalMessages = [...messages, newMessage];
  
        setMessages(finalMessages);
        localStorage.setItem('chatMessages', JSON.stringify(finalMessages));
      })
    }
  }

  const handelClearButton = () => {
    localStorage.setItem('chatMessages', '');
    setMessages([]);
  }
  
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-[80vh] '>
        <div className='flex  w-[800px] justify-end items-center h-12 p-2'>
          <PrimaryButton 
            buttonTitle="Clear Chat" 
            width="120px"
            onClickFunc={handelClearButton} 
            style={"flex items-center bg-green-600 duration-300 justify-center hover:bg-slate-900"}
          />
        </div>
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
              {messages.map((msg,index) => (
                <div key={index}>
                  <MessageBox 
                    key={index}
                    position={msg.position}
                    title={msg.title}
                    type={msg.type}
                    text={msg.text}
                    date={msg.date}
                    />
                    {msg.showButton === true && (
                      <div className='mt-1 mb-1 ml-5'>
                        <Button
                          position={msg.position}
                          text='Shedule Appointment'
                          onClick={handelShowDoctorList}
                          backgroundColor='#F6C324'
                          color='#000000'
                          disabled={msg.buttonDisable}
                        />
                      </div>
                    )}
                </div>
              ))}
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
                <div className='duration-300 ease-in-out bg-white rounded-md cursor-pointer hover:scale-110' onClick={handleSendMessage}>
                  <Icon type="regular" name="send" color="#2471A3"  size="35px" border="square" />
                </div>
            </div>
        </div>
      </div>
        {showDoctorList && symtomCategory.length !== 0 ? (
          <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full text-slate-600' style={{backgroundColor:"rgba(0,0,0,0.2)"}}>
          <div className='w-1/3 bg-white max-h-[80vh] min-h-[390px] rounded-md px-3 py-2 overflow-y-auto'>
            <div className='mt-5'>
              <Lable lableName="Doctors List" />
              <div className='max-h-[45vh] overflow-y-auto'>
                <div>
                {doctorsList.map((doctor,index) => (
                  <div key={index} className='flex items-center justify-between px-3 py-1'>
                    <div className='flex items-center gap-4'>
                      <Icon type="regular" name={IconName} color="#2471A3"  size="35px" border="none" onClickFunc={() => handelIconName(doctor)} />
                      <p>Dr. {doctor.name}</p>
                    </div>
                    <input 
                      type='checkbox'
                      checked={appointmentDetails.doctorId === doctor.id}
                      onChange={() => handleDoctorSelection(doctor.id)} 
                      style={{width:"15px", height:"15px"}}
                    />
                  </div>
                ))}
                {ShowDoctorDetails && selectedDoctor && (
                        <div className='flex items-center justify-center w-full h-full px-3 py-2'>
                          <DoctorDetailsCard
                            name={selectedDoctor.name}
                            degree={selectedDoctor.degree}
                            specialties={selectedDoctor.specialties}
                            onClickFunc={handelCanselIcon} 
                          />
                        </div>
                      )}
                </div>
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
