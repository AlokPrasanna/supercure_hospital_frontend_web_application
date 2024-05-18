import React from 'react';
import { useSidebar } from '../../../contexts/SidebarContext';
import { Chat, AppointmentCard } from '../../atoms';

const PatientContent = ({userId}) => {
 const { activeId } = useSidebar();

const renderContent = () => {
  switch(activeId) {
    case 'chat':
      return <div><Chat /></div>;
    case 'appointments':
      return <div><AppointmentCard /></div> 
    default:
      return (
        <div><Chat /></div>
      );
  }
};

return (
  <div className=''>
    {renderContent()}
  </div>
);
}

export default PatientContent
