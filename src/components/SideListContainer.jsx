
import SideListCard from "./SideListCard";
export default function SideListContainer({whenButton,TASK_DATA}) {

    function handleChange(list) {
        whenButton(list);
    }
    


  return (
    
        <div className="totalSide">
            <div className="NewOption"><SideListCard whenClicked={handleChange} dotted={true} list="New List + " /></div>
            <hr  />
            <div className="side-list-container">

        <>
        {TASK_DATA.map((list, index) => {
            return <SideListCard key={index} whenClicked={handleChange} list={list.name} />;
        })}

        </>

    </div>
        </div>
       

    
  );
}