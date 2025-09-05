import React from "react";

function ProgressBar({ current, total }) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div style={{ margin: "10px 0" }}>
      <div style={{ marginBottom: "5px" }}>
        <strong>Question {current + 1} of {total}</strong>
      </div>
      <div style={{
        width: "100%",
        height: "10px",
        backgroundColor: "#ddd",
        borderRadius: "5px"
      }}>
        <div style={{
          width: `${percentage}%`,
          height: "100%",
          backgroundColor: "#4caf50",
          borderRadius: "5px"
        }} />
      </div>
    </div>
  );
}

export default ProgressBar;
