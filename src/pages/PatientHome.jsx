import React from 'react';
import { useParams } from 'react-router-dom';
import { SidebarProvider } from '../contexts/SidebarContext';
import { PatientHead , PatientSideBar , PatientContent } from '../components/molecules/patient';
import { Footer } from '../components/atoms';


const PatientHome = () => {
  const {patientId} = useParams();
  return (
    <SidebarProvider>
      <div className='flex'>
        <div className='w-[280px]'>
          <PatientSideBar  userId={patientId}/>
        </div>
        <div className="flex-grow">
          <PatientHead />
          <PatientContent />
        </div>
        <div className='fixed bottom-0 z-50 w-full'>
            <Footer content="&copy; SuperCure Hospital - All rights reserved" style={`h-[58px] text-[1.1rem] text-slate-200 font-semibold w-full flex items-center justify-center bg-slate-400 bg-opacity-100`} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PatientHome;
