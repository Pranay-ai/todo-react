import { createPortal } from 'react-dom';
import { TaskDataContext } from '../store/TaskDataContext';
import { useContext } from 'react';
import { forwardRef } from 'react';


const Modal = forwardRef(function Modal(
  { title,list} ,
  ref
) {
  
   function handleDelete(){
    console.log('Delete list:', list);
    deleteList(list);
    close();

   }

  function close() {
    ref.current.close();
  }

  const { deleteList } = useContext(TaskDataContext);

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
