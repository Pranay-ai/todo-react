import { createPortal } from "react-dom";
import { uiActions } from "../store/uiSlice";
import { useDispatch,useSelector } from "react-redux";
import { useContext } from "react";
export default function Header() {
    const isMobile=useSelector((state)=>state.ui.isMobile);
    const isMenuOpen=useSelector((state)=>state.ui.isMenuOpen);
    const dispatch = useDispatch();
    return createPortal(
        <div className="headerSection">
                {isMobile && (
        <button className="menuToggle" onClick={() => dispatch(uiActions.setIsMenuOpen(!isMenuOpen))}>
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