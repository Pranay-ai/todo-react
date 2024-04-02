// import { createContext } from "react";
// import { useState, useEffect } from "react";

// export const TaskDataContext = createContext(
// );

// export default function TaskContextProvider({children}){
//     const [currentList, setCurrentList] = useState("Shopping List");

//     const [taskData, setTaskData] = useState(() => {
//       const savedData = localStorage.getItem("taskData");
//       return savedData ? JSON.parse(savedData) : [];
//     });
  
//     useEffect(() => {
//       localStorage.setItem("taskData", JSON.stringify(taskData));
//     }, [taskData]);
  
//     function addNewList(listName) { 
//       setTaskData([...taskData, { name: listName, tasks: [] ,id: taskData.length + 1}]);
//     }
  
//     function setTaskDone(taskId, listName) {
//       const newTaskData = taskData.map((list) => {
//         if (list.name === listName) {
//           return {
//             ...list,
//             tasks: list.tasks.map((task) => {
//               if (task.id === taskId) {
//                 return { ...task, done: !task.done };
//               } else {
//                 return task;
//               }
//             }),
//           };
//         } else {
//           return list;
//         }
//       });
//       setTaskData(newTaskData);
//     }
  
//     function deleteTask(taskId, listName) {
//       const newTaskData = taskData.map((list) => {
//         if (list.name === listName) {
//           return {
//             ...list,
//             tasks: list.tasks.filter((task) => task.id !== taskId),
//           };
//         } else {
//           return list;
//         }
//       });
//       console.log('New task data:', newTaskData); // Debugging
//       setTaskData(newTaskData);
//     }
  
//     function addnewTask(taskName, listName) {
//       const newTask = { name: taskName ,done: false, id: Math.floor(Math.random() * 90000) + 10000 };// Generates a random 5-digit number};
//       const newTaskData = taskData.map((list) => {
//         if (list.name === listName) {
//           return { ...list, tasks: [...list.tasks, newTask] };
//         } else {
//           return list;
//         }
//       });
//       setTaskData(newTaskData);
//     }
  
//     function deleteList(listName) {
//       const newTaskData = taskData.filter((list) => list.name !== listName);
//       setTaskData(newTaskData);
//     }
  
//     function  handleChange(list) {
//       setCurrentList(list);
//   };

//   const currentListData = (currentList === "New List +") ? null : taskData.find((listItem) => listItem.name === currentList); 

//   return <TaskDataContext.Provider value={{currentListData, taskData, addNewList,addnewTask,deleteList,deleteTask,setTaskDone,handleChange}}>

//     {children}
//   </TaskDataContext.Provider>
// }



import { createContext, useEffect, useReducer } from "react";


export const TaskDataContext = createContext();

const initialState = {
  currentList: "Shopping List",
  taskData: JSON.parse(localStorage.getItem("taskData")) || [],
};


function reducer(state,action){
    switch(action.type){
        case "Add-New-List": return {
            ...state,
            taskData:[...state.taskData, {name:action.payload, tasks:[], id: state.taskData.length + 1}],

        };
        case "Set-Task-Done": return {
            ...state,
            taskData: state.taskData.map((list) => {
                if (list.name === action.payload.listName) {
                    return {
                        ...list,
                        tasks: list.tasks.map((task) => {
                            if (task.id === action.payload.taskId) {
                                return { ...task, done: !task.done };
                            } else {
                                return task;
                            }
                        }),
                    };
                } else {
                    return list;
                }
            }),
        };
        case "Delete-Task": return {
            ...state,
            taskData: state.taskData.map((list)=>{
                if(list.name === action.payload.listName){
                    return {
                        ...list,
                        tasks: list.tasks.filter((task) => task.id !== action.payload.taskId),
                    };
                } else {
                    return list;
                }
            })
        };
        case "Add-New-Task": return {
            ...state,
            taskData: state.taskData.map((list) => {
                if (list.name === action.payload.listName) {
                    return {
                        ...list,
                        tasks: [...list.tasks, {name: action.payload.taskName, done: false, id: Math.floor(Math.random() * 90000) + 10000}],
                    };
                } else {
                    return list;
                }
            }),
        };
        case "Delete-List": return {
            ...state,
            taskData: state.taskData.filter((list) => list.name !== action.payload),
            currentList: "New List +",
        };
        case "Change-List": return {
            ...state,
            currentList: action.payload,
        };
    }
}

export default function TaskContextProvider({ children }) {
    const [state, dispatch]= useReducer(reducer,initialState);

    useEffect(() => {
        localStorage.setItem("taskData", JSON.stringify(state.taskData));
    }, [state.taskData]);


    const actions={
        addNewList: (listName) => dispatch({type:"Add-New-List", payload: listName}),
        setTaskDone: (taskId,listName) => {return dispatch({type:"Set-Task-Done", payload: {taskId, listName}})},
        deleteTask: (taskId,listName) => { return dispatch({type:"Delete-Task", payload: {taskId, listName}})},
        addnewTask: (taskName,listName) => { return dispatch({type:"Add-New-Task", payload: {taskName, listName}})},
        deleteList: (listName) => {return dispatch({type:"Delete-List", payload: listName})},
        handleChange:(list)=>{ return dispatch({type:"Change-List", payload: list})},
    };

    const currentListData = (state.currentList === "New List +") ? null : state.taskData.find((listItem) => listItem.name === state.currentList); 

    return (
        <TaskDataContext.Provider value={{...state, ...actions, currentListData}}>
            {children}
        </TaskDataContext.Provider>
    );
}