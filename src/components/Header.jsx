import { createPortal } from "react-dom";
import { TaskDataContext } from "../store/TaskDataContext";
import { useContext } from "react";
export default function Header() {
    const { isMobile, isMenuOpen, setIsMenuOpen } = useContext(TaskDataContext);
    return createPortal(
        <div className="headerSection">
                {isMobile && (
        <button className="menuToggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="menuIcon"></span>
        </button>
      )}
      <div className="heading">
      <h1>Task Zen</h1>
      <p>"Find Your Focus, Conquer Your Chaos"</p>
      </div>
        </div>,
        document.getElementById("header")
    );
}