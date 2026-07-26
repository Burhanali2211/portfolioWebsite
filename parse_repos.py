import json
import sys

def parse_repos():
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        # Skip the first few lines that might contain the 'Source: ... ---' header from content.md
        lines = f.readlines()
        json_str = ""
        for line in lines:
            if line.startswith("[{"):
                json_str = line
                break
                
        if not json_str:
            print("Could not find JSON array")
            return

        try:
            repos = json.loads(json_str)
            for repo in repos:
                print(f"- {repo['name']} ({repo['html_url']}): {repo.get('description', '')[:50]}")
        except Exception as e:
            print(f"Error parsing JSON: {e}")

if __name__ == "__main__":
    parse_repos()
