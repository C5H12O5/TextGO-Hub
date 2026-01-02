# Train Classification Models

TextGO supports training machine learning models to recognize custom text types. By training models, you can enable TextGO to recognize any specific text patterns, greatly expanding its recognition capabilities.

## What is Classification Model

TextGO uses **TensorFlow.js** to train and run machine learning models in the browser. This approach offers the following advantages:

- **No Backend Required**: All training and inference are completed locally
- **Privacy and Security**: Data never leaves your device
- **Real-time Inference**: Models can quickly recognize text after loading
- **Lightweight**: Small model size, fast loading

## When to Use Classification Models

### Suitable Scenarios for Models

✅ **Complex Text Patterns**

- Text patterns that are difficult to describe with simple regular expressions
- Text with certain variations but overall similar patterns

✅ **Sufficient Training Data**

- At least 10-20 positive samples required
- Samples should cover main variations

✅ **Recognition Accuracy Requirements Not 100%**

- Can tolerate a small amount of misclassification
- Suitable for fuzzy matching scenarios

### Unsuitable Scenarios for Models

❌ **Simple and Precise Patterns**

- Cases that can be precisely described with regular expressions
- For example: phone numbers, ID numbers, and other fixed formats

❌ **Insufficient Training Data**

- Only a few samples available
- Samples don't cover all variations

❌ **Requires 100% Accuracy**

- Cannot tolerate any misclassification
- Business scenarios with strict accuracy requirements

## Create Classification Model

### Step 1: Access Model Management

1. Open "Settings" > "Classification Model"
2. Click the "+" button to add a new model

### Step 2: Basic Information

Fill in the model's basic information:

**Model Name** (Required)

- Used to identify the model
- Recommend using a descriptive name

**Model Icon** (Optional)

- Click the icon selector to choose an icon
- Supports built-in icon library
- Supports uploading custom SVG icons

### Step 3: Prepare Training Data

Training data is key to determining the model's recognition capability.

**Data Format**:

- One sample per line
- Samples separated by line breaks
- Supports any type of text content

**Sample Quality Requirements**:

- ✅ Samples should cover main text variations
- ✅ Samples should include typical characteristics of this text type
- ✅ Clean irrelevant content from samples
- ❌ Avoid providing identical samples
- ❌ Avoid including erroneous or invalid samples

### Step 4: Configure Parameters

#### Basic Parameters

**Confidence Threshold** (0.0 - 1.0)

- Default: 0.5
- Description: Model output confidence must exceed this threshold to be judged as a match
- Adjustment recommendations:
  - Increase threshold → Stricter matching, reduces false positives
  - Decrease threshold → Looser matching, increases recognition rate

## Use Classification Model

Trained models will automatically appear in the recognition type list:

1. Open "Global Shortcuts"
2. Add a new rule
3. Select your trained model in "Recognition Type"
4. Configure the corresponding action and save
