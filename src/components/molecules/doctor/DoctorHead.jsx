import React from 'react';
import { Icon } from '../../atoms';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const DoctorHead = () => {
  const Navigate = useNavigate();

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

  return (
    <div className="h-[58px] bg-slate-400">
      <div className='flex items-center justify-end h-full mr-14 '>
        <div className='flex items-center justify-center duration-300 ease-in-out transform rounded-md cursor-pointer hover:bg-red-600' onClick={HandelLogout}>
          <Icon type="regular" name="log-out-circle" color="white"  size="35px" border="square" />
        </div>
      </div>
    </div>
  )
}

export default DoctorHead
