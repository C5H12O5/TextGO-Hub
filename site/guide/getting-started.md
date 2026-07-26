# Getting Started

Install TextGO, grant required permissions, and create your first shortcut.

## System Requirements

### macOS

- macOS 11 or higher
- Requires Accessibility permission

### Windows

- Windows 10 or higher
- 64-bit operating system

## Download and Installation

1. Visit the [GitHub Releases](https://github.com/C5H12O5/TextGO/releases) page
2. Download the package for your system:
   - macOS (Apple Silicon): `TextGO_x.x.x_aarch64.dmg`
   - macOS (Intel): `TextGO_x.x.x_x64.dmg`
   - Windows: `TextGO_x.x.x_x64-setup.exe`

## Permission Settings

### macOS

On macOS, TextGO needs the `Accessibility` permission to read selected text and simulate keyboard input.

**Setup Steps**:

1. Open "System Settings" > "Privacy & Security" > "Accessibility"
2. Find TextGO and enable it
3. If TextGO is not listed, click the "+" button to add it manually

![TextGO enabled in macOS Accessibility settings](/screenshots/en/macos-accessibility-permission.png)

> [!TIP]
> The system will automatically prompt for authorization when the app is used for the first time.

> [!WARNING]
> TextGO is not signed. After updating the app on macOS, remove the old TextGO entry from Accessibility and add it again.

### Windows

Windows version requires no additional permission settings and is ready to use after installation.

## First Launch

1. **Start the App**
   - macOS: Launch from Launchpad or Applications folder
   - Windows: Launch from Start menu or desktop shortcut

2. **System Tray**

   After launch, the app icon will appear in the system tray. Use the tray menu to:
   - Show main window
   - Manage shortcuts
   - View history
   - Open settings
   - Quit the app

## Basic Usage

1. Open the main window
2. Click the `"Register Shortcut"` button
3. Select `"Double-Click"` or `"Drag-Select"`
4. Use the default `"Toolbar Mode"` for execution mode
5. Click the `"+"` button in the rules list to add a new rule
6. Select recognition type and execution action
7. Click `"Confirm"` to save the configuration

Now, after double-clicking or dragging to select text, a floating toolbar will appear where you can select preset actions to process the text.

![TextGO shortcut trigger menu](/screenshots/en/shortcut-trigger-menu.png)

Rules with "Save result to history" enabled store their results in the history window:

![TextGO history window](/screenshots/en/history-window.png)

## Configuration

### Execution Modes

- **Quiet Mode**: Execute action immediately after selecting text, suitable for simple conversion operations
- **Toolbar Mode**: Display floating toolbar for selection, suitable for scenarios requiring multiple actions

### Output Modes

- **Replace**: Directly replace the selected text when the action returns a result
- **Popup**: Display the result in a popup window for further editing or copying
- **No visual output**: Leave both options unselected; the result can still be copied to the clipboard

Available output options depend on the action. AI actions always open a popup, while actions such as web search, copy, cut, and paste do not return text results.

The settings pages provide detailed controls for the toolbar, text selection, mouse triggers, appearance, and app behavior:

![TextGO display settings](/screenshots/en/display-settings.png)

![TextGO mouse settings](/screenshots/en/mouse-settings.png)

![TextGO general settings](/screenshots/en/general-settings.png)

## Get Help

If you encounter issues or need assistance:

- Check the [FAQ](./faq.md)
- Submit issues on [GitHub Issues](https://github.com/C5H12O5/TextGO/issues)
