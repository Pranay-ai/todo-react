import deleteIcon from '/deleticon.svg';
import tick from '/tickIcon.svg'
export default function TaskCard({ tasks }) {
    return(
    <div className="taskCard">
        <h2>{tasks}</h2>
        <div className='TaskIcons'>
        <button><img src={tick} alt="" /></button>
        <button><img src={deleteIcon} alt="" /></button>
        </div>

        
    </div>
    );
}