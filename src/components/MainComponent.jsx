// MainContent.jsx
import React, { useContext } from 'react';
import SideListContainer from './SideListContainer';
import TaskSection from './TaskSection';
import { TaskDataContext } from '../store/TaskDataContext';

export default function MainComponent() {
  const { isMenuOpen, isMobile } = useContext(TaskDataContext);

  if (isMobile) {
    return (
      <div className="SuperContainer">
        {isMenuOpen && <SideListContainer />}
        {!isMenuOpen && <TaskSection />}
      </div>
    );
  } else {
    return (
      <div className="SuperContainer">
        <SideListContainer />
        <TaskSection />
      </div>
    );
  }
}
