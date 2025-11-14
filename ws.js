
import { WebSocketServer } from 'ws';

export function startWebSocketServer(port) {
  const wss = new WebSocketServer({ port });

  let clients = {};
  let clientIndex = 1;

  wss.on('connection', (ws) => {
    const clientName = `user${clientIndex++}`;
    clients[clientName] = ws;
    console.log(`Client ${clientName} connected`);

    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        if (data.myname) {
          const oldName = Object.keys(clients).find(key => clients[key] === ws);
          if (oldName) {
            delete clients[oldName];
          }
          clients[data.myname] = ws;
          console.log(`Client ${oldName} renamed to ${data.myname}`);
        } else if (data.to && data.message) {
          const recipient = clients[data.to];
          if (recipient) {
            const senderName = Object.keys(clients).find(key => clients[key] === ws);
            recipient.send(JSON.stringify({ from: senderName, message: data.message }));
          } else {
            ws.send(JSON.stringify({ error: `User ${data.to} not found` }));
          }
        }
      } catch (e) {
        console.error('Failed to parse message:', e);
      }
    });

    ws.on('close', () => {
      const clientName = Object.keys(clients).find(key => clients[key] === ws);
      if (clientName) {
        delete clients[clientName];
        console.log(`Client ${clientName} disconnected`);
      }
    });
  });

  console.log(`WebSocket server running on ws://localhost:${port}`);
}
