# 🧮 AlgorVis

AlgorVis is an interactive, educational platform that brings algorithms to life through stunning visual animations. Whether you're a student learning computer science fundamentals or an educator teaching complex algorithmic concepts, AlgorVis transforms abstract computational processes into engaging, step-by-step visual experiences.

---

## 🌟 Features

### 🔄 Comprehensive Algorithm Coverage
- **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort  
- **Graph Traversal**: Breadth-First Search (BFS), Depth-First Search (DFS)  
- **Tree Operations**: Binary tree traversals, insertions, and manipulations  
- _More algorithms coming soon_: Dijkstra's Algorithm, A* Pathfinding, AVL Trees

### 🎮 Interactive Visualisation Controls
- Play/Pause: Control animation timing at your own pace  
- Step-by-Step Navigation: Move through each algorithmic step  
- Speed Control: Adjust speed from 100ms to 1000ms  
- Reset Functionality: Return to initial state  
- Progress Tracking: Visual bar shows current execution step

### 🛠️ Custom Input & Flexibility
- Dynamic Array Input: e.g. `5, 3, 8, 4, 2`  
- Random Generation: Single-click test arrays  
- Input Validation: Intelligent feedback on errors  
- Algorithm-Specific Constraints: Optimal input suggestions

### 📊 Educational Tools
- Algorithm Information: Detailed breakdowns  
- Complexity Analysis: Best, average, and worst cases  
- Real-Time Descriptions: Step-by-step execution insights  
- Visual Highlighting: Colour-coded comparisons and swaps

### 💾 State Management
- Export Visualisations: Save states as JSON  
- Import Sessions: Replay previous runs  
- Frame History: Track every step  
- Session Persistence: Continue where you left off

### 🎨 Modern UI/UX
- Dark Theme: Eye comfort for extended use  
- Responsive Design: Desktop, tablet, and mobile  
- Smooth Animations: CSS transitions  
- Accessibility: Keyboard and screen reader support

---

## 🚀 Getting Started

### Prerequisites
- Node.js (16.0 or higher)  
- npm or yarn  
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
git clone https://github.com/yourusername/algorvis.git
cd algorvis/algorvis
npm install # or yarn install
npm run dev # or yarn dev
```
Then open http://localhost:5173 to see AlgorVis in action!

### Building for Production
```bash
npm run build
npm run preview
```
### 📖 How to Use AlgorVis
***Select an Algorithm From the dropdown: sorting, searching, or tree algorithms.***

- Input Your Data
    Example: 64, 34, 25, 12, 22, 11, 90
- Or use "Randomise"
- Tips appear based on selected algorithm

### Start Visualisation

- Click "Visualise" to begin animation
- Use playback controls to explore
- Watch real-time descriptions update

***Learn and Explore***
- Review time/space complexity
- Export key visualisations
- Try varied input sizes

### 🧠 Educational Value

***For Students***
- Visual Learning
- Step-by-Step Understanding
- Comparative Efficiency
- Interactive Exploration

***For Educators***
- Classroom Ready
- Export Capabilities
- Engagement Tool
- Self-Paced Discovery

***For Professionals***
- Interview Preparation
- Concept Refresher
- Teaching Tool

### 🏗️ Architecture & Technology

- Frontend Stack
- React 19.1.0
- Vite
- CSS3
- ES6+ Modules

***Key Design Patterns***
- Component Composition
- State Management via Hooks
- Dynamic Imports & Code Splitting
- Error Boundaries

### File Structure
src/
├── components/          # UI modules
│   ├── Canvas.jsx       # Visualisation canvas
│   ├── Controls.jsx     # Playback controls
│   ├── InputPanel.jsx   # Input + algorithm selector
│   └── Node.jsx         # Data nodes
├── algorithms/          # Algorithm logic
│   ├── bubbleSort.js
│   ├── bfs.js
│   └── treeOps.js
└── utils/
    ├── algorithmInfo.js
    └── validateFrames.js

### 🛣️ Roadmap
***Immediate Additions***
- Dijkstra’s, A*, Bellman-Ford
- AVL Trees, Red-Black Trees, B-Trees
- Dynamic Programming (Fibonacci, Knapsack, LCS)

***Enhanced Features***
- Custom Algorithm Upload
- Performance Benchmarking
- 3D Visualisations

***Collaborative Sessions***
- Platform Improvements
- Native Mobile Apps
- Offline Mode
- Multi-language Support

***Full Accessibility Enhancements***

- 🐛 Bug Reports

- 💡 Feature Requests

- 🔧 Code Submissions

- 📚 Documentation

- 🎨 UX Enhancements
