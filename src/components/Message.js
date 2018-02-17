import React from 'react';

const Message = ({ message, toggleRead }) => {
  return (
    <div className="row message unread" onClick={() => toggleRead(message.id)}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" />
          </div>
          <div className="col-xs-2">
            <i className="star fa fa-star-o"></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a href="#">
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message;
