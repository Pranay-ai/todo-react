import TaskCard from "./TaskCard";
import { TaskDataContext } from "../store/TaskDataContext";
import { useContext } from "react";
import tick from "/tickIcon.svg";
import { useRef } from "react";

export default function TaskSection() {
    const {currentListData,addNewList,addnewTask,taskData,handleChange} = useContext(TaskDataContext);
    const newListRender = () => {
        const NewListRef=useRef();
        function handleSetListName() {
            const listName = NewListRef.current.value;
            const listIndex = taskData.findIndex(list => list.name.toLowerCase() === listName.toLowerCase());
            console.log(listIndex);
            if (listIndex === -1) {
                addNewList(listName);
                handleChange(listName);
            }
            if(listIndex !== -1){
                handleChange(taskData[listIndex].name);
            }
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
            addnewTask(taskName, currentListData.name);
            newTaskRef.current.value = "";
        }
        const newTaskRef=useRef();
        return (
            <div className="TaskSection">
                <div className="TaskDescription">
                    <h1>{currentListData.name}</h1>
                </div>
                <hr />
                <div className="TaskLists">
                <div className="setNewList"><input  ref={newTaskRef} type="text" placeholder="Add New task" />
                    <button onClick={handleSetTask} ><img src={tick} alt="" srcset="" /></button></div>
                    {currentListData.tasks.map((task) => (
                        <TaskCard taskId={task.id} status={task.done} list={currentListData.name}  key={task.id} tasks={task.name} />
                    ))}
                </div>
            </div>
        );
    };

    return <>{currentListData ? defaultListRender() : newListRender()}</>;
}