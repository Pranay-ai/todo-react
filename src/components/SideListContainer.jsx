import { useContext } from "react";
import { TaskDataContext } from "../store/TaskDataContext";
import SideListCard from "./SideListCard";
import { useSelector } from "react-redux";

export default function SideListContainer() {
  const taskData=useSelector((state)=>state.task.taskData);
  const isMobile=useSelector((state)=>state.ui.isMobile);
  const isMenuOpen=useSelector((state)=>state.ui.isMenuOpen);


  return (
    <div className="totalSide">
      {(!isMobile || isMenuOpen) && (
        <>
          <div className="NewOption">
            <SideListCard dotted={true} list="New List + " />
          </div>
          <hr />
          <div className="side-list-container">
            {taskData.map((list, index) => {
              return <SideListCard key={index} list={list.name} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}
