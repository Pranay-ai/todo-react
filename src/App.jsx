import { useDispatch,useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainComponent from "./components/MainComponent";
import { fetchTaskData, pushTaskData } from "./store/taskSlice";
import { useEffect } from "react";
import { uiActions } from "./store/uiSlice";
import { replaceTaskData } from "./store/taskSlice";


export default function App() {

  const dispatch = useDispatch();

  const madeChanges = useSelector((state) => state.task.madeChanges);

  const taskData = useSelector((state) => state.task.taskData);
  console.log(taskData);

  useEffect(() => {
    dispatch(fetchTaskData());
  }, []);

  useEffect(() => {
    if (madeChanges) dispatch(pushTaskData(taskData));
  }, [taskData]);

  useEffect(() => {
    const handleResize = () => {
      dispatch(uiActions.setIsMobile(window.innerWidth < 1000));
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on mount to set initial state
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
        <Header />
        <MainComponent />
        <Footer />
    </>

  );
}