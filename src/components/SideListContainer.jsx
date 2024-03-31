import { TaskDataContext } from "../store/TaskDataContext";
import { useContext } from "react";
import SideListCard from "./SideListCard";
export default function SideListContainer({TASK_DATA,taskDelete}) {

    const {taskData, handleChange} = useContext(TaskDataContext);
    


  return (
    
        <div className="totalSide">
            <div className="NewOption"><SideListCard  dotted={true} list="New List + " /></div>
            <hr  />
            <div className="side-list-container">

        <>
        {taskData.map((list, index) => {
            return <SideListCard key={index} list={list.name} />;
        })}

        </>

    </div>
        </div>
       

    
  );
}