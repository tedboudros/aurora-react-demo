import React from "react";

const AppRect = ({ isActive = false, app }) => {
  return (
    <div className="app--container">
      <div
        className={`app ${isActive ? " active" : ""}`}
        style={app.isApp ? {} : { backgroundImage: `url(${app.icon})` }}
      >
        {app.isApp ? <app.icon size={88} /> : null}
      </div>
    </div>
  );
};

export default AppRect;
