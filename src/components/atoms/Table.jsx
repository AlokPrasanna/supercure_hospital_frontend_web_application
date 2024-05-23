import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import CustomMaterialMenu from './CustomMaterialMenu';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Table = ({title}) => {
	const [pending , setPending] = useState(true);
	const [allData,setData] = useState([]);
	const [filteredData , setFilteredData] = useState([]);
	const [appointmentData , setAppointmentData] = useState([]);

	const Token = localStorage.getItem('token');

  	const Navigate = useNavigate();


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

	  const userColums = [
		{name: "Name", selector: row => row.name},
		{name:"Email" , selector: row => row.email},
		{name:"NIC" , selector: row => row.nic},
		{name:"Telephone" , selector: row => row.tele},
		{name:"Address" , selector: row => row.address},
		{name:"Gender" , selector: row => row.gender},
		{name:"Birthday" , selector: row => row.birthday},
		{
			cell: row => <CustomMaterialMenu 
				row={row} 
				fetchDataCallback={fetchDataCallback}
				Token={Token} 
				image={row.image}/>,
			width: '56px',
		},
	];
	
	const appointmentsColums = [
		{name: "Doctor", selector: row => row.doctor},
		{name:"Patient" , selector: row => row.patient},
		{name:"Date" , selector: row => row.date},
		{name:"Time" , selector: row => row.time},
		{name:"Status" , selector: row => row.status},
		{
			cell: row => <CustomMaterialMenu 
				row={row} 
				columType="appointments" 
				fetchDataCallback={fetchDataCallback} 
				Token={Token}/>,
			width: '60px',
		},
	];
	
	const customStyles = {
		headRow: {
			style: {
				border: 'none',
			},
		},
		headCells: {
			style: {
				color: '#202124',
				fontSize: '14px',
			},
		},
		rows: {
			highlightOnHoverStyle: {
				backgroundColor: 'rgb(230, 244, 244)',
				borderBottomColor: '#FFFFFF',
				borderRadius: '25px',
				outline: '1px solid #FFFFFF',
			},
		},
		pagination: {
			style: {
				border: 'none',
			},
		},
	};
	
	const fetchDataCallback = () => {
		fetchData();
		fetchAppointmentData();
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
						image:user.imageUrl ? user.imageUrl : "",
						name: user.fullName,
						email:user.emailAddress,
						nic:user.nicNumber,
						tele:user.phoneNumber,
						address:user.address,
						gender:user.gender,
						birthday:user.dateOfBirth,
						userType:user.userType
					}));
	
					setData(transformData);
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
					const userMap = allData.reduce((map, user) => {
						map[user.id] = user.name;
						return map;
					}, {});
	
					const transformData = data.appointments.map( appointment => ({
						id: appointment._id,
						doctor: userMap[appointment.doctorId] || appointment.doctorId,
						patient:userMap[appointment.patientId] || appointment.patientId,
						date:appointment.appointmentDate,
						time:appointment.appointmentTime,
						status:appointment.appointmentState ? appointment.appointmentState : "",
					}));
	
					setAppointmentData(transformData);
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
		fetchData();
	}, []);

	useEffect(() => {
		if(allData.length > 0){
			fetchAppointmentData();
		}
	},[allData])

	useEffect(() => {
		if(title === "Doctors List"){
			setFilteredData(allData.filter(user => user.userType === "Doctor"));
		}else if(title === "Patients List"){
			setFilteredData(allData.filter(user => user.userType === "Patient"));
		}else if(title === "New Users List"){
			setFilteredData(allData.filter(user => user.userType === "NewUser"));
		}else if(title === "Blocked List"){
			setFilteredData(allData.filter(user => user.userType === "Blocked"));
		}
	},[title , allData]);

	useEffect (() => {
		const Timeout = setTimeout(() => {
			//setRows(d);
			setPending(false);
		}, 2000);
		return () => clearTimeout(Timeout);
	},[]);

  return (
    <div className='flex flex-col items-center justify-center w-full p-3'>
      <DataTable
	  		title={<span style={{ color: 'black', fontWeight:'600', fontSize: '20px', display:'flex', justifyContent:'center' , alignItems:'center' }}>{title}</span>}
			columns={title === "Appointments List" ? appointmentsColums : userColums}
			data={title === "Appointments List" ? appointmentData : filteredData}
			progressPending={pending}
			pagination
			customStyles={customStyles}
			highlightOnHover
			pointerOnHover
		/>
    </div>
  )
}

export default Table
