# FAQ

This page collects common questions and solutions for using TextGO.

<details class="faq-item">
<summary>1. macOS shows "App is damaged and can't be opened."</summary>

<br>

_Run the following command in the terminal to resolve:_

```bash
sudo xattr -r -d com.apple.quarantine /Applications/TextGO.app
```

</details>

<details class="faq-item">
<summary>2. macOS shows "Apple can't check app for malicious software."</summary>

<br>

_Follow these steps to resolve:_

1. Open "System Settings" > "Privacy & Security"
2. Find the blocked application in the "Security" section
3. Click the "Open Anyway" button
4. Enter your login password and confirm

</details>

<details class="faq-item">
<summary>3. macOS accessibility permission not working after update.</summary>

<br>

_TextGO is not a signed app, so macOS binds the accessibility permission to the current binary. After each update, the new binary has a different identity, and the permission no longer applies — even though it still appears checked in System Settings._

_To fix this:_

1. Open "System Settings" > "Privacy & Security" > "Accessibility"
2. Select TextGO from the list and remove it with the "−" button
3. Click the "+" button to add TextGO back

</details>
