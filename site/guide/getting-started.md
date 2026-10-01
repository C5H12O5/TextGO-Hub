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

**Setup steps:**

1. Open "System Settings" > "Privacy & Security" > "Accessibility"
2. Find TextGO and enable it
3. If TextGO is not listed, click the "+" button to add it manually

![TextGO enabled in macOS Accessibility settings](/screenshots/en/macos-accessibility-permission.png)

> [!TIP]
> The system will automatically prompt for authorization when the app is used for the first time.

> [!WARNING]
> TextGO is not signed. After updating the app on macOS, remove the old TextGO entry from Accessibility and add it again.

### Windows

TextGO on Windows requires no additional permissions.

## First Launch

1. **Start the App**
   - macOS: Launch from Launchpad or Applications folder
   - Windows: Launch from Start menu or desktop shortcut

2. **Menu Bar or System Tray**

   After launch, the app icon appears in the macOS menu bar or Windows system tray. The menu provides:
   - Open TextGO
   - Manage Shortcuts
   - View History
   - Settings...
   - Quit

## Basic Usage

1. Open the main window
2. Click **Register Shortcut**
3. Select **Double-Click** or **Drag-Select**
4. Keep the default **Toolbar Mode**
5. Click **+** in the rules list to add a rule
6. Select recognition type and execution action
7. Click **Confirm** to save

### Execution Modes

- **Quiet Mode**: Runs an action immediately after text selection; ideal for simple conversions
- **Toolbar Mode**: Shows a floating toolbar for choosing from multiple actions

### Output Modes

- **Replace**: Replaces the selected text with the result
- **Popup**: Shows the result for further editing or copying
- **No visual output**: Leaves both options unselected; the result can still be copied to the clipboard

Available output options depend on the action. AI actions always open a popup, while actions such as web search, copy, cut, and paste do not return text results.

After the setup above, double-click or drag to select text and choose an action from the floating toolbar. You can also register Triple-Click, Shift-Click, or a keyboard shortcut; see [Register Shortcuts](./register-shortcuts.md).

![TextGO shortcut trigger menu](/screenshots/en/shortcut-trigger-menu.png)

Rules with "Save result to history" enabled store their results in the history window:

![TextGO history window](/screenshots/en/history-window.png)

## Settings Overview

The settings pages group related options:

- **Custom Recognitions**: Manage classification models and regular expressions
- **Custom Actions**: Configure AI conversations, script execution, and web searches
- **Display Settings**: Adjust [toolbar size, position, hiding behavior, and popup word wrap](./appearance.md#toolbar-settings)
- **Mouse Settings**: Configure text selection, cursor behavior, and long-press triggers
- **General Settings**: Set the language, [theme](./appearance.md), history retention, behavior, and permissions

Click the version number in the lower left corner to check for updates and install a newer version.

![TextGO display settings](/screenshots/en/display-settings.png)

## Batch-Manage Rules and Extensions

Rule, classification model, regular expression, prompt template, script, and search action lists support multiple selection. Click rows or their checkboxes to select them, and click again to deselect.

- Use the up and down arrows to move selected items while preserving their relative order
- Click the delete icon and confirm to remove the selected items together
- Custom recognition and action lists also support JSON import and export. Exporting one item opens a file save dialog; exporting multiple items asks for a directory and creates a separate JSON file for each item. If a filename already exists, a save dialog lets you rename it or confirm overwriting

To reuse a whole shortcut group's rules, see [Copy a Shortcut](./register-shortcuts.md#copy-a-shortcut).

## Import and Export All Settings

The buttons in the upper right corner of Settings import or export all settings, separately from individual extension transfers in lists. The app restarts after a successful import.

When importing between macOS and Windows, TextGO clears incompatible runtime paths, browser choices, application blacklist entries, and platform scripts, and resets the copy key combination and popup size. Website blacklist entries are preserved. Reconfigure runtimes and browsers for the current machine and review your shortcut rules after import.

Exported files can contain API keys; the app asks for confirmation when keys are detected. Keep these files secure.

## Get Help

- Check the [FAQ](./faq.md)
- Report a problem on [GitHub Issues](https://github.com/C5H12O5/TextGO/issues)
