import React, {useState} from 'react';
import { Text, ButtonWithImageBg, ViewProfile, UpdateProfile,  PrimaryButton } from '../../atoms';
import { Colors } from '../../../constants';
import { useSidebar } from '../../../contexts/SidebarContext';

const PatientSideBar = ({userId}) => {

  const Token = localStorage.getItem('token');
  const { activeId, handleActiveId } = useSidebar();
  const [IsProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [IsUpdatePopupOpen , setIsUpdatePopupOpen] = useState(false);
  const [updateButtonProps , setUpdateButtonProps] = useState({
    update:false,
    clear:false
  });

  const HandleButtonClick = () => {
    setIsProfilePopupOpen(true);
  }

  const HandleClosePopup = () => {
    if(IsProfilePopupOpen){
      setIsProfilePopupOpen(false);
    }
    if(IsUpdatePopupOpen){
      setIsUpdatePopupOpen(false);
      setUpdateButtonProps(prevProps => ({
        ...prevProps,
        update:false,
        clear: true
      }));
    }
  };

  const HandelUpdateButton = () => {
    setIsProfilePopupOpen(false);
    setIsUpdatePopupOpen(true);
  };

  const HandleUpdateButtonFunc = () => {
    setUpdateButtonProps(prevProps => ({
      ...prevProps,
      update: true
    }));
  }
  return (
    <div className='fixed top-0 left-0 w-[280px] h-[100%] z-50 bg-slate-400'>
      <div id='0' className={`h-[150px] font-bold flex items-center justify-center transform transition duration-300 ease-in-out hover:scale-105`} onClick={HandleButtonClick}>
        <ButtonWithImageBg userId={userId} />
      </div>
      <div className='flex justify-center'>
        <div className='w-[100%] flex flex-col items-center font-semibold gap-2'>
          <div
            className={`w-[70%] p-2 mt-[70px] rounded-[10px] hover:bg-yellow-300 group cursor-pointer ${activeId === 'chat' ? 'bg-yellow-600 text-white focus:bg-yellow-600' : 'bg-yellow-500 focus:bg-yellow-600'} transition duration-300 ease-in-out hover:scale-105`}
            onClick={() => handleActiveId('chat')}
          >
            <Text content="Chat" size="1rem" />
          </div>
          <div
            className={`w-[70%] p-2 rounded-[10px] hover:bg-yellow-300 group cursor-pointer ${activeId === 'appointments' ? 'bg-yellow-600 text-white focus:bg-yellow-600' : 'bg-yellow-500 focus:bg-yellow-600'} transition duration-300 ease-in-out hover:scale-105`}
            onClick={() => handleActiveId('appointments')}
          >
            <Text content="Appointments" size="1rem" />
          </div>
        </div>
      </div>
      {IsProfilePopupOpen && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75'>
        <div className='relative p-4 bg-white rounded-lg shadow-xl'>
          <ViewProfile userId={userId} Token={Token} />
          <div className='flex justify-end gap-4 mt-4'>
            <div className='transition duration-300 ease-in-out transform hover:scale-105' onClick={HandleClosePopup}>
              <PrimaryButton buttonTitle="Cancel" buttonType="button" buttonColor={Colors.red} />
            </div>
            <div className='transition duration-300 ease-in-out transform hover:scale-105' onClick={HandelUpdateButton}>
              <PrimaryButton buttonTitle="Update" buttonType="button" buttonColor={Colors.green} />
            </div>
          </div>
        </div>
      </div>
      )}
      {IsUpdatePopupOpen && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75'>
        <div className='relative p-4 bg-white rounded-lg shadow-xl'>
          <UpdateProfile userId={userId} Token={Token} updateValue={updateButtonProps.update} clearValue={updateButtonProps.clear} />
          <div className='flex justify-end gap-4 mt-4'>
            <div className='transition duration-300 ease-in-out transform hover:scale-105' onClick={HandleClosePopup}>
              <PrimaryButton buttonTitle="Cancel" buttonType="button" buttonColor={Colors.red} />
            </div>
            <div className='transition duration-300 ease-in-out transform hover:scale-105' onClick={HandleUpdateButtonFunc}>
              <PrimaryButton buttonTitle="Save" buttonType="button" buttonColor={Colors.blue} />
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default PatientSideBar
