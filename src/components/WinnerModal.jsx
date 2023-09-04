import React from "react";
import '../App.css';

function WinnerModal({ winner}) {
    return (
        <div className="winner-modal">
      <div className="winner-content">
        <h2> {winner} <span className="winner-exclamation"> !!</span></h2>
      </div>
    </div>
    )
}

export default WinnerModal;