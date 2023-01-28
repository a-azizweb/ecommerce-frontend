import React from 'react';
import './Loader.css';
const Loader = () => {
  return (
    // <div className="loading">
    //   <div></div>
    // </div>
    <div className="container">
      <div className=" loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <h1>Loading</h1>
      </div>
    </div>
  );
};

export default Loader;
