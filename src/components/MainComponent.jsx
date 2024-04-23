// MainContent.jsx
import SideListContainer from './SideListContainer';
import TaskSection from './TaskSection';
import { useSelector } from 'react-redux';


export default function MainComponent() {
  const isMobile=useSelector((state)=>state.ui.isMobile);
  const isMenuOpen=useSelector((state)=>state.ui.isMenuOpen);

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
