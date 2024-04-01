// import ListsContainer from "./components/SideListContainer";
import Header from "./components/Header";
import SideListContainer from "./components/SideListContainer";
import Footer from "./components/Footer";
import TaskContextProvider from "./store/TaskDataContext";
import TaskSection from "./components/TaskSection";

export default function App() {

  return (
    <TaskContextProvider>

        <Header />
        <div className="SuperContainer">
        <SideListContainer  />
        <TaskSection />
        </div>

        <Footer />
    </ TaskContextProvider>

  );
}