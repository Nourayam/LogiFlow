import os
import requests

# === 🔐 Configuration ===
API_KEY = os.getenv("DEEPSEEK_API_KEY", "sk-1d543ab9361542a4a0596e6b85fc715e")
MODEL = "deepseek-chat"
ENDPOINT = "https://api.deepseek.com/v1/chat/completions"

# === 🗂️ Project Files to Submit ===
INPUT_FILES = [
    "Algorvis/promptfile.txt"
]

OUTPUT_FILE = "Algorvis/promptfile.txt"

# === 📦 Load Code from Files ===
def load_files(file_paths):
    combined_text = ""
    for path in file_paths:
        if not os.path.isfile(path):
            print(f"⚠️ Missing file: {path}")
            continue
        with open(path, "r", encoding="utf-8") as f:
            combined_text += f"\n# ==== FILE: {path} ====\n"
            combined_text += f.read() + "\n"
    return combined_text.strip()

# === 🧠 Create Refactoring Prompt ===
code_context = load_files(INPUT_FILES)
if not code_context:
    raise ValueError("No valid input files loaded — check your paths.")

prompt = (
    "You are a helpful assistant that always responds in English and returns clean, production-quality Python.\n"
    "Please review and refactor this code:\n\n" + code_context
)

# === 📬 Compose Request Payload ===
payload = {
    "model": MODEL,
    "temperature": 0.2,
    "messages": [
        {"role": "user", "content": prompt}
    ]
}

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# === 🚀 Send Request to DeepSeek ===
print("📡 Sending prompt to DeepSeek...\n")
response = requests.post(ENDPOINT, headers=headers, json=payload)

# === 📥 Handle the Response ===
if response.status_code == 200:
    try:
        result_text = response.json()["choices"][0]["message"]["content"]
    except (KeyError, IndexError):
        raise ValueError("Invalid response format from DeepSeek.")

    print("✅ Received response:\n")
    print(result_text[:1000] + "\n...")  # Preview output

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(result_text)
    print(f"📁 Response saved to: {OUTPUT_FILE}")
else:
    print(f"❌ API Error {response.status_code}:\n{response.text}")
