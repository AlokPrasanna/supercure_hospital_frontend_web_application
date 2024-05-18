import React , {useState , useEffect} from 'react';
import { useSidebar } from '../../../contexts/SidebarContext';
import { AdminDashboardCard ,Text , Table, LineChart } from '../../atoms';
import { ImageUrls } from '../../../constants';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


const AdminContent = () => {
  const { activeId } = useSidebar();

  const Token = localStorage.getItem('token');

  const Navigate = useNavigate();

	const [dataCounts , setDataCounts] = useState({
    patient:'00',
    doctors:'00',
    appointments:'00',
	block:'00'
  });

  const [monthlyAppointmentCounts, setMonthlyAppointmentCounts] = useState({
    months: [],
    counts: []
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


  const fetchData = async() => {
		try {
			const response = await fetch('http://localhost:3300/api/users/all',{
				headers:{
					'token': `Bearer ${Token}`
				}
			});

			const data = await response.json();
			if(!data.status){
				Swal.fire({
					title: "Oops...",
					text: "Your token has expired, please login in again!",
					icon: "error",
					showCancelButton: false,
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Login",
					allowOutsideClick: false
				}).then((result) => {
					if (result.isConfirmed) {
					localStorage.setItem('token', "");
					Navigate("/login");
					}
				});
				}else{
				if(data.status){
					const transformData = data.users.map( user => ({
						id: user._id,
						name: user.fullName,
						email:user.emailAddress,
						nic:user.nicNumber,
						tele:user.phoneNumber,
						address:user.address,
						gender:user.gender,
						birthday:user.dateOfBirth,
						userType:user.userType
					}));
				const patientsCount = transformData.filter(user => user.userType === "Patient").length;
				const doctorsCount = transformData.filter(user => user.userType === "Doctor").length;
				const blockCount = transformData.filter(user => user.userType === "Blocked").length;
	
			setDataCounts(prevState => ({
			  ...prevState,
			  patient: patientsCount,
			  doctors: doctorsCount,
			  block: blockCount
			}));
				}else {
					setLoading(false);
					Swal.fire({
					title: "Error...",
					text: "Something went wrong, Try again Later.",
					icon: "error",
					showCancelButton: false,
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Ok",
					allowOutsideClick: false
					}).then((result) => {
					if (result.isConfirmed) {
						localStorage.setItem('token', "");
						Navigate("/login");
					}
					});
				}
			}	
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	const fetchAppointmentData = async() => {
		try {
			const response = await fetch('http://localhost:3300/api/appointment/get/all',{
				headers:{
					'token': `Bearer ${Token}`
				}
			});

			const data = await response.json();

			if(!data.status){
				Swal.fire({
					title: "Oops...",
					text: "Your token has expired, please login in again!",
					icon: "error",
					showCancelButton: false,
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Login",
					allowOutsideClick: false
				}).then((result) => {
					if (result.isConfirmed) {
					localStorage.setItem('token', "");
					Navigate("/login");
					}
				});
				}else{
				if(data.status){
					const transformData = data.appointments.map( appointment => ({
						id: appointment._id,
						doctor: appointment.fullName,
						patient:appointment.emailAddress,
						date:appointment.dateCreated,
						time:appointment.timeCreated,
					}));
					const monthlyCounts = {};
					transformData.forEach(appointment => {
					const month = moment(appointment.date).format('MMM');
					if (!monthlyCounts[month]) {
						monthlyCounts[month] = 0;
					}
					monthlyCounts[month]++;
					});
	
					console.log("Monthly Counts:", monthlyCounts);
	
					const months = Object.keys(monthlyCounts).sort((a, b) => moment(a, 'MMM').month() - moment(b, 'MMM').month());
					const counts = months.map(month => monthlyCounts[month]);
	
					setMonthlyAppointmentCounts({ months, counts });
					const appointmentsCount = transformData.length;
					setDataCounts(prevState => ({
					...prevState,
					appointments: appointmentsCount
					}));      
	
				}else {
					setLoading(false);
					Swal.fire({
					title: "Error...",
					text: "Something went wrong, Try again Later.",
					icon: "error",
					showCancelButton: false,
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Ok",
					allowOutsideClick: false
					}).then((result) => {
					if (result.isConfirmed) {
						localStorage.setItem('token', "");
						Navigate("/login");
					}
					});
				}
			}	
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	useEffect(() => {
		if(Token !== ""){
			fetchData();
			fetchAppointmentData();
		}
	}, []);

  const renderContent = () => {
    switch(activeId) {
      case 'dashboard':
        return (
          <div className='flex flex-col items-center mt-10'>
            <div className='font-bold'>
              <Text content="All Details" size="2rem" />
            </div>
            <div
              className='flex justify-center gap-[80px] mt-[90px]'
            >
              <AdminDashboardCard url={ImageUrls.adminDashboardDoctor} title="Doctors Count" count={dataCounts.doctors < 10 && dataCounts.doctors > 0  ? "0"+dataCounts.doctors : dataCounts.doctors === 0 ? "00" : dataCounts.doctors} />
              <AdminDashboardCard url={ImageUrls.adminDashboardPatient} title="Patients Count" count={dataCounts.patient < 10 && dataCounts.patient > 0 ? "0"+dataCounts.patient : dataCounts.patient === 0 ? "00" : dataCounts.patient} />
              <AdminDashboardCard url={ImageUrls.adminDashboardAppointment} title="Appointments Count" count={dataCounts.appointments < 10 && dataCounts.appointments > 0 ? "0"+dataCounts.appointments : dataCounts.appointments === 0 ? "00" : dataCounts.appointments} />
			  <AdminDashboardCard url={ImageUrls.blockUser} title="Blocked Users Count" count={dataCounts.block < 10 && dataCounts.block > 0 ? "0"+dataCounts.block : dataCounts.block === 0 ? "00" : dataCounts.block} />
            </div>
        </div>
        )
      case 'newUsers':
        return <div><Table title="New Users List" /></div>;
      case 'doctors':
        return <div><Table title="Doctors List" /></div>;
      case 'patients':
        return <div><Table title="Patients List" /></div>;
      case 'appointments':
        return <div><Table title="Appointments List" /></div>
	  case 'blocked':
		return <div><Table title="Blocked List" /></div>
      case 'analysis' :
        return (
            <LineChart xLable="Date" yLable="Appointments Count" yMin={0} yValues={monthlyAppointmentCounts.counts} xValues={monthlyAppointmentCounts.months}/>
        ) 
    }
  };

  console.log(monthlyAppointmentCounts);

  return (
    <div className=''>
      {renderContent()}
    </div>
  );
}

export default AdminContent;
