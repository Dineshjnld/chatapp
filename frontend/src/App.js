import React, { useState } from 'react';
import Chat from './components/chat/Chat';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <h1>Chat Application</h1>
      <Chat user={user} setUser={setUser} />
    </div>
  );
}

export default App;
