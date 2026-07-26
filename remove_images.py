import re

with open('src/data/openSourceTools.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the specific unsplash image string with an empty string or remove the line
# The line is: image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",

content = content.replace('    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",\n', '')
content = content.replace('    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop"', '    image: ""')

with open('src/data/openSourceTools.ts', 'w', encoding='utf-8') as f:
    f.write(content)
