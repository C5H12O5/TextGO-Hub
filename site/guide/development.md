# Development

## Prerequisites

Before you start development, make sure you have the following installed:

1. **Rust**: Install from [rustup.rs](https://rustup.rs/)
2. **Node.js**: Version 18 or later
3. **pnpm**: Install globally with `npm install -g pnpm`

For detailed platform-specific prerequisites, refer to [Tauri's official documentation](https://v2.tauri.app/start/prerequisites/).

## Setup Development Environment

1. Clone the repository:

```bash
git clone https://github.com/C5H12O5/TextGO.git
cd TextGO
```

2. Install dependencies:

```bash
pnpm install
```

3. Run development mode:

```bash
pnpm tauri dev
```

### Enable Debug Logs

**Unix-like systems (macOS, Linux):**

```bash
RUST_LOG=debug pnpm tauri dev
```

**Windows PowerShell:**

```powershell
$env:RUST_LOG="debug"; pnpm tauri dev
```

## Project Structure

```
TextGO/
├── src/                    # Svelte frontend source
│   ├── lib/               # Shared components and utilities
│   └── routes/            # Application routes
├── src-tauri/             # Rust backend source
│   ├── src/               # Rust source files
│   └── Cargo.toml         # Rust dependencies
├── static/                # Static assets
└── package.json           # Node.js dependencies
```

## Building

Build the application for production:

```bash
pnpm tauri build
```

The built installers will be available in `src-tauri/target/release/bundle/`.

## Technology Stack

- **Frontend**: Svelte 5 + TypeScript
- **Backend**: Rust + Tauri v2
- **Styling**: CSS with modern features
- **Build Tool**: Vite

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Guidelines

- Follow existing code style
- Write clear commit messages
- Add comments for complex logic
- Test your changes thoroughly

## Debugging Tips

### Frontend Debugging

1. Open DevTools in development mode (automatically available)
2. Use `console.log()` for debugging
3. Check the Network tab for API calls

### Backend Debugging

1. Enable debug logs with `RUST_LOG=debug`
2. Use `dbg!()` macro in Rust code
3. Check application logs in the terminal

## Resources

- [Tauri Documentation](https://v2.tauri.app/)
- [Svelte Documentation](https://svelte.dev/)
- [Rust Book](https://doc.rust-lang.org/book/)

## License

This project is licensed under the GPLv3 License. See the [LICENSE](https://github.com/C5H12O5/TextGO/blob/main/LICENSE) file for details.

## Acknowledgments

This project is built upon many excellent open source projects. For a complete list of third-party dependencies and their licenses, please see [LICENSES.md](https://github.com/C5H12O5/TextGO/blob/main/LICENSES.md).
