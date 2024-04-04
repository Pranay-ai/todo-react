import { useContext } from "react";
import { TaskDataContext } from "../store/TaskDataContext";
import SideListCard from "./SideListCard";

export default function SideListContainer() {
  const { taskData, isMobile, isMenuOpen, setIsMenuOpen } = useContext(TaskDataContext);

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
