import deleteicon from '/deleticon.svg';
import { TaskDataContext } from '../store/TaskDataContext';
import { useContext } from 'react';
export default function SideListCard({ list,dotted}) {

    const {deleteList,handleChange } = useContext(TaskDataContext);

    function handleDelete() {
        deleteList(list)
    }


    return (
        <div className={`listCard ${dotted ? 'dotted-border' : ''}`}>
            <button onClick={()=>handleChange(list)}><span>{list}</span></button>
            {dotted ? <></>:<button onClick={handleDelete}><img src={deleteicon} alt="" /></button>}
        </div>
    );
}