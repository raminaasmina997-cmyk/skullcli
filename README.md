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
skullcli serve 6890
```

Then, open your browser and navigate to `http://localhost:6890` to see the dashboard.

## Development

To develop `skullcli`:

1.  Clone this repository.
2.  Run `npm install` in the root directory.
3.  Run `npm install` in the `client` directory.
4.  Make your changes.
5.  Before publishing, run `npm run build` to create the production build of the React app.
