# Ultra-Compact Project Bundler for NotebookLM

## 1. Overview
The goal is to create a Python script that bundles the AllMySell project source code into a single text file while minimizing token usage. This is achieved by excluding non-essential boilerplate and aggressively cleaning the remaining source code.

## 2. Technical Strategy

### 2.1 Filtering (What to Exclude)
The script will ignore directories and files that do not contain core business logic or are already "known" by LLMs as boilerplate:
- **Directories:** `node_modules`, `.next`, `.git`, `venv`, `public`, `dist`, `build`, `__pycache__`.
- **UI Boilerplate:** `components/ui` (Shadcn/Radix components).
- **Media/Large Files:** `*.ico`, `*.png`, `*.jpg`, `*.jpeg`, `*.svg`, `*.pdf`.
- **Lock Files:** `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`.
- **Secrets:** `.env`, `.env.local`, `.env.production`.

### 2.2 Cleaning Logic (Token Reduction)
For every included file (`.ts`, `.tsx`, `.js`, `.jsx`, `.py`, `.prisma`, `.json`, `.md`), the following transformations will be applied:
1.  **Remove Comments:** Strip all single-line (`//`) and multi-line (`/* */`) comments.
2.  **Strip Whitespace:** Remove leading/trailing whitespace from each line.
3.  **Remove Blank Lines:** Eliminate all empty lines.
4.  **Minify JSON:** (Optional) If it's a JSON file, load and dump with `separators=(',', ':')`.

### 2.3 Output Format
The resulting file `allmysell_ultra_compact.txt` will follow this structure:
```text
# ALLMYSELL PROJECT SOURCE (ULTRA-COMPACT)
# Generated: YYYY-MM-DD HH:MM:SS

--- FILE: path/to/file.ts ---
code_line_1
code_line_2
...
```

## 3. Implementation Steps
1.  Create `bundle_ultra_compact.py` in the project root.
2.  Define the recursive file walker with ignore lists.
3.  Implement the cleaning function (regex-based comment removal).
4.  Write the cleaned content to the output file.
5.  Report the final size reduction to the user.

## 4. Success Criteria
- The output file should be significantly smaller (target: <200KB) compared to the previous bundle.
- The code must remain syntactically valid for an LLM to understand logic (even if it's not pretty).
- No sensitive information (API keys in .env) should be included.
