import React from "react";
import Top from "../content/Top";

const Index = () => {
  return (
    <>
      <div
        className="Index"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          <Top />
        </div>
      </div>
    </>
  );
};

export default Index;
