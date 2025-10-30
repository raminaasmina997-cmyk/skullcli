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

program.parse(process.argv);