import React from 'react';
import { useSidebar } from '../../../contexts/SidebarContext';
import { LineChart, AppointmentCard } from '../../atoms';

const DoctorContent = () => {
  const { activeId } = useSidebar();

const renderContent = () => {
  switch(activeId) {
    case 'analysis':
      return <div><LineChart /></div>;
    case 'appointments':
      return <div><AppointmentCard /></div> 
    default:
      return (
        <div><AppointmentCard /></div>
      );
  }
};

return (
  <div className=''>
    {renderContent()}
  </div>
);
}

export default DoctorContent
