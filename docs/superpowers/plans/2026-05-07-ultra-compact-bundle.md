# Ultra-Compact Bundle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create an ultra-compact Python script that bundles the AllMySell source code into a single text file, aggressively removing boilerplate, comments, and whitespace to save tokens for NotebookLM.

**Architecture:** A standalone Python script that recursively walks the project directory, applies ignore rules (especially `components/ui` and `node_modules`), and cleans each file's content using regex and string manipulation.

**Tech Stack:** Python 3 (standard library).

---

### Task 1: Create the Bundle Script

**Files:**
- Create: `bundle_ultra_compact.py`

- [ ] **Step 1: Write the implementation of bundle_ultra_compact.py**

```python
import os
import re
from datetime import datetime

# Configuration
OUTPUT_FILE = "allmysell_ultra_compact.txt"
IGNORE_DIRS = {
    'node_modules', '.next', '.git', 'venv', 'public', 
    'dist', 'build', '__pycache__', '.vercel', 'prisma/migrations',
    'components/ui'  # Exclude Shadcn boilerplate
}
IGNORE_FILES = {
    'package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 
    '.env', '.env.local', '.env.production', 'bundle_ultra_compact.py',
    'allmysell_ultra_compact.txt'
}
ALLOWED_EXTENSIONS = {
    '.ts', '.tsx', '.js', '.jsx', '.py', '.prisma', '.json', '.md', '.css'
}

def clean_content(content, ext):
    # Remove single-line comments // (but be careful with URLs in strings)
    # Simple regex for // comments at start or after space
    content = re.sub(r'(^|\s)//.*$', '', content, flags=re.MULTILINE)
    
    # Remove multi-line comments /* */
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    lines = content.splitlines()
    cleaned_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped: # Skip empty lines
            cleaned_lines.append(stripped)
    
    return "\n".join(cleaned_lines)

def bundle():
    print("Starting ultra-compact bundle process...")
    project_root = os.getcwd()
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        out.write(f"# ALLMYSELL PROJECT SOURCE (ULTRA-COMPACT)\n")
        out.write(f"# Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        file_count = 0
        for root, dirs, files in os.walk(project_root):
            # Prune ignored directories
            dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
            
            for file in files:
                if file in IGNORE_FILES:
                    continue
                    
                ext = os.path.splitext(file)[1]
                if ext not in ALLOWED_EXTENSIONS:
                    continue
                
                rel_path = os.path.relpath(os.path.join(root, file), project_root)
                
                try:
                    with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    cleaned = clean_content(content, ext)
                    
                    out.write(f"--- FILE: {rel_path} ---\n")
                    out.write(cleaned)
                    out.write("\n\n")
                    file_count += 1
                except Exception as e:
                    print(f"Error processing {rel_path}: {e}")

    print(f"Bundle complete! {file_count} files bundled into {OUTPUT_FILE}")
    size_kb = os.path.getsize(OUTPUT_FILE) / 1024
    print(f"Final file size: {size_kb:.2f} KB")

if __name__ == "__main__":
    bundle()
```

- [ ] **Step 2: Run the script to generate the bundle**

Run: `python bundle_ultra_compact.py`
Expected: Output showing the number of files and a size (ideally under 300KB).

- [ ] **Step 3: Verify the output file exists and has content**

Run: `ls -l allmysell_ultra_compact.txt`

- [ ] **Step 4: Commit the script**

```bash
git add bundle_ultra_compact.py
git commit -m "feat: add ultra-compact bundle script for NotebookLM"
```
