import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <div
      className="spinner-container"
      style={{ position: "absolute", left: "45%", top: "45%" }}
    >
      <div className="loading-spinner"></div>
    </div>
  );
}
