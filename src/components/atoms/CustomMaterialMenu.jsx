import React, { useState } from 'react';
import { ContextMenu , MenuItem , ContextMenuTrigger } from 'react-contextmenu';
import Icon from './Icon';
import Text from './Text';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomMaterialMenu = ({row , columType , fetchDataCallback , Token}) => {
    const id = row.id;
    const ColumType  = columType ? columType : "user";

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

    const handleItemClick = (e, data) => {
        const { action } = data;
        switch (action) {
          case 'deleteUser':
            DeleteUser();
            break;
          case 'blockUser':
            UpdateUser("Blocked");
            break;
          case 'setPatient':
            UpdateUser("Patient");
            break;
          case 'setDoctor':
            UpdateUser("Doctor");
            break;
        }
  };

    const UpdateUser = async(userType) => {
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
              Update(userType);
            }
          });
    }

    const Update = async(userType) => {
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
      
        const data ={
            userType:userType,
            dateUpdated:formattedDate,
            timeUpdated:formattedTime
        };
        console.log(data);
        try {
            const response = await fetch(`http://localhost:3300/api/users/update/${id}`,{
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json',
                    'token': `Bearer ${Token}`
                },
                body:JSON.stringify(data)
            });

            if(response.ok){
                notify("Data update Successfully!", 'success');
                fetchDataCallback(); 
            }else{
                notify("Failed to Update Data!", 'error');
            }
        } catch (error) {
            console.error('Error updating Data:', error);
            notify("Failed to Update Data!", 'error');
        }
    }

    const DeleteUser = async() => {
        Swal.fire({
            title: "Are you sure to delete user?",
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
            }
            else{
              Delete();
            }
          });
    }

    const Delete = async() => {
      try {
        const response = await fetch(`http://localhost:3300/api/users/delete/${id}`,{
          method: 'DELETE',
          headers:{
            'token': `Bearer ${Token}`
          }
        });

        if(response.ok){
          notify("User Delete Successfully!", 'success');
          fetchDataCallback(); 
        }else{
          notify("Failed to delete user!", 'error');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        notify("Failed to delete user!", 'error');
      }
    }
  return (
    <div>
        <div className='hover:text'>
            <ContextMenuTrigger id={`custom-menu-${row.id}`}>
                <Icon
                    type="regular"
                    name="dots-vertical-rounded"
                    color="#000000"
                    size="25px"
                    border="none"
                    animation="burst-hover"
                />
            </ContextMenuTrigger>
        </div>
      {ColumType === "user" ? (
        <div>
        <ContextMenu id={`custom-menu-${row.id}`}>
            <MenuItem data={{ action: 'deleteUser' }} onClick={handleItemClick}>
                <div className='w-[200px] h-10 border-b-[4px] border-yellow-400 bg-slate-500 flex justify-between hover:bg-slate-400 px-2 py-1'>
                    <div className='p-1 '>
                        <Text content="Delete User" size="1rem" color="white" />
                    </div>
                    <div className='p-1'>
                        <Icon type="regular" name="user-x" color="white" />
                    </div>
                </div>
            </MenuItem>
            <MenuItem data={{ action: 'setDoctor' }} onClick={handleItemClick}>
                <div className='w-[200px] h-10 border-b-[4px] border-yellow-400 bg-slate-500 flex justify-between hover:bg-slate-400 px-2 py-1'>
                    <div className='p-1 '>
                        <Text content="Set as doctor" size="1rem" color="white" />
                    </div>
                    <div className='p-1'>
                        <Icon type="regular" name="plus-circle" color="white" />
                    </div>
                </div>
            </MenuItem>
            <MenuItem data={{ action: 'setPatient' }} onClick={handleItemClick}>
                <div className='w-[200px] h-10 border-b-[4px] border-yellow-400 bg-slate-500 flex justify-between hover:bg-slate-400 px-2 py-1'>
                    <div className='p-1 '>
                        <Text content="Set as patient" size="1rem" color="white" />
                    </div>
                    <div className='p-1'>
                        <Icon type="regular" name="heart-circle" color="white" />
                    </div>
                </div>
            </MenuItem>
            <MenuItem data={{ action: 'blockUser' }} onClick={handleItemClick}>
                <div className='w-[200px] h-10 border-b-[4px] border-yellow-400 bg-slate-500 flex justify-between hover:bg-slate-400 px-2 py-1'>
                    <div className='p-1 '>
                        <Text content="Block" size="1rem" color="white" />
                    </div>
                    <div className='p-1'>
                        <Icon type="regular" name="lock-alt" color="white" />
                    </div>
                </div>
            </MenuItem>
        </ContextMenu>
      </div>
      ) : columType === "appointments" ? (
        <div>
        <ContextMenu id={`custom-menu-${row.id}`}>
            <MenuItem data={{ action: 'cancelAccess' }} onClick={handleItemClick}>
                <div className='w-[200px] h-10 border-b-[4px] border-yellow-400 bg-slate-500 flex justify-between hover:bg-slate-400 px-2 py-1'>
                    <div className='p-1 '>
                        <Text content="Cansel Appointment" size="1rem" color="white" />
                    </div>
                    <div className='p-1'>
                        <Icon type="regular" name="calendar-minus" color="white" />
                    </div>
                </div>
            </MenuItem>
            <MenuItem data={{ action: 'setDoctor' }} onClick={handleItemClick}>
                <div className='w-[200px] h-10 border-b-[4px] border-yellow-400 bg-slate-500 flex justify-between hover:bg-slate-400 px-2 py-1'>
                    <div className='p-1 '>
                        <Text content="Delete Appointment" size="1rem" color="white" />
                    </div>
                    <div className='p-1'>
                        <Icon type="regular" name="calendar-x" color="white" />
                    </div>
                </div>
            </MenuItem>
        </ContextMenu>
      </div>
      ): null}
    </div>
  )
}

export default CustomMaterialMenu
