# FAQ

Find solutions to common TextGO issues below.

<details class="faq-item">
<summary>1. macOS says the app is damaged and cannot be opened.</summary>

<br>

_Run this command in Terminal:_

```bash
sudo xattr -r -d com.apple.quarantine /Applications/TextGO.app
```

</details>

<details class="faq-item">
<summary>2. macOS says Apple cannot check the app for malicious software.</summary>

<br>

_Follow these steps:_

1. Open "System Settings" > "Privacy & Security"
2. Find the blocked application in the "Security" section
3. Click the "Open Anyway" button
4. Enter your login password and confirm

</details>

<details class="faq-item">
<summary>3. Accessibility permission stops working after a TextGO update.</summary>

<br>

_TextGO is unsigned, so macOS binds Accessibility permission to its current binary. An update changes the binary identity and invalidates the permission, even if System Settings still shows it as enabled._

_To restore permission:_

1. Open "System Settings" > "Privacy & Security" > "Accessibility"
2. Select TextGO from the list and remove it with the "−" button
3. Click the "+" button to add TextGO back

</details>
