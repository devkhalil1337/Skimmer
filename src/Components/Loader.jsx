import React from "react";
import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html
      style={{
        position: "absolute",
        maxWidth: "100vw",
        height: "100vh",
        backgroundColor: "white",
      }}
      center
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          width: "150px",
          transform: "translateX(-30%)",
        }}
      >
        {progress.toFixed(0)} % loaded
      </div>
    </Html>
  );
};

export default Loader;
