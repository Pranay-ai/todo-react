import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    taskData:[],
    madeChanges:false
}

export const fetchTaskData = createAsyncThunk("task/fetchTaskData", async (args, {dispatch,rejectWithValue}) => {
   async function fetchTaskData() {
        console.log("Fetching data...");
        const response = await fetch("https://todolist-72889-default-rtdb.firebaseio.com/task.json", { method: "GET"});
        if (!response.ok) {
            throw new Error("Server responded with an error!");
        }
        const data = await response.json();
        console.log(data);
        if(data===null) data=[];
        dispatch(replaceTaskData(data))
    }

    try {
        await fetchTaskData();
        console.log("Data fetched successfully!");
    
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
    }
}
);


export const pushTaskData = createAsyncThunk("task/pushTaskData", async (data,{dispatch,rejectWithValue}) => {
    async function pushTaskData() {
        const response = await fetch("https://todolist-72889-default-rtdb.firebaseio.com/task.json", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Server responded with an error!");
        }
    }

    try {
        await pushTaskData();
        console.log("Data pushed successfully!");
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
    }
}
);




const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addNewList: (state, action) => {
            state.taskData.push({ name: action.payload, tasks: [], id: state.taskData.length + 1 });
        },
        setTaskDone: (state, action) => {
            state.madeChanges=true;
            state.taskData=state.taskData.map((list) => {
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
        },
        deleteTask: (state, action) => {
            state.taskData=state.taskData.map((list) => {
                state.madeChanges=true;
                if (list.name === action.payload.listName) {
                    return {
                        ...list,
                        tasks: list.tasks.filter((task) => task.id !== action.payload.taskId)
                    };
                } else {
                    return list;
                }
            })
        },
        addNewTask: (state, action) => {
            state.madeChanges=true;
            state.taskData=state.taskData.map((list) => {
                if (list.name === action.payload.listName) {
                    return {
                        ...list,
                        tasks: [...list.tasks, { name: action.payload.taskName, done: false, id: Math.floor(Math.random() * 90000) + 10000 }]
                    };
                } else {
                    return list;
                }
            })
        },
        replaceTaskData: (state, action) => {
            state.taskData = action.payload;
        },

        deleteList: (state, action) => {
            state.madeChanges=true;
            state.taskData = state.taskData.filter((list) => list.name !== action.payload);
        }
    }
});

export const { addNewList, setTaskDone, deleteTask, addNewTask, replaceTaskData, deleteList } = taskSlice.actions;
export default taskSlice.reducer;