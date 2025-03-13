import React from "react";
import "./ServiceCard.css";

const ServiceCard = ({ imgSrc, imgAlt, name, description }) => {
  return (
    <div className="service-card-container">
      <div className="service-card-header">
        <div className="service-card-img-container">
          <img className="service-card-img" src={imgSrc} alt={imgAlt} />
        </div>
        <h3 className="service-card-name" style={{ color: "" }}>
          {name}
        </h3>
      </div>
      <p className="service-card-description">{description}</p>
    </div>
  );
};

export default ServiceCard;
