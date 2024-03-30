import { createPortal } from "react-dom";

export default function Footer() {
    return createPortal(
        <div className="FooterSection">
            <h3>Task Zen</h3>
            <p>"Pranay Netha Guda Copyright 2024 "</p>
        </div>,
        document.getElementById("footer")
    );
}