import re

with open('lib/articles.ts', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if line.strip().startswith("content: '"):
        # find the first quote
        start_idx = line.find("content: '") + len("content: '")
        # find the last quote
        end_idx = line.rfind("'")
        
        # extract the string content
        content_str = line[start_idx:end_idx]
        
        # unescape first just in case
        content_str = content_str.replace("\\'", "'")
        
        # escape all single quotes
        content_str = content_str.replace("'", "\\'")
        
        # reconstruct the line
        new_line = line[:start_idx] + content_str + line[end_idx:]
        new_lines.append(new_line)
    elif line.strip().startswith("title: '"):
        # do same for title
        start_idx = line.find("title: '") + len("title: '")
        end_idx = line.rfind("'")
        content_str = line[start_idx:end_idx]
        content_str = content_str.replace("\\'", "'")
        content_str = content_str.replace("'", "\\'")
        new_line = line[:start_idx] + content_str + line[end_idx:]
        new_lines.append(new_line)
    elif line.strip().startswith("excerpt: '"):
        # do same for excerpt
        start_idx = line.find("excerpt: '") + len("excerpt: '")
        end_idx = line.rfind("'")
        content_str = line[start_idx:end_idx]
        content_str = content_str.replace("\\'", "'")
        content_str = content_str.replace("'", "\\'")
        new_line = line[:start_idx] + content_str + line[end_idx:]
        new_lines.append(new_line)
    else:
        new_lines.append(line)

with open('lib/articles.ts', 'w') as f:
    f.writelines(new_lines)

