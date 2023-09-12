import React from "react";
import backgroundImage from "/Pexels.png"; // Import your image here
import "./index.css"; // Import your CSS file here if needed
import { Link } from "react-router-dom";


export default function ModelSelector() {
  return (
    
    <>
    
      <div className="page-container">
        <img
          src={backgroundImage}
          alt="Background"
          className="background-image"
        />
        <div className="centered-text">
          <span>SELECT</span> <span>MODEL</span>
        </div>
        <button  className="back-button" onClick={() => {
              window.location.href = "https://skimmerskiff.com";
            }}>Back to Website</button>
        <div className="boats-container">
          <div
            className="boat-container"
            onClick={() => {
              window.location.href = "/Skimmer14";
            }}
          >
            <div className="boat-heading">
              <span className="boat-name">14'</span>
            </div>

            <div className="boat-image">
              <div className="circular-overlay"></div>
              <img className="boat-img" src="/14.png" alt="boat" />
            </div>
          </div>
          <div
            className="boat-container"
            onClick={() => {
              window.location.href = "/Skimmer16";
            }}
          >
            <div className="boat-heading-1">
              <span className="boat-name">16'</span>
            </div>
            <div className="boat-image-1">
              <div className="circular-overlay-1"></div>
              <img className="boat-img-1" src="/16.png" alt="boat" />
            </div>
          </div>
        </div>
        <div className="bottom-text">
          This is a simulated representation of our models, actual color / shape
          may differ. Contact our facility regarding your specific order.
        </div>
      </div>
      {/* Mobile version */}
      <div className="page-container-mobile">
        {/* top */}
        <div className="top">
          <div className="centered-text">
            <span>SELECT</span> <span>MODEL</span>
          </div>
          <button onClick={() => {
              window.location.href = "https://skimmerskiff.com";
            }}>Back to Website</button>
        </div>
        {/* boats container */}
        <div className="boats-container">
          <div
            className="boat-container"
            onClick={() => {
              window.location.href = "/Skimmer14";
            }}
          >
            <div className="boat-heading">
              <span className="boat-name">14'</span>
            </div>

            <div className="boat-image boat-wrap">
              <img
                className="boat-img"
                style={{ padding: "1rem 0" }}
                src="/14.png"
                alt="boat"
              />
            </div>
          </div>
          <div
            className="boat-container"
            onClick={() => {
              window.location.href = "/Skimmer16";
            }}
          >
            <div className="boat-heading">
              <span className="boat-name">16'</span>
            </div>
            <div className="boat-image boat-wrap boat-two">
              <img className="boat-img" src="/16.png" alt="boat" />
            </div>
          </div>
        </div>
        <div className="bottom-text">
          <p>
            This is a simulated representation of our models, actual color /
            shape may differ. Contact our facility regarding your specific order.
          </p>
        </div>
      </div>
    </>
  );
}
