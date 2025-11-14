# skullcli

`skullcli` is a powerful command-line interface that serves a modern, responsive React dashboard.

## Features

- **Simple Command:** Start a local server with a single command.
- **React Dashboard:** A beautiful, pre-built dashboard with a sidebar, header, and content area.
- **Extensible:** Easily customizable by editing the React components in the `client` directory.

## Installation

Install `skullcli` globally using npm:

```bash
npm install -g skullcli
```

## Usage

To start the server, run the following command. You can specify any port you like.

```bash
skullcli serve <port>
```

Then, open your browser and navigate to `http://localhost:<port>` to explore the dashboard.

## Commands

### `serve [port]`

Starts the frontend and backend servers. You can optionally specify a port for the frontend server.

### `ws [port]`

Starts a WebSocket server. You can optionally specify a port, which defaults to 8080.

```bash
skullcli ws 8080
```

### `url <someurl> [port]`

Serves an iframe with the given URL. You can optionally specify a port, which defaults to 3000.

```bash
skullcli url https://www.google.com 3000
```

### `update`

Updates `skullcli` to the latest version.

### `version`

You can check your `skullcli` version using the `-v` or `--version` flags.

```bash
skullcli -v
```

## Development

To develop `skullcli`:

1.  Clone this repository.
2.  Run `npm install` in the root directory.
3.  Run `npm install` in the `client` directory.
4.  Make your changes.
5.  To test the local build directly, you can run:
    ```bash
    $(which node) dist/server.js url https://www.google.com 3000
    ```
6.  Before publishing, run `npm run build` to create the production build of the React app.

## Publishing

To publish a new version of `skullcli` to npm:

1.  **Update the Version:** Use `npm version patch` to increment the version number.
2.  **Document Changes:** Update this `README.md` and any other relevant documentation with details about the new features or fixes.
3.  **Publish:** Run the `npm publish` command. The `prepublishOnly` script will automatically build the project before publishing.

```bash
npm publish
```

## Backend API

You can interact with the backend server using `curl`. The backend runs on port `3001` by default (or `port + 1` if you specify a port).

Here's an example of how to execute a command:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"command": "ls -al"}' http://localhost:3001/execute
```
