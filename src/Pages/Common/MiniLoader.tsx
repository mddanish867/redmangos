import React from "react";

function MiniLoader({ type = "warning", size = 100 }) {
  return (
    <div
      style={{ scale: `${size}%` }}
      className={`spinner-border text-${type}`}
    ></div>
  );
}

export default MiniLoader;
