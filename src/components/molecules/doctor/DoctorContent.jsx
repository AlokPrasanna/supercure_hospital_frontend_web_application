import React ,{useState , useEffect} from 'react';
import { useSidebar } from '../../../contexts/SidebarContext';
import { LineChart, AppointmentCard } from '../../atoms';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

const DoctorContent = () => {
  const { activeId } = useSidebar();

  const [monthlyAppointmentCounts, setMonthlyAppointmentCounts] = useState({
    months: [],
    counts: []
  });

  const authenticationDetails = {
    userId:localStorage.getItem('userId'),
    token:localStorage.getItem('token')
  };
  
   const [Appointments , setAppointments] = useState([]);
  
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
    // if(activeId === "appointments"){
    //   getAppointments();
    // }
    getAppointments();
  },[]);
  
   const getAppointments = async() => {
    try {
      const response = await fetch(`http://localhost:3300/api/appointment/get/${authenticationDetails.userId}`,{
        method:"GET",
        headers:{
          'token': `Bearer ${authenticationDetails.token}`
        }
      });
  
      const responseData = await response.json();
 
      if(responseData.status){
        setAppointments(responseData.appointments);

        const transformData = responseData.appointments.map( appointment => ({
          id: appointment.id,
          doctor: appointment.doctorName,
          patient:appointment.patientName,
          date:appointment.date,
          time:appointment.time,
        }));
        const monthlyCounts = {};
        transformData.forEach(appointment => {
        const month = moment(appointment.date).format('MMM');
        if (!monthlyCounts[month]) {
          monthlyCounts[month] = 0;
        }
        monthlyCounts[month]++;
        });

        const months = Object.keys(monthlyCounts).sort((a, b) => moment(a, 'MMM').month() - moment(b, 'MMM').month());
        const counts = months.map(month => monthlyCounts[month]);

        setMonthlyAppointmentCounts({ months, counts });
      }else{
        notify(responseData.error.message , 'error');
      }
    } catch (error) {
      console.error("Error! ", error);
      notify("Something went wrong!",'error');
    }
   }

   console.log(Appointments);

const renderContent = () => {
  switch(activeId) {
    case 'analysis':
      return <div><LineChart xLable="Date" yLable="Appointments Count" yMin={0} yValues={monthlyAppointmentCounts.counts} xValues={monthlyAppointmentCounts.months}/></div>;
    case 'appointments':
      return (<div className='flex flex-wrap justify-center mt-10 mb-[60px]'>
                {Appointments.length > 0 ? (
                  Appointments.map((appointment , index) => (
                    <div key={index} className='m-4'>
                      <AppointmentCard 
                        userType="Patient" 
                        patientName={appointment.patientName} 
                        image={appointment.patientImage}
                        date={appointment.date}
                        time={appointment.time}
                        status={appointment.status} 
                      />
                    </div>
                  ))
                ): <p className='flex items-center justify-center w-full  h-[80vh] text-[1.3rem] font-semibold text-red-500'>No appointments found!</p>}
              </div>)  
    default:
      return (<div className='flex flex-wrap justify-center mt-10 mb-[60px]'>
              {Appointments.length > 0 ? (
                Appointments.map((appointment , index) => (
                  <div key={index} className='m-4'>
                    <AppointmentCard 
                      userType="Patient" 
                      patientName={appointment.patientName} 
                      image={appointment.patientImage}
                      date={appointment.date}
                      time={appointment.time}
                      status={appointment.status}
                    />
                  </div>
                ))
              ): <p className='flex items-center justify-center w-full h-[80vh] text-[1.3rem] font-semibold text-red-500'>No appointments found!</p>}
            </div>) 
          }
};

return (
  <div className=''>
    {renderContent()}
  </div>
);
}

export default DoctorContent
