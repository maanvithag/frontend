import React from 'react';
import Proptypes from 'prop-types';

const RoomUsers = props => {
  const { roomUsers, sendDM, currentUser } = props;
  const roomusers = roomUsers.filter(i => i.id !== currentUser.id)
  const users = roomusers.map(user => {
    const userId = user.id;
    // console.log(user.presenceStore);
    // console.log(user.presenceStore[userId]);
    return (
      <div>
        <span className={`presence ${user.presenceStore[userId]}`}/>
      </div>
      // <li className="room-member" key={user.id}>
      //   <div>
      //     {/* <span className={`presence ${user.presence.state}`} /> */}
      //     <span className={`presence ${user.presenceStore[userId]}`}/>
      //     <span>{user.name}</span>
      //   </div>
      //   {/* {currentUser.id !== user.id ? (
      //     <button
      //       onClick={() => sendDM(user.id)}
      //       title={`Send ${user.name} a direct message`}
      //       className="send-dm"
      //     >
      //       +
      //     </button>
      //   ) : null} */}
      // </li>
    );
  });

  return (
    <div className="room-users">
      <ul>{users}</ul>
    </div>
  );
};

RoomUsers.propTypes = {
  roomUsers: Proptypes.array.isRequired,
  sendDM: Proptypes.func.isRequired,
  currentUser: Proptypes.object.isRequired,
};

export default RoomUsers;
