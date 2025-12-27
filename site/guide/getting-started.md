# Getting Started

## Installation

Download the installer for your platform from [**GitHub Releases**](https://github.com/C5H12O5/TextGO/releases) and follow the installation instructions.

### System Requirements

- **macOS**: macOS 11.0 or later
- **Windows**: Windows 10 or later

## Permission Setup

### macOS Permissions

On macOS, the following permissions are required for proper functionality:

1. **Accessibility**: Required for simulating keyboard input
2. **Input Monitoring**: Required for listening to mouse events

The system will automatically prompt you to grant these permissions while using the app. You can also manually configure them in "System Settings" > "Privacy & Security".

### Troubleshooting

<details>
<summary>macOS shows "App is damaged and can't be opened."</summary>

Run the following command in the terminal to resolve:

```bash
sudo xattr -r -d com.apple.quarantine /Applications/TextGO.app
```

</details>

<details>
<summary>macOS shows "Apple can't check app for malicious software."</summary>

Follow these steps to resolve:

1. Open "System Settings" > "Privacy & Security"
2. Find the blocked application in the "Security" section
3. Click the "Open Anyway" button
4. Enter your login password and confirm

</details>

## First Run

After installation and granting necessary permissions:

1. Launch TextGO from your Applications folder (macOS) or Start menu (Windows)
2. The app will run in the system tray
3. Configure your preferences from the settings menu
4. Start using text processing features with hotkeys or mouse triggers

## Next Steps

- Learn about [Features](/guide/features) to understand what TextGO can do
- Explore [Development](/guide/development) if you want to contribute or extend TextGO
