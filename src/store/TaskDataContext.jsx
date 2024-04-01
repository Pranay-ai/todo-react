import { createContext } from "react";
import { useState, useEffect } from "react";

export const TaskDataContext = createContext(
);

export default function TaskContextProvider({children}){
    const [currentList, setCurrentList] = useState("Shopping List");

    const [taskData, setTaskData] = useState(() => {
      const savedData = localStorage.getItem("taskData");
      return savedData ? JSON.parse(savedData) : [];
    });
  
    useEffect(() => {
      localStorage.setItem("taskData", JSON.stringify(taskData));
    }, [taskData]);
  
    function addNewList(listName) { 
      setTaskData([...taskData, { name: listName, tasks: [] ,id: taskData.length + 1}]);
    }
  
    function setTaskDone(taskId, listName) {
      const newTaskData = taskData.map((list) => {
        if (list.name === listName) {
          return {
            ...list,
            tasks: list.tasks.map((task) => {
              if (task.id === taskId) {
                return { ...task, done: !task.done };
              } else {
                return task;
              }
            }),
          };
        } else {
          return list;
        }
      });
      setTaskData(newTaskData);
    }
  
    function deleteTask(taskId, listName) {
      const newTaskData = taskData.map((list) => {
        if (list.name === listName) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== taskId),
          };
        } else {
          return list;
        }
      });
      console.log('New task data:', newTaskData); // Debugging
      setTaskData(newTaskData);
    }
  
    function addnewTask(taskName, listName) {
      const newTask = { name: taskName ,done: false, id: Math.floor(Math.random() * 90000) + 10000 };// Generates a random 5-digit number};
      const newTaskData = taskData.map((list) => {
        if (list.name === listName) {
          return { ...list, tasks: [...list.tasks, newTask] };
        } else {
          return list;
        }
      });
      setTaskData(newTaskData);
    }
  
    function deleteList(listName) {
      const newTaskData = taskData.filter((list) => list.name !== listName);
      setTaskData(newTaskData);
    }
  
    function  handleChange(list) {
      setCurrentList(list);
  };

  const currentListData = (currentList === "New List +") ? null : taskData.find((listItem) => listItem.name === currentList); 

  return <TaskDataContext.Provider value={{currentListData, taskData, addNewList,addnewTask,deleteList,deleteTask,setTaskDone,handleChange}}>

    {children}
  </TaskDataContext.Provider>
}