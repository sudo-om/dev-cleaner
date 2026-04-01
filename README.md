# Dev Cleaner CLI

![Demo](https://via.placeholder.com/800x400.png?text=Dev+Cleaner+CLI+Demo+Placeholder) <!-- TODO: Add demo GIF here -->

A powerful CLI tool to easily clean up your development environment. Free up gigabytes of disk space by removing heavy `node_modules`, obsolete Python `venvs`, and unnecessary Homebrew packages with an interactive UI, automatic cleanup mode, and detailed analytics.

## Features

- **Interactive UI**: Navigate easily and choose exactly what to delete with an intuitive command-line interface.
- **Auto Cleanup**: One-command solution to automatically delete all unneeded development files.
- **Detailed Analytics**: View detailed statistics and see exactly how much space you have recovered.
- **Cross-environment**: Supports `node_modules` (JavaScript/Node.js), `venvs` (Python), and unused Homebrew cache/packages.

## Installation

Install globally using npm:

```bash
npm install -g @__ompatil/dev-cleaner
```

## Usage

Start the interactive CLI:

```bash
dev-cleaner
```

Or run in automatic cleanup mode:

```bash
dev-cleaner auto
```

### Other Commands
- `dev-cleaner stats` - View cleanup analytics
- `dev-cleaner help` - Show help and available commands

## Tech Stack

- **[Node.js](https://nodejs.org/)**: JavaScript runtime for building the CLI tool.
- **[Inquirer.js](https://www.npmjs.com/package/inquirer)**: Powerful interactive command line user interfaces.
- **[Chalk](https://www.npmjs.com/package/chalk)**: Terminal string styling done right.

## Future Improvements

- [ ] Add support for Rust `target` directories.
- [ ] Add support for Go build caches.
- [ ] Implement scheduling for automated daily/weekly cleanups.
- [ ] Export cleanup reports to CSV/JSON.

## Author

**Om Patil**
- GitHub: [@ompatil](https://github.com/ompatil)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
