import React from 'react';
import Proptypes from 'prop-types';

var moment = require('moment');
const ChatSession = props => {
  const { messages } = props;
  return messages.map(message => {
    const time = moment(message.updatedAt).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <li className="message" key={message.id}>
        <div>
          <span className="user-id">{message.senderId}</span>
          <span>{message.text}</span>
        </div>
        <span className="message-time">{time}</span>
      </li>
    );
  });
};

ChatSession.propTypes = {
  messages: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default ChatSession;

