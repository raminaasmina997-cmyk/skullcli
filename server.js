#!/usr/bin/env node
import http from "http";
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];
const port = args[1] || 3000;

if (command === "serve") {
  const app = express();
  const clientPath = path.join(__dirname, 'public');

  app.use(express.static(clientPath));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });

  app.listen(port, () => {
    console.log(`🧠 skullcli server running on http://localhost:${port}`);
    console.log(`Serving React app from: ${clientPath}`);
  });
} else {
  console.log("Usage: skullcli serve [port]");
}