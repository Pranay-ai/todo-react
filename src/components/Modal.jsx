import { createPortal } from 'react-dom';
import { forwardRef } from 'react';
import { deleteList } from '../store/taskSlice';
import { useDispatch} from 'react-redux';


const Modal = forwardRef(function Modal(
  { title,list} ,
  ref
) {
  
   function handleDelete(){
    console.log('Delete list:', list);
    dispatch(deleteList(list));
    close();

   }

  function close() {
    ref.current.close();
  }

  const dispatch = useDispatch();

  return createPortal(
    <dialog id="modal" ref={ref}>
      <h2>{title}</h2>
      <div className='ModalOptions'>
        <button onClick={handleDelete}>OK</button>
        <button onClick={close}>Cancel</button>
      </div>
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
