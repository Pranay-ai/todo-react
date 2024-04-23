import deleteicon from '/deleticon.svg';
import {  useRef} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Modal from './Modal.jsx';
import { uiActions } from '../store/uiSlice';
export default function SideListCard({ list,dotted}) {

    const modalRef = useRef();
    const dispatch=useDispatch();

    const isMenuOpen=useSelector((state)=>state.ui.isMenuOpen);



    function handleDelete() {
        modalRef.current.showModal();
    }

    function handleSomeChanges(list){
        console.log("inHandleChange")
        {isMenuOpen && dispatch(uiActions.handleCloseMenu())}
        dispatch(uiActions.handleChange(list));
    }


    return (
        <div className={`listCard ${dotted ? 'dotted-border' : ''}`}>
            <button onClick={()=>handleSomeChanges(list)}><span>{list}</span></button>
            {dotted ? <></>:<button onClick={handleDelete}><img src={deleteicon} alt="" /></button>}
            <Modal title="CONFIRM DELETE" ref={modalRef} list={list}  />
        </div>
    );
}