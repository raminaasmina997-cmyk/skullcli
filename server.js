#!/usr/bin/env node
import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import { exec } from 'child_process';
import { readFileSync } from 'fs';

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load package.json to get the version
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

const program = new Command();

program
  .version(pkg.version, '-v, --version', 'Output the current version');

program
  .command('serve')
  .description('Start the frontend and backend servers')
  .argument('[port]', 'Port to run the frontend server on', 3000)
  .action((portStr) => {
    const port = parseInt(portStr, 10);
    const backendPort = port + 1;

    // --- Frontend Server ---
    const app = express();
    const clientPath = path.join(__dirname, 'public');
    app.use(express.static(clientPath));
    app.get(/.*/, (req, res) => {
      res.sendFile(path.join(clientPath, 'index.html'));
    });
    app.listen(port, () => {
      console.log(`🧠 Frontend server running on http://localhost:${port}`);
    });

    // --- Backend Server ---
    const backendApp = express();
    backendApp.use(cors());
    backendApp.use(express.json());

    backendApp.post('/execute', (req, res) => {
      const { command } = req.body;
      if (!command) {
        return res.status(400).json({ error: 'Command is required' });
      }

      exec(command, (error, stdout, stderr) => {
        if (error) {
          return res.status(500).json({
            error: error.message,
            stdout: stdout,
            stderr: stderr
          });
        }
        res.json({
          response: stdout,
          stderr: stderr
        });
      });
    });

    backendApp.listen(backendPort, () => {
      console.log(`🚀 Backend server running on http://localhost:${backendPort}`);
    });
  });

program
  .command('update')
  .description('Update skullcli to the latest version')
  .action(() => {
    console.log('Updating skullcli...');
    const updateCommand = 'npm uninstall -g skullcli && npm cache clean --force && npm install -g skullcli@latest';
    exec(updateCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Update failed: ${error.message}`);
        return;
      }
      console.log('skullcli updated successfully!');
      console.log(stdout);
    }).stdout.pipe(process.stdout);
  });

import { startWebSocketServer } from './ws.js';

program
  .command('ws')
  .description('Start a WebSocket server')
  .argument('[port]', 'Port to run the WebSocket server on', 8080)
  .action((portStr) => {
    const port = parseInt(portStr, 10);
    startWebSocketServer(port);
  });

program
    .command('url <someurl>')
    .description('Serves an iframe with the given URL')
    .argument('[port]', 'Port to run the server on', 3000)
    .action((someurl, portStr) => {
        const port = parseInt(portStr, 10);
        const app = express();

        app.get('/', (req, res) => {
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>SkullCLI URL</title>
                    <style>
                        body, html {
                            margin: 0;
                            padding: 0;
                            height: 100%;
                            overflow: hidden;
                        }
                        iframe {
                            width: 100%;
                            height: 100%;
                            border: none;
                        }
                    </style>
                </head>
                <body>
                    <iframe src="${someurl}"></iframe>
                </body>
                </html>
            `);
        });

        app.listen(port, () => {
            console.log(`🚀 URL server running on http://localhost:${port}`);
        });
    });


program.parse(process.argv);