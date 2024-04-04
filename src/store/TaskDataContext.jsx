import { createContext, useEffect, useReducer } from "react";

export const TaskDataContext = createContext();

const initialState = {
  currentList: "Shopping List",
  taskData: JSON.parse(localStorage.getItem("taskData")) || [],
  isMobile: window.innerWidth < 1000,
  isMenuOpen: false
};

function reducer(state, action) {
  switch (action.type) {
    case "Add-New-List":
      return {
        ...state,
        taskData: [...state.taskData, { name: action.payload, tasks: [], id: state.taskData.length + 1 }]
      };
    case "Set-Task-Done":
      return {
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
              })
            };
          } else {
            return list;
          }
        })
      };
    case "Delete-Task":
      return {
        ...state,
        taskData: state.taskData.map((list) => {
          if (list.name === action.payload.listName) {
            return {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== action.payload.taskId)
            };
          } else {
            return list;
          }
        })
      };
    case "Add-New-Task":
      return {
        ...state,
        taskData: state.taskData.map((list) => {
          if (list.name === action.payload.listName) {
            return {
              ...list,
              tasks: [...list.tasks, { name: action.payload.taskName, done: false, id: Math.floor(Math.random() * 90000) + 10000 }]
            };
          } else {
            return list;
          }
        })
      };
    case "Delete-List":
      return {
        ...state,
        taskData: state.taskData.filter((list) => list.name !== action.payload),
        currentList: "New List +"
      };
    case "Change-List":
      return {
        ...state,
        currentList: action.payload
      };
    case "Close-Menu":
      return {
        ...state,
        isMenuOpen: false
      };
    case "Set-Is-Mobile":
      return {
        ...state,
        isMobile: action.payload
      };
    case "Set-Is-Menu-Open":
      return {
        ...state,
        isMenuOpen: action.payload
      };
    default:
      return state;
  }
}

export default function TaskContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(state.taskData));
  }, [state.taskData]);

  useEffect(() => {
    const handleResize = () => {
      dispatch({ type: "Set-Is-Mobile", payload: window.innerWidth < 1000 });
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on mount to set initial state
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const actions = {
    addNewList: (listName) => dispatch({ type: "Add-New-List", payload: listName }),
    setTaskDone: (taskId, listName) => dispatch({ type: "Set-Task-Done", payload: { taskId, listName } }),
    deleteTask: (taskId, listName) => dispatch({ type: "Delete-Task", payload: { taskId, listName } }),
    addnewTask: (taskName, listName) => dispatch({ type: "Add-New-Task", payload: { taskName, listName } }),
    deleteList: (listName) => dispatch({ type: "Delete-List", payload: listName }),
    handleChange: (list) => dispatch({ type: "Change-List", payload: list }),
    handleCloseMenu: () => dispatch({ type: "Close-Menu" }),
    setIsMobile: (isMobile) => dispatch({ type: "Set-Is-Mobile", payload: isMobile }),
    setIsMenuOpen: (isMenuOpen) => dispatch({ type: "Set-Is-Menu-Open", payload: isMenuOpen })
  };

  const currentListData = (state.currentList === "New List +") ? null : state.taskData.find((listItem) => listItem.name === state.currentList);

  return (
    <TaskDataContext.Provider value={{ ...state, ...actions, currentListData }}>
      {children}
    </TaskDataContext.Provider>
  );
}
