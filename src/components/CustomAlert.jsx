import React from 'react';
import './CustomAlert.css';

const CustomAlert = ({ message, onClose, actionText, onAction, showOkButton }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-container">
        <div className="alert-content">
          <p>{message}</p>
          <div className="alert-buttons">
            {showOkButton && (
              <button className="alert-button primary" onClick={onClose}>
                OK
              </button>
            )}
            {onAction && actionText && (
              <button className="alert-button primary" onClick={onAction}>
                {actionText}
              </button>
            )}
            {!showOkButton && (
              <button className="alert-button secondary" onClick={onClose}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
