import deleteicon from '/deleticon.svg';
import { TaskDataContext } from '../store/TaskDataContext';
import { useContext , useRef} from 'react';
import Modal from './Modal.jsx';
export default function SideListCard({ list,dotted}) {

    const modalRef = useRef();

    const {handleChange,handleCloseMenu ,isMenuOpen } = useContext(TaskDataContext);

    function handleDelete() {
        modalRef.current.showModal();
    }

    function handleSomeChanges(list){
        console.log("inHandleChange")
        {isMenuOpen && handleCloseMenu();}
        handleChange(list);
    }


    return (
        <div className={`listCard ${dotted ? 'dotted-border' : ''}`}>
            <button onClick={()=>handleSomeChanges(list)}><span>{list}</span></button>
            {dotted ? <></>:<button onClick={handleDelete}><img src={deleteicon} alt="" /></button>}
            <Modal title="CONFIRM DELETE" ref={modalRef} list={list}  />
        </div>
    );
}