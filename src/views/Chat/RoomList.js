import React from 'react';
import Proptypes from 'prop-types';
import Chat from "@material-ui/icons/Chat";
import Group from "@material-ui/icons/Group";

const RoomList = props => {
  const { rooms, currentRoom, connectToRoom, currentUser } = props;
  const roomList = rooms.map(room => {
    // const roomIcon = !room.isPrivate ? '🌐' : '🔒';
    const roomIcon = !room.isPrivate ? <span role="img" aria-label="busts in silhouette">👥</span> : <span role="img" aria-label="bust in silhouette">👤</span>;    const isRoomActive = room.id === currentRoom.id ? 'active' : '';

    return (
      <li
        className={isRoomActive}
        key={room.id}
        onClick={() => connectToRoom(room.id)}
      >
        <span className="room-icon">{roomIcon}</span>
        {room.customData && room.customData.isDirectMessage ? (
          <span className="room-name">
            {room.customData.userIds.filter(id => id !== currentUser.id)[0]}
          </span>
        ) : (
          <span className="room-name">{room.name}</span>
        )}
      </li>
    );
  });
  return (
    <div className="rooms">
      <ul className="chat-rooms">{roomList}</ul>
    </div>
  );
};

RoomList.propTypes = {
  rooms: Proptypes.array.isRequired,
  currentRoom: Proptypes.object.isRequired,
  connectToRoom: Proptypes.func.isRequired,
  currentUser: Proptypes.object.isRequired,
};

export default RoomList;
