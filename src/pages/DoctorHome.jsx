import React from 'react';
import { DoctorSideBar , DoctorHead , DoctorContent } from '../components/molecules/doctor';
import { SidebarProvider } from '../contexts/SidebarContext';
import { useParams } from 'react-router-dom';
import { Footer } from '../components/atoms';

const DoctorHome = () => {
  const {doctorId} = useParams();
  return (
      <SidebarProvider>
        <div className='flex'>
          <div className='w-[280px]'>
            <DoctorSideBar userId={doctorId}/>
          </div>
          <div className="flex-grow">
            <DoctorHead />
            <DoctorContent />
          </div>
          <div className='fixed bottom-0 z-50 w-full'>
            <Footer content="&copy; SuperCure Hospital - All rights reserved" style={`h-[58px] text-[1.1rem] text-slate-200 font-semibold w-full flex items-center justify-center bg-slate-400 bg-opacity-100`} />
        </div>
        </div>
      </SidebarProvider>  
  )
}

export default DoctorHome
