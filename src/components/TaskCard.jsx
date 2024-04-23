import deleteIcon from '/deleticon.svg';
import tick from '/tickIcon.svg'
import { deleteTask,setTaskDone } from '../store/taskSlice';
import { useDispatch } from 'react-redux';
export default function TaskCard({taskId,list, tasks , status}) {

    const dispatch = useDispatch();

    function handleDone() {
        dispatch(setTaskDone({taskId:taskId, listName:list}));
    }

    function handleDelete() {
        dispatch(deleteTask({taskId:taskId, listName:list}));
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