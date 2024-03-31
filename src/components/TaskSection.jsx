import TaskCard from "./TaskCard";
import tick from "/tickIcon.svg";
import { useRef } from "react";

export default function TaskSection({ list , addNewList, addnewTask, setTaskDone, deleteTask}) {

    const newListRender = () => {
        const NewListRef=useRef();
        function handleSetListName() {
            const listName = NewListRef.current.value;
            if (!listName) return;
            addNewList(listName);
        }
        return (
            <div className="TaskSection">
                <div className="TaskDescription">
                    <h1>Enter Your List Name</h1>
                    <div className="setNewList"><input ref={NewListRef} type="text" placeholder="My List..." />
                    <button onClick={handleSetListName}><img src={tick} alt="" srcset="" /></button></div>
                </div>
                <hr />

            </div>
        );
    };

    const defaultListRender = () => {
        function handleSetTask() {
            const taskName = newTaskRef.current.value;
            if (!taskName) return;
            addnewTask(taskName, list.name);
            newTaskRef.current.value = "";
        }
        const newTaskRef=useRef();
        return (
            <div className="TaskSection">
                <div className="TaskDescription">
                    <h1>{list.name}</h1>
                </div>
                <hr />
                <div className="TaskLists">
                <div className="setNewList"><input  ref={newTaskRef} type="text" placeholder="Add New task" />
                    <button onClick={handleSetTask} ><img src={tick} alt="" srcset="" /></button></div>
                    {list.tasks.map((task) => (
                        <TaskCard taskId={task.id} status={task.done} list={list.name} setTaskDone={setTaskDone} deleteTask={deleteTask} key={task.id} tasks={task.name} />
                    ))}
                </div>
            </div>
        );
    };

    return <>{list ? defaultListRender() : newListRender()}</>;
}