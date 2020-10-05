import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000";

function App() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    const openMediaDevices = async (constraints) => {
      return await navigator.mediaDevices.getUserMedia(constraints);
    }
    socket.on("update-user-list", data => {
      console.log("App -> data", data.users)
      const stream = openMediaDevices({ 'video': true, 'audio': true });
      console.log('Got MediaStream:', stream);
      setResponse(data.users);
    });

  }, []);

  return (
    <div>
      {response.map(client => {
        return <div key={client}> client: {client} connected </div>
      })}
    </div>
  );
}

export default App;