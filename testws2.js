import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
  
  // 1. Send a message to set our name
  const newName = 'testerClient';
  console.log(`Setting name to: ${newName}`);
  ws.send(JSON.stringify({ myname: newName }));

  // 2. After a short delay, send a message to ourself
  setTimeout(() => {
    const message = 'Hello, this is a self-test!';
    console.log(`Sending message to self (${newName}): "${message}"`);
    ws.send(JSON.stringify({ to: newName, message: message }));
  }, 500); // 500ms delay
};

ws.onmessage = (event) => {
  console.log(`Received message: ${event.data}`);
  
  // 3. Close the connection after receiving the message
  //ws.close();
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket server');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error.message);
};
