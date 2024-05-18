import React, {useState} from 'react';
import { Text, ButtonWithImageBg, ViewProfile, UpdateProfile,  PrimaryButton } from '../../atoms';
import { Colors } from '../../../constants';
import { useSidebar } from '../../../contexts/SidebarContext';

const DoctorSideBar = ({userId}) => {
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
  }

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
            onClick={() => handleActiveId('appointment')}
          >
            <Text content="Appointments" size="1rem" />
          </div>
          <div
            className={`w-[70%] p-2 rounded-[10px] hover:bg-yellow-300 group cursor-pointer ${activeId === 'appointments' ? 'bg-yellow-600 text-white focus:bg-yellow-600' : 'bg-yellow-500 focus:bg-yellow-600'} transition duration-300 ease-in-out hover:scale-105`}
            onClick={() => handleActiveId('analysis')}
          >
            <Text content="Analysis" size="1rem" />
          </div>
        </div>
      </div>
      {IsProfilePopupOpen && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full'>
          <div className='absolute p-4'>
            <ViewProfile userId={userId}/>
          </div>
          <div className='z-50 flex items-end h-[520px] gap-8 mb-5 ml-56 '>
            <div className='transition duration-300 ease-in-out transform hover:scale-105' onClick={HandleClosePopup} >
              <PrimaryButton buttonTitle="Cansel" buttonType="submit" buttonColor={Colors.red} />
            </div>
            <div className='transition duration-300 ease-in-out transform hover:scale-105' onClick={HandelUpdateButton}>
              <PrimaryButton buttonTitle="Update" buttonType="submit" buttonColor={Colors.green} />
            </div>
          </div>
        </div>
      )}
      {IsUpdatePopupOpen && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full'>
          <div className='absolute p-4'>
            <UpdateProfile  userId={userId} updateValue={updateButtonProps.update} clearValue={updateButtonProps.clear}/>
          </div>
          <div className='z-50 flex items-end h-[520px] gap-8 mt-5 ml-56 '>
            <div className='transform hover:scale-110' onClick={HandleClosePopup} >
              <PrimaryButton buttonTitle="Cansel" buttonType="submit" buttonColor={Colors.red} />
            </div>
            <div className='transform hover:scale-110' onClick={HandleUpdateButtonFunc}>
              <PrimaryButton buttonTitle="Save" buttonType="submit" buttonColor={Colors.blue} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorSideBar
