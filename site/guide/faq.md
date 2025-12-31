# FAQ

This page collects common questions and solutions for using TextGO.

## Installation and Startup

### macOS Security Warning

**Problem**: First launch shows "Cannot open application" or "from an unidentified developer".

**Solutions**:

1. Open "System Settings" > "Privacy & Security"
2. In the "Security" section, click the "Open Anyway" button
3. Alternatively, run in Terminal:
   ```bash
   xattr -cr /Applications/TextGO.app
   ```

### Windows Defender Warning

**Problem**: Windows Defender blocks the application from starting.

**Solutions**:

1. Click "More info"
2. Select "Run anyway"
3. Or add TextGO to Windows Defender exclusion list

### Linux Permission Issues

**Problem**: Application cannot start or lacks execution permission.

**Solutions**:

```bash
# Add execute permission
chmod +x TextGO.AppImage

# Run
./TextGO.AppImage
```

## Permission Settings

### macOS Accessibility Permission

**Problem**: Cannot capture keyboard shortcuts or get selected text.

**Reason**: TextGO needs accessibility permission to listen for global keyboard shortcuts.

**Solutions**:

1. Open "System Settings" > "Privacy & Security" > "Accessibility"
2. Find TextGO and enable it
3. If you don't see TextGO:
   - Click the "+" button
   - Select the TextGO application
   - Enable permission
4. Restart TextGO

**Verification**:

- Open TextGO
- Check if the settings interface shows "✓ Accessibility permission granted"

### Windows Screen Capture Permission

**Problem**: Cannot get selected text.

**Solutions**:

1. Open "Settings" > "Privacy" > "Screen capture"
2. Allow TextGO to capture screen content

### Linux Wayland Support

**Problem**: Does not work properly in Wayland session.

**Solutions**:

- Currently TextGO has limited support on Wayland
- Recommend using X11 session
- Or use XWayland compatibility layer

## Keyboard Shortcuts Issues

### Shortcuts Not Working

**Problem**: Registered shortcuts are not responding.

**Possible Causes**:

1. **Permission issues**: Accessibility permission not granted
2. **Shortcut conflicts**: Conflicts with system or other application shortcuts
3. **Shortcut format**: Incorrect shortcut format

**Solutions**:

1. **Check permissions**:
   - macOS: Check accessibility permissions
   - Windows: Run as administrator
2. **Avoid conflicts**:
   - Choose uncommon shortcut combinations
   - Check system shortcut settings
   - Use Cmd/Ctrl + Shift + letter combinations

3. **Correct format**:

   ```yaml
   # ✅ Correct
   Cmd+Shift+C    # macOS
   Ctrl+Shift+C   # Windows/Linux

   # ❌ Wrong
   Command+Shift+C
   cmd+shift+c
   ```

### Mouse Shortcuts Not Working

**Problem**: Mouse gestures or click shortcuts are not responding.

**Solutions**:

1. Confirm mouse shortcuts feature is enabled
2. Check mouse button configuration
3. Some mouse drivers may intercept button presses
4. Try using different mouse button combinations

### Drag-and-Drop Shortcuts Failing

**Problem**: No action triggered when dragging text.

**Check**:

1. Is the drop target correctly configured?
2. Is the drop area within the application window?
3. Is the dragged content type supported?

**Tips**:

- Drag-and-drop functionality requires explicit target areas
- Some applications may not support drag-and-drop operations

## Text Recognition

### Recognition Inaccuracy

**Problem**: Text recognition often errors or matches wrong types.

**Causes**:

1. Regular expressions too broad
2. Insufficient model training data
3. Recognition rule priority issues

**Solutions**:

1. **Optimize regular expressions**:

   ```javascript
   // ❌ Too broad
   /\d+/

   // ✅ More precise
   /^https?:\/\/.+$/
   /^\d{11}$/  // Phone number
   ```

2. **Increase training samples**:
   - Provide more correct examples for the model
   - Include various variants
   - At least 20-30 samples

3. **Adjust priorities**:
   - Place more specific rules first
   - Use exclusion rules to avoid false matches

### Insufficient Built-in Recognition Types

**Problem**: The text types you need to recognize are not in the built-in list.

**Solutions**:

1. **Use regular expressions**:
   - Create custom regex matching rules
   - See [Writing Regular Expressions](./write-regexes.md)

2. **Train custom models**:
   - Collect sample data
   - Train machine learning models
   - See [Training Models](./train-models.md)

### Language Detection Errors

**Problem**: Text language is incorrectly identified.

**Causes**:

- Text too short (less than 10 characters)
- Mixed language text
- Many special characters

**Solutions**:

1. Provide longer text samples
2. Use regular expressions for pre-filtering
3. Manually specify language type

## Script Execution

### JavaScript Script Errors

**Problem**: Errors occur when executing scripts.

**Common Errors**:

1. **SyntaxError**: Syntax errors

   ```javascript
   // Check syntax
   function process(data) {
     return data.selection.toUpperCase(); // Note semicolon
   }
   ```

2. **ReferenceError**: Variable undefined

   ```javascript
   // Ensure all variables are defined
   function process(data) {
     const text = data.selection; // Use const or let
     return text;
   }
   ```

3. **TypeError**: Type errors
   ```javascript
   // Check data types
   function process(data) {
     if (typeof data.selection !== 'string') {
       return 'Input must be a string';
     }
     return data.selection.toUpperCase();
   }
   ```

**Debugging Steps**:

1. Use `console.log` for debug output
2. Test in the script editor
3. Check the error message line numbers

### Python Script Cannot Find Module

**Problem**: `ModuleNotFoundError: No module named 'xxx'`

**Solutions**:

1. **Confirm module is installed**:

   ```bash
   pip list | grep module_name
   ```

2. **Install missing module**:

   ```bash
   pip install module_name
   ```

3. **Check Python environment**:

   ```bash
   # Check current Python path
   which python3

   # Check pip installation location
   pip show module_name
   ```

4. **Use virtual environment**:
   - Create a dedicated virtual environment
   - Configure virtual environment path in TextGO
   - See [Python Scripts](./python-scripts.md)

### Script Execution Timeout

**Problem**: Script runs too long.

**Causes**:

- Processing too much data
- Inefficient algorithm
- Infinite loop exists

**Solutions**:

1. **Optimize algorithm**:

   ```python
   # ❌ Low efficiency
   result = ""
   for i in range(10000):
       result += str(i)

   # ✅ High efficiency
   result = ''.join(str(i) for i in range(10000))
   ```

2. **Limit input size**:

   ```python
   def process(data):
       max_length = 100000
       if len(data["selection"]) > max_length:
           return "Text too long"
       # Continue processing
   ```

3. **Use timeout mechanism**:
   - Set reasonable timeout
   - Avoid infinite loops

## AI Integration

### Cannot Connect to AI Service

**Problem**: Ollama or LM Studio connection fails.

**Checklist**:

1. **Is the service running**:

   ```bash
   # Ollama
   curl http://localhost:11434/api/tags

   # LM Studio
   curl http://localhost:1234/v1/models
   ```

2. **Is the port correct**:
   - Ollama default: 11434
   - LM Studio default: 1234
   - Check firewall settings

3. **Is the model loaded**:
   - Ollama: `ollama list`
   - LM Studio: Check model list in interface

**Solutions**:

1. Start the corresponding service
2. Download and load model
3. Check network connection
4. See [Calling Local AI](./call-local-ai.md)

### Slow AI Response

**Problem**: AI generates replies very slowly.

**Causes**:

- Model too large
- Insufficient hardware performance
- Prompt too long

**Optimization**:

1. **Use smaller models**:

   ```bash
   # Ollama - Use quantized version
   ollama pull llama2:7b-q4_0  # 4-bit quantization
   ```

2. **Simplify prompts**:
   - Avoid excessively long context
   - Include only necessary information
   - Limit output length

3. **Hardware upgrade**:
   - Use GPU acceleration
   - Increase memory
   - Use SSD

### Poor AI Reply Quality

**Problem**: AI-generated content does not meet expectations.

**Optimization**:

1. **Improve prompts**:

   ```yaml
   # ❌ Vague
   Translate this text

   # ✅ Specific
   Translate the following English text to Chinese, maintaining accuracy of technical terms:
   {selection}
   ```

2. **Choose appropriate models**:
   - Translation: llama2, mistral
   - Code: codellama, deepseek-coder
   - General: qwen, gemma

3. **Adjust parameters**:
   - temperature: Control randomness
   - top_p: Control diversity
   - max_tokens: Control length

## Performance Issues

### Slow Application Startup

**Problem**: TextGO takes too long to start.

**Possible Causes**:

1. Too many rule configurations
2. Model files too large
3. Insufficient system resources

**Optimization**:

1. Reduce infrequently used rules
2. Clean up old model files
3. Close unnecessary background applications
4. Increase system memory

### High Memory Usage

**Problem**: TextGO uses too much memory.

**Causes**:

- Multiple large models loaded
- Too much history
- Memory leak

**Solutions**:

1. **Clean history**:
   - Regularly clean execution history
   - Limit history record count

2. **Optimize models**:
   - Use quantized models
   - Unload unused models
   - Limit simultaneously loaded model count

3. **Restart application**:
   - Restart TextGO periodically
   - Free memory resources

### Recognition Lag

**Problem**: Slow text recognition response.

**Optimization**:

1. **Simplify regular expressions**:
   - Avoid complex backtracking
   - Use non-capturing groups `(?:...)`

2. **Optimize models**:
   - Reduce model size
   - Use faster inference engine

3. **Adjust trigger conditions**:
   - Increase trigger delay
   - Reduce unnecessary recognition

## Data and Configuration

### Configuration File Location

**Problem**: Want to backup or migrate configuration.

**Configuration file paths**:

- **macOS**: `~/Library/Application Support/com.textgo.app/`
- **Windows**: `%APPDATA%\com.textgo.app\`
- **Linux**: `~/.config/textgo/`

**Important files**:

- `config.json`: Application configuration
- `shortcuts.json`: Shortcut rules
- `models/`: Trained model files
- `scripts/`: Custom scripts

### Export/Import Configuration

**Export configuration**:

1. Open "Settings" > "Advanced"
2. Click "Export Configuration"
3. Choose save location

**Import configuration**:

1. Open "Settings" > "Advanced"
2. Click "Import Configuration"
3. Select configuration file

**Tips**:

- Backup configuration regularly
- Export configuration before upgrading
- Use version control to manage configuration

### Reset Settings

**Problem**: Application configuration has issues, want to reset.

**Option 1: In-app reset**

1. Open "Settings" > "Advanced"
2. Click "Reset All Settings"
3. Confirm operation

**Option 2: Manually delete configuration**

```bash
# macOS
rm -rf ~/Library/Application\ Support/com.textgo.app/

# Linux
rm -rf ~/.config/textgo/

# Windows (PowerShell)
Remove-Item -Recurse -Force $env:APPDATA\com.textgo.app\
```

**Warning**: All configuration and data will be lost after reset, please backup first!

## Updates and Upgrades

### Check for Updates

**Manual check**:

1. Open "Help" > "Check for Updates"
2. If new version available, click "Download"

**Automatic updates**:

- Enable "Automatically check for updates" option
- Application will check automatically on startup

### Upgrade Failed

**Problem**: Error occurs when updating.

**Solutions**:

1. **Re-download installer**:
   - Visit [GitHub Releases](https://github.com/chenjiahan/TextGO/releases)
   - Download latest version
   - Install manually

2. **Clean old version**:

   ```bash
   # macOS
   rm -rf /Applications/TextGO.app

   # Then reinstall
   ```

3. **Check system requirements**:
   - macOS 11.0+
   - Windows 10+
   - Modern Linux distributions

## Other Issues

### Log File Location

**View logs**:

- **macOS**: `~/Library/Logs/com.textgo.app/`
- **Windows**: `%APPDATA%\com.textgo.app\logs\`
- **Linux**: `~/.local/share/textgo/logs/`

**Log levels**:

1. Open "Settings" > "Advanced" > "Log Level"
2. Choose: Error / Warning / Info / Debug

### Reporting Issues

**Submit Bug**:

1. Visit [GitHub Issues](https://github.com/chenjiahan/TextGO/issues)
2. Click "New Issue"
3. Select "Bug Report" template
4. Fill in detailed information:
   - System version
   - TextGO version
   - Reproduction steps
   - Error logs
   - Screenshots (if any)

**Get Help**:

- GitHub Discussions
- Project documentation
- Community forums

### Uninstall Application

**macOS**:

```bash
# Delete application
rm -rf /Applications/TextGO.app

# Delete configuration (optional)
rm -rf ~/Library/Application\ Support/com.textgo.app/
rm -rf ~/Library/Logs/com.textgo.app/
```

**Windows**:

1. Open "Settings" > "Apps"
2. Find TextGO
3. Click "Uninstall"

**Linux**:

```bash
# Delete AppImage
rm TextGO.AppImage

# Delete configuration (optional)
rm -rf ~/.config/textgo/
rm -rf ~/.local/share/textgo/
```

## Still Have Questions?

If this page doesn't solve your problem:

1. **Check documentation**: Browse other documentation pages
2. **Search Issues**: Search for similar issues on GitHub
3. **Ask questions**: Ask in GitHub Discussions
4. **Report Bug**: Submit an Issue

## Next Steps

- [Contribution Guide](./contribution.md) - Participate in project development
- [Getting Started](./getting-started.md) - Learn from scratch
