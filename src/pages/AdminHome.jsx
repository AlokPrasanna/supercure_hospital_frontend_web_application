import React from 'react'
import { AdminSideBar , AdminHead , AdminContent} from '../components/molecules/admins';
import { Footer } from '../components/atoms';
import { SidebarProvider } from '../contexts/SidebarContext';
import { useParams } from 'react-router-dom';

const AdminHome = () => {
  const {adminId} = useParams();
  return (
    <SidebarProvider>
      <div className='flex'>
        <div className='w-[280px]'>
          <AdminSideBar userId={adminId} />
        </div>
        <div className="flex-grow">
          <AdminHead />
          <AdminContent />
        </div>
        <div className='fixed bottom-0 z-50 w-full'>
            <Footer content="&copy; SuperCure Hospital - All rights reserved" style={`h-[58px] text-[1.1rem] text-slate-200 font-semibold w-full flex items-center justify-center bg-slate-400 bg-opacity-100`} />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default AdminHome

