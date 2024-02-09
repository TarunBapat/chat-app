
import io from 'socket.io-client';
import Chat from './components/Chat';
import { useState } from 'react';

const socket=io.connect('http://localhost:3001')

function App() {
  const [user,setUser]=useState('');
  const [room,setRoom]=useState('');
  const [showChat,setShowChat]=useState(false)

  const joinRoomHandler=(e)=>{
      e.preventDefault();
      if(user!=="" && room!==""){
          socket.emit('join_room',room)

      setShowChat(true)
      }
  }
  return (
    <div className="App">
      {!showChat?(
      <div className='joinChatContainer'>
        <h2>join Conversation </h2>
          <input type='text' onChange={(e)=>setUser(e.target.value)}/>
          <input type='text' onChange={(e)=>setRoom(e.target.value)}/>
          <button onClick={joinRoomHandler}>Join Room</button>
      </div>):
      (<Chat socket={socket} user={user} room={room} />)
      }
    </div>
  );
}

export default App;
