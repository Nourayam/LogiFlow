import os
import requests

# === 🔐 Configuration ===
API_KEY = os.getenv("DEEPSEEK_API_KEY", "sk-1d543ab9361542a4a0596e6b85fc715e")
MODEL = "deepseek-chat"
ENDPOINT = "https://api.deepseek.com/v1/chat/completions"

# === 🗂️ File Paths ===
INPUT_FILES = [
    "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/promptfile.txt",
    "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/src/App.jsx",
    "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/index.css",
    "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/src/components/Canvas.jsx",
    "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/src/components/Node.jsx",
    "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/src/components/Controls.jsx",
    "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/src/components/InputPanel.jsx",
    "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/src/algorithms/bubbleSort.js",
    "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/src/algorithms/mergeSort.js",
    "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/src/utils/validateFrames.js",
    "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/src/utils/algorithmInfo.js"

]

OUTPUT_FILE = "C:/Users/noura/OneDrive/Desktop/Projects/algorvis/algorvis/deepseek_output.txt"

# === 📦 Load Prompt ===
# === 📦 Load Multiple Files ===
def load_files(paths):
    combined_text = ""
    for path in paths:
        if not os.path.isfile(path):
            print(f"⚠️ Missing file: {path}")
            continue
        with open(path, "r", encoding="utf-8") as f:
            combined_text += f"\n# ==== FILE: {path} ====\n"
            combined_text += f.read().strip() + "\n\n"
    return combined_text.strip()


# === 🧠 Build Payload ===
prompt_text = load_files(INPUT_FILES)

payload = {
    "model": MODEL,
    "temperature": 0.2,
    "messages": [
        {
            "role": "system",
            "content": (
                "You are a helpful assistant that always responds in English and returns clean, production-quality code."
            )
        },
        {
            "role": "user",
            "content": prompt_text
        }
    ]
}

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# === 🚀 Send Request ===
print(f"📡 Sending prompt from: {INPUT_FILES}")
response = requests.post(ENDPOINT, headers=headers, json=payload)

# === 📥 Handle Response ===
if response.status_code == 200:
    try:
        result = response.json()["choices"][0]["message"]["content"]
    except (KeyError, IndexError):
        raise ValueError("⚠️ Invalid response format from DeepSeek.")

    print("✅ Preview of DeepSeek response:\n")
    print(result[:1000] + "\n...")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(result)

    print(f"📁 Saved full response to: {OUTPUT_FILE}")
else:
    print(f"❌ API Error {response.status_code}:\n{response.text}")
