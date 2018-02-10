import React from "react";

const FlashMessage = ({ message, closeMessage }) => {

  return (
    <div className="alert alert-success container-fluid" role="alert">
      {message}
      <button type="button" className="close" aria-label="Close" onClick={() => closeMessage()}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default FlashMessage;
