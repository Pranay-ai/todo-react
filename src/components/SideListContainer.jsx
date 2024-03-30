import { TASK_DATA } from "../assets/task-data";
import SideListCard from "./SideListCard";
export default function SideListContainer() {

  const [currentList, setCurrentList] = useState("New List + ");
  return (
        <div className="totalSide">
            <div className="NewOption"><SideListCard dotted={true} list="New List + " /></div>
            <hr  />
            <div className="side-list-container">

        <>
        {TASK_DATA.map((list, index) => {
            return <SideListCard key={index} list={list.name} />;
        })}

        </>

    </div>
        </div>
       

    
  );
}