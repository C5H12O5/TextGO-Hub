# Train Classification Models

TextGO can train machine learning models to recognize custom text types.

## What Is a Classification Model?

TextGO uses **TensorFlow.js** to train and run models locally in the app's WebView:

- **No Backend Required**: Training and inference run locally
- **Privacy and Security**: Data never leaves your device
- **Real-time Inference**: Loaded models recognize text quickly
- **Lightweight**: Models are small and load quickly

## When to Use Classification Models

### Suitable Scenarios for Models

✅ **Complex Text Patterns**

- Patterns that are difficult to describe with regular expressions
- Text with variations but consistent overall characteristics

✅ **Sufficient Training Data**

- At least 3 unique, non-empty positive samples; more diverse samples generally improve results
- Samples should cover main variations

✅ **Some Misclassification Is Acceptable**

- Can tolerate a small amount of misclassification
- Suitable for fuzzy matching

### Unsuitable Scenarios for Models

❌ **Simple and Precise Patterns**

- Patterns that regular expressions can describe precisely
- Phone numbers, ID numbers, and other fixed formats

❌ **Insufficient Training Data**

- Fewer than 3 valid unique samples cannot be used for training
- Samples do not cover the main variations

❌ **Zero Errors Are Acceptable**

- Cannot tolerate any misclassification
- Workflows with strict accuracy requirements

## Create a Classification Model

### Step 1: Access Model Management

1. Open "Settings" > "Classification Model"
2. Click the "+" button to add a new model

### Step 2: Basic Information

Fill in the model's basic information:

**Model Name** (Required)

- Identifies the model
- Use a descriptive name

**Model Icon** (Optional)

- Choose an icon from the built-in library
- You can also upload a custom SVG icon

### Step 3: Prepare Training Data

Training data is key to determining the model's recognition capability.

**Data Format**:

- Enter one sample per line
- Samples can contain any text
- Blank lines are ignored and duplicate samples are removed

**Sample Quality Requirements**:

- ✅ Samples should cover main text variations
- ✅ Samples should include typical characteristics of this text type
- ✅ Remove irrelevant content from samples
- ❌ Avoid providing identical samples
- ❌ Avoid including erroneous or invalid samples

### Step 4: Configure Parameters

#### Basic Parameters

**Confidence Threshold** (0.01–0.99)

- Default: 0.5
- A model output must meet or exceed this value to count as a match
- Adjust as needed:
  - Increase threshold → Stricter matching, reduces false positives
  - Decrease threshold → Looser matching, increases recognition rate

![TextGO classification model editor](/screenshots/en/classification-model-editor.png)

## Use a Classification Model

Trained models appear in the recognition type list:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select the trained model in "Recognition Type"
4. Configure an action and save
