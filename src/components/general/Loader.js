import React from "react";

const Loader = ({ isLoading }) => {
  return (
    <div className={`page-loader ${isLoading ? "active" : ""}`}>
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
