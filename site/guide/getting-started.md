# Getting Started

This guide will help you quickly install and configure TextGO to improve text processing efficiency.

## System Requirements

### macOS

- macOS 11 or higher
- Requires Accessibility permission

### Windows

- Windows 10 or higher
- 64-bit operating system

## Download and Installation

1. Visit the [GitHub Releases](https://github.com/C5H12O5/TextGO/releases) page
2. Download the installation package for your system:
   - macOS (Apple Silicon): `TextGO_x.x.x_aarch64.dmg`
   - macOS (Intel): `TextGO_x.x.x_x64.dmg`
   - Windows: `TextGO_x.x.x_x64-setup.exe`

## Permission Settings

### macOS

TextGO requires the `Accessibility` permission on macOS to function properly.

**Setup Steps**:

1. Open "System Settings" > "Privacy & Security" > "Accessibility"
2. Find TextGO and check it
3. If not listed, click the "+" button to manually add TextGO

> [!TIP]
> The system will automatically prompt for authorization when the app is used for the first time.

### Windows

Windows version requires no additional permission settings and is ready to use after installation.

## First Launch

1. **Start the App**
   - macOS: Launch from Launchpad or Applications folder
   - Windows: Launch from Start menu or desktop shortcut

2. **System Tray**

   After launch, the app icon will appear in the system tray. Click it to:
   - Show/hide main window
   - Open settings page
   - Quit the app

## Basic Usage

1. Open the shortcuts settings page
2. Click the `"Register Shortcut"` button
3. Select `"Double-Click"` or `"Drag-Select"`
4. Use the default `"Toolbar Mode"` for execution mode
5. Click the `"+"` button in the rules list to add a new rule
6. Select recognition type and execution action
7. Click `"Confirm"` to save configuration

Now, after double-clicking or dragging to select text, a floating toolbar will appear where you can select preset actions to process the text.

## Configuration

### Execution Modes

- **Quiet Mode**: Execute action immediately after selecting text, suitable for simple conversion operations
- **Toolbar Mode**: Display floating toolbar for selection, suitable for scenarios requiring multiple actions

### Output Modes

- **Replace**: Execution result directly replaces selected text
- **Popup**: Display execution result in a popup window for further editing or copying

## Get Help

If you encounter issues or need assistance:

- Check the [FAQ](./faq.md)
- Submit issues on [GitHub Issues](https://github.com/C5H12O5/TextGO/issues)
