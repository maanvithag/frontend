import React, { Component } from 'react';
import RoomList from './RoomList';
import ChatSession from './ChatSession';
import RoomUsers from './RoomUsers';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import GridContainer from "components/Grid/GridContainer.js";
import Logo2 from "../../assets/img/logo2.png";
import Button from "components/CustomButtons/Button.js";
import { Link } from "react-router-dom";
import TypingIndicator from './TypingIndicator'

import './App.css';

const style = {
  link: {
      color: 'white'
  },
  bg: {
      background: 'linear-gradient(0deg, #e0e0e0 30%, #f5f5f5 90%)',
      color: 'black',
      borderRadius: 5
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      showLogin: true,
      isLoading: false,
      currentUser: null,
      currentRoom: null,
      rooms: [],
      roomUsers: [],
      roomName: null,
      messages: [],
      newMessage: '',
      secondUserId: '',
      usertype: '',
      doctorGroupId: '',
      insuranceGroupId: '',
      usersWhoAreTyping: [],
      chatusers: [] // patientslist for doctor, doctorslist for patients, patientslist for insurance provider
    };

    const usertype = window.localStorage.getItem("userType");

    const firstusername = window.location.href.split('/')[4];
    // TODO Add try-catch for this since it won't be patient/doctor always.
    const secondusername = window.location.href.split('/')[5]; 

    this.state.userId = firstusername;
    this.state.secondUserId = secondusername;
    this.state.usertype = usertype;
    this.handleInput = this.handleInput.bind(this);
    this.connectToChatkit = this.connectToChatkit.bind(this);
    this.connectToChatkitSecondUser = this.connectToChatkitSecondUser.bind(this);
    this.connectToRoom = this.connectToRoom.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendDM = this.sendDM.bind(this);
    this.handleState = this.handleState.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error('error', error))
  }

  sendMessage(event) {
    event.preventDefault();
    const { newMessage, currentUser, currentRoom } = this.state;

    if (newMessage.trim() === '') return;

    currentUser.sendMessage({
      text: newMessage,
      roomId: `${currentRoom.id}`,
    });

    this.setState({
      newMessage: '',
    });
  };

  handleInput(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleState() {
    this.connectToChatkit();
  };

  connectToRoom(id) {
    const { currentUser } = this.state;

    this.setState({
      messages: [],
    });

    return currentUser
      .subscribeToRoom({
        roomId: `${id}`,
        messageLimit: 100,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message],
            });
          },
          onUserStartedTyping: user => {
            this.setState({
              usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
            })
          },
          onUserStoppedTyping: user => {
            this.setState({
              usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                username => username !== user.name
              ),
            })
          },
          onPresenceChanged: () => {
            const { currentRoom } = this.state;
            this.setState({
              roomUsers: currentRoom.users.sort(a => {
                if (a.presence.state === 'online') return -1;
                return 1;
              }),
            });
          },
        },
      })
      .then(currentRoom => {
        const roomName =
          currentRoom.customData && currentRoom.customData.isDirectMessage
            ? currentRoom.customData.userIds.filter(
                id => id !== currentUser.id
              )[0]
            : currentRoom.name;

        this.setState({
          currentRoom,
          roomUsers: currentRoom.users,
          rooms: currentUser.rooms,
          roomName,
        });
      })
      .catch(console.error);
  };

  connectToChatkitSecondUser() {

    const { secondUserId } = this.state;
    const userId = secondUserId;

    if (userId === null || userId.trim() === '') {
      alert('Invalid userId');
      return;
    }

    axios
      .post('https://infinitycare-frontend-server.herokuapp.com/users', { userId })
      .then(() => {
        const chatkit = new Chatkit.default({
          instanceLocator: 'v1:us1:81ec1969-c0da-4b53-800b-26c5625c7974', 
          key: '8b6c74c0-edfb-4cb6-951f-e1446b7d63d9:GkUmcSMaX3ZSkNg2xbSWBUYBpr2JX0UXsf92Tbj6vL4='
        })
    
        chatkit.createUser({
          id: secondUserId,
          name: secondUserId
        })
        .then(() => {
          console.log("User created successfully");
        }).catch((err) => {
          console.log(err);
        });
      })
      .catch(console.error);
  };

  connectToChatkit() {
    const { userId, secondUserId } = this.state;

    if (userId === null || userId.trim() === '') {
      alert('Invalid userId');
      return;
    }

    this.state.isLoading = true;

    axios
      .post('https://infinitycare-frontend-server.herokuapp.com/users', { userId })
      .then(() => {
        const tokenProvider = new Chatkit.TokenProvider({
          url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/81ec1969-c0da-4b53-800b-26c5625c7974/token?user_id=' + userId,
        });

        const chatManager = new Chatkit.ChatManager({
          instanceLocator: 'v1:us1:81ec1969-c0da-4b53-800b-26c5625c7974',
          userId,
          tokenProvider,
        });

        return chatManager
          .connect({
            onAddedToRoom: room => {
              const { rooms } = this.state;
              this.setState({
                rooms: [...rooms, room],
              });
            },
          })
          .then(currentUser => {
            this.setState(
              {
                currentUser: currentUser,
                showLogin: false,
                isLoading: false,
                rooms: currentUser.rooms,
              },
              () => {this.sendDM(secondUserId);}
            );
          });
      })
      .catch(console.error);
    };

  createPrivateRoom(id) {
    const { currentUser, rooms } = this.state;
    const roomName = `${currentUser.id}_${id}`;

    const isPrivateChatCreated = rooms.filter(room => {
      if (room.customData && room.customData.isDirectMessage) {
        const arr = [currentUser.id, id];
        const { userIds } = room.customData;

        if (arr.sort().join('') === userIds.sort().join('')) {
          return {
            room,
          };
        }
      }

      return false;
    });

    if (isPrivateChatCreated.length > 0) {
      return Promise.resolve(isPrivateChatCreated[0]);
    }

    return currentUser.createRoom({
      name: `${roomName}`,
      private: true,
      addUserIds: [`${id}`],
      customData: {
        isDirectMessage: true,
        userIds: [currentUser.id, id],
      },
    });
  };

  sendDM(id) {
    if (this.state.usertype == 'doctor') {
      this.connectToRoom.call(this, 'eec15766-ea99-4c5c-9e5b-e9646e9f90b4');
      if (this.state.secondUserId) {
        this.connectToChatkitSecondUser(); 
        this.createPrivateRoom.call(this, id).then(room => {
        this.connectToRoom.call(this, room.id);
      })};
    }
    if (this.state.usertype == 'insurance') {
      this.connectToRoom.call(this, '3dbc92f6-455e-41d1-9a88-ccefd888070e');
      if(this.state.secondUserId) {
        this.connectToChatkitSecondUser(); 
        this.createPrivateRoom.call(this, id).then(room => {
        this.connectToRoom.call(this, room.id);
      })};
    }
    if(this.state.usertype == 'patient') {
      this.connectToRoom.call(this, this.state.rooms[0]['id']);
      if(this.state.secondUserId) {
        this.connectToChatkitSecondUser(); 
        this.createPrivateRoom.call(this, id).then(room => {
        this.connectToRoom.call(this, room.id);
      })};
    }
  }

  render() {
    const {
      userId,
      showLogin,
      rooms,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName,
      secondUserId,
      usertype,
      doctorGroupId,
      insuranceGroupId,
    } = this.state;

    return (
      <div>
          <div class="chatpage-header">
            <img width="240" height="40" resizeMode="contain" src={Logo2} alt="Logo2" />
            <Link to={"/" + window.localStorage.getItem("userType") + "/dashboard"}>
              <Button color="github" align="right" class="chatpage-button">My Dashboard</Button> 
            </Link>
          </div>
          <div style={style.bg}>
            <div>
              <GridContainer justify="center">
                <div className="App">
                  <aside className="sidebar left-sidebar">
                    {currentUser ? (
                      <div className="user-profile">
                        <span className="username">{currentUser.name}</span>
                        <span className="user-id">{`@${currentUser.id}`}</span>
                      </div>
                    ) : null}
                    {currentRoom ? (
                      <RoomList
                        rooms={rooms}
                        currentRoom={currentRoom}
                        connectToRoom={this.connectToRoom}
                        currentUser={currentUser}
                      />
                    ) : null}
                  </aside>
                  <section className="chat-screen">
                    <header className="chat-header">
                      {currentRoom && currentRoom.isPrivate ? 
                        <div>
                        <h2 class="headertekst"> <span className={`presence ${roomUsers[0].presenceStore[roomUsers[1].id]}`}/> {roomName}</h2>
                        </div>
                      : null}
                      {currentRoom && !currentRoom.isPrivate ? 
                        <div>
                        <h2 class="headertekst">{roomName}</h2>
                        </div>
                      : null}
                    </header>
                    <ul className="chat-messages">
                      <ChatSession messages={messages} />
                      <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                    </ul>
                    <footer className="chat-footer">
                      <form onSubmit={this.sendMessage} className="message-form">
                        <input
                          type="text"
                          value={newMessage}
                          name="newMessage"
                          className="message-input"
                          placeholder="Type your message and hit ENTER to send"
                          onInput={this.handleInput}
                          onChange={this.TypingIndicator}
                        />
                      </form>
                    </footer>
                  </section>
                  {showLogin ? (
                    this.handleState()
                  ) : null}
                </div>
              </GridContainer>
            </div>
          </div>
    </div>
    )
  }
}

export default App;