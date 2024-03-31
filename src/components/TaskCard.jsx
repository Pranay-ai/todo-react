import deleteIcon from '/deleticon.svg';
import { TaskDataContext } from '../store/TaskDataContext';
import { useContext } from 'react';
import tick from '/tickIcon.svg'
export default function TaskCard({taskId,list, tasks , status}) {

    const { setTaskDone, deleteTask } = useContext(TaskDataContext);

    function handleDone() {
        setTaskDone(taskId, list);
    }

    function handleDelete() {
        deleteTask(taskId, list);
    }
    return(
    <div className="taskCard">
        <h2 className={status ?  'TaskDone': ''}>{tasks}</h2>
        <div className='TaskIcons'>
        <button onClick={handleDone}><img src={tick} alt="" /></button>
        <button onClick={handleDelete}><img src={deleteIcon} alt="" /></button>
        </div>

        
    </div>
    );
}