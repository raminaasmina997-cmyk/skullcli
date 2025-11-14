import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
  // Send a message to set our name
  ws.send(JSON.stringify({ myname: 'tester' }));

  // Send a message to another client (assuming 'user1' is connected)
  setTimeout(() => {
    ws.send(JSON.stringify({ to: 'user1', message: 'Hello from tester!' }));
  }, 1000);
};

ws.onmessage = (event) => {
  console.log(`Received: ${event.data}`);
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket server');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};