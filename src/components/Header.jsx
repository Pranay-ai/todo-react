import { createPortal } from "react-dom";

export default function Header() {
    return createPortal(
        <div className="headerSection">
            <h1>Task Zen</h1>
            <p>"Find Your Focus, Conquer Your Chaos"</p>
        </div>,
        document.getElementById("header")
    );
}