import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Profile from "./components/Profile/profile.component";
import UsersList from "./components/Users/usersList.component";
const ENDPOINT = "wss://webrtc-server-api.herokuapp.com/";
// const ENDPOINT = "http://localhost:3000/";

function App() {
  const [usersList, setUsersList] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [socketClient, setSocketClient] = useState(null)
  useEffect(() => {

    const socket = socketIOClient(ENDPOINT);
    
    socket.on("conn-success", data => {
      console.log("ME", data)
      setCurrentUser(data)
    })

    socket.on("users-list", (data) => {
      console.log("App -> !!!!!!!!! users-list", data)
      setUsersList(data);
    });
    setSocketClient(socket)
    return () => {
      socket.disconnect()
    };
  }, []);

  
  if (usersList) {
    console.log("usersList ", usersList)
  }


  return (
    <div>
      <Profile currentUser={currentUser} />
      {usersList.length > 0 ? <UsersList currentUser={currentUser} usersList={usersList} socketClient={socketClient} /> : null}
    </div>
  );
}

export default App;