import React, { Component } from 'react';
import RoomList from './RoomList';
import ChatSession from './ChatSession';
import RoomUsers from './RoomUsers';
import Chatkit from '@pusher/chatkit-client';
import axios from 'axios';
import SignedInHeaders from "views/SignedInHeader.js";
import Header from "components/Header/Header.js";
import Parallax from "components/Parallax/Parallax.js";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import GridContainer from "components/Grid/GridContainer.js";

import './App.css';

const useStyles = makeStyles(styles);
// const classes = useStyles();

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
      insuranceGroupId: ''
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
          url: 'https://infinitycare-frontend-server.herokuapp.com/authenticate',
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
    if (id != null) {
      if (this.state.usertype == 'doctor') {
        this.connectToRoom.call(this, 'f76d0379-f2da-41ec-8ecc-0fef534dc017');
        this.connectToChatkitSecondUser(); 
        this.createPrivateRoom.call(this, id).then(room => {
        this.connectToRoom.call(this, room.id);
      });
      }
      if (this.state.usertype == 'insurance') {
        this.connectToRoom.call(this, '3dbc92f6-455e-41d1-9a88-ccefd888070e');
        this.connectToChatkitSecondUser(); 
        this.createPrivateRoom.call(this, id).then(room => {
        this.connectToRoom.call(this, room.id);
      });
      }
    }
    else {
      this.setState({
        secondUserId: null
      })
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
      insuranceGroupId
    } = this.state;

    return (
      <div>
        <Header
          color="white"
          brand="InfinityCare"
          rightLinks={<SignedInHeaders />}
          fixed
          changeColorOnScroll={{
              height: 0,
              color: "white"
          }}
        />
      {/* <Parallax small filter image={require("assets/img/profile-bg.jpg")} /> */}
      <br/> <br/> <br/> <br/>
        <div>
          <div style={style.bg}>
            <div>
              <br></br>
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
                      {currentRoom ? <h3>{roomName}</h3> : null}
                    </header>
                    <ul className="chat-messages">
                      <ChatSession messages={messages} />
                    </ul>
                    <footer className="chat-footer">
                      <form onSubmit={this.sendMessage} className="message-form">
                        <input
                          type="text"
                          value={newMessage}
                          name="newMessage"
                          className="message-input"
                          placeholder="Type your message and hit ENTER to send"
                          onChange={this.handleInput}
                        />
                      </form>
                    </footer>
                  </section>
                  <aside className="sidebar right-sidebar">
                    {currentRoom ? (
                      <RoomUsers
                        currentUser={currentUser}
                        sendDM={this.sendDM}
                        roomUsers={roomUsers}
                      />
                    ) : null}
                  </aside>
                  {showLogin ? (
                    this.handleState()
                  ) : null}
                </div>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;