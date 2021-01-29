import React from "react";

const InfoCard = ({ className, title, value }) => {
  return (
    <div className={`info-card${className ? ` ${className}` : ""}`}>
      {title ? <div className="info-card__title">{title}</div> : null}
      {value ? <div className="info-card__value">{value}</div> : null}
    </div>
  );
};

export default InfoCard;
