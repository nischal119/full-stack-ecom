import React from "react";

const EmptyPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <img
          style={{ height: "400px", width: "400px" }}
          src="../.././public/Image resources/productnot found.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default EmptyPage;
