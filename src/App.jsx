// import ListsContainer from "./components/SideListContainer";
import Header from "./components/Header";
import SideListContainer from "./components/SideListContainer";
import { TASK_DATA } from "./assets/task-data";
import Footer from "./components/Footer";
import { useState } from "react";
import TaskSection from "./components/TaskSection";

export default function App() {
  const [currentList, setCurrentList] = useState("Shopping List");
  function  handleChange(list) {
    setCurrentList(list);
}
const currentListData = TASK_DATA.find((list) => list.name === currentList);
console.log(currentListData);
  return (
    <div className="App">
        <Header />
        <div className="SuperContainer">
        <SideListContainer TASK_DATA={TASK_DATA} whenButton={handleChange} />
        <TaskSection list={currentListData} />
        </div>

        <Footer />

    </div>
  );
}