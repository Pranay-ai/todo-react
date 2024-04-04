import deleteicon from '/deleticon.svg';
import { TaskDataContext } from '../store/TaskDataContext';
import { useContext , useRef} from 'react';
import Modal from './Modal.jsx';
export default function SideListCard({ list,dotted}) {

    const modalRef = useRef();

    const {handleChange } = useContext(TaskDataContext);

    function handleDelete() {
        modalRef.current.showModal();
    }


    return (
        <div className={`listCard ${dotted ? 'dotted-border' : ''}`}>
            <button onClick={()=>handleChange(list)}><span>{list}</span></button>
            {dotted ? <></>:<button onClick={handleDelete}><img src={deleteicon} alt="" /></button>}
            <Modal title="CONFIRM DELETE" ref={modalRef} list={list}  />
        </div>
    );
}