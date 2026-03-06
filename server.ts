
import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  const PORT = 3000;

  // In-memory chat history (for initial sync)
  let chatHistory: any[] = [{
    id: 'system-1',
    userId: 'system',
    userName: 'منسق المنصة',
    text: `أهلاً بك يا مبدع/ة في مجلس المبدعين! أنا مساعدك الذكي، يمكنك سؤالي عن أي شيء يخص الكتابة أو الفنون. نادني بكتابة @منصة.`,
    timestamp: new Date().toISOString()
  }];

  let posts: any[] = [];

  wss.on("connection", (ws) => {
    console.log("New client connected");

    // Send history and posts to new client
    ws.send(JSON.stringify({ type: "SYNC_HISTORY", payload: chatHistory }));
    ws.send(JSON.stringify({ type: "SYNC_POSTS", payload: posts }));

    ws.on("message", (data) => {
      try {
        const message = JSON.parse(data.toString());
        
        if (message.type === "NEW_MESSAGE") {
          chatHistory.push(message.payload);
          // Keep history manageable
          if (chatHistory.length > 100) chatHistory.shift();

          // Broadcast to all clients
          const broadcastData = JSON.stringify(message);
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(broadcastData);
            }
          });
        }

        if (message.type === "NEW_POST") {
          posts.unshift(message.payload);
          // Keep posts manageable
          if (posts.length > 50) posts.pop();

          // Broadcast to all clients
          const broadcastData = JSON.stringify(message);
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(broadcastData);
            }
          });
        }
      } catch (err) {
        console.error("Error parsing message:", err);
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
