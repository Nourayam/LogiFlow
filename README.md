AlgorVis is an interactive, educational platform that brings algorithms to life through stunning visual animations. Whether you're a student learning computer science fundamentals or an educator teaching complex algorithmic concepts, AlgorVis transforms abstract computational processes into engaging, step-by-step visual experiences.
🌟 Features
🔄 Comprehensive Algorithm Coverage

Sorting Algorithms: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort
Graph Traversal: Breadth-First Search (BFS), Depth-First Search (DFS)
Tree Operations: Binary tree traversals, insertions, and manipulations
More algorithms coming soon: Dijkstra's Algorithm, A* Pathfinding, AVL Trees

🎮 Interactive Visualisation Controls

Play/Pause: Control animation timing at your own pace
Step-by-Step Navigation: Move forward and backward through each algorithmic step
Speed Control: Adjust animation speed from 100ms to 1000ms intervals
Reset Functionality: Return to initial state instantly
Progress Tracking: Visual progress bar showing current execution step

🛠️ Custom Input & Flexibility

Dynamic Array Input: Enter your own numbers (e.g., 5, 3, 8, 4, 2)
Random Generation: Generate random test arrays with a single click
Input Validation: Intelligent error handling with helpful feedback messages
Algorithm-Specific Constraints: Automatic suggestions for optimal input sizes

📊 Educational Tools

Algorithm Information: Detailed descriptions of how each algorithm works
Complexity Analysis: Time and space complexity for worst, average, and best cases
Real-Time Descriptions: Step-by-step explanations during execution
Visual Highlighting: Colour-coded elements show comparisons, swaps, and sorted portions

💾 State Management

Export Visualisations: Save algorithm states as JSON files
Import Sessions: Load and replay previous visualisation sessions
Frame History: Complete state tracking for every algorithmic step
Session Persistence: Continue where you left off

🎨 Modern UI/UX

Dark Theme: Easy on the eyes for extended learning sessions
Responsive Design: Works seamlessly on desktop, tablet, and mobile devices
Smooth Animations: CSS transitions and transforms for polished visual effects
Accessibility: Keyboard navigation and screen reader support

🚀 Getting Started
Prerequisites

Node.js (version 16.0 or higher)
npm or yarn package manager
Modern web browser (Chrome, Firefox, Safari, Edge)

Installation

Clone the repository
bashCopygit clone https://github.com/yourusername/algorvis.git
cd algorvis/algorvis

Install dependencies
bashCopynpm install
# or
yarn install

Start development server
bashCopynpm run dev
# or
yarn dev

Open your browser
Navigate to http://localhost:5173 to see AlgorVis in action!

Building for Production
bashCopynpm run build
npm run preview
📖 How to Use AlgorVis
1. Select an Algorithm
Choose from our comprehensive list of sorting, searching, and tree algorithms using the dropdown menu.
2. Input Your Data

Enter numbers separated by commas: 64, 34, 25, 12, 22, 11, 90
Or click "Randomise" for a quick test array
Algorithm-specific tips appear to guide optimal input sizes

3. Start Visualisation

Click "Visualise" to generate the step-by-step animation
Use playback controls to navigate through each step
Read the real-time descriptions to understand what's happening

4. Learn and Explore

Review time/space complexity information
Export interesting visualisations to share or study later
Try different input sizes to see how algorithms scale

🧠 Educational Value
For Students

Visual Learning: See exactly how algorithms manipulate data structures
Step-by-Step Understanding: Break down complex processes into digestible steps
Comparative Analysis: Run different algorithms on the same data to compare efficiency
Interactive Exploration: Learn by doing, not just reading

For Educators

Classroom Ready: Perfect for lectures, tutorials, and demonstrations
Export Capabilities: Save specific examples for coursework
Engagement Tool: Transform abstract concepts into concrete visuals
Self-Paced Learning: Students can explore at their own speed

For Professionals

Interview Preparation: Visualise common algorithmic interview questions
Concept Refresher: Quick visual reminders of algorithm mechanics
Teaching Tool: Explain algorithms to team members or mentees

🏗️ Architecture & Technology
Frontend Stack

React 19.1.0: Modern component-based architecture
Vite: Lightning-fast development and build tool
CSS3: Custom animations and responsive design
ES6+ Modules: Clean, maintainable code structure

Key Design Patterns

Component Composition: Modular, reusable UI components
State Management: Efficient React hooks for complex state
Dynamic Imports: Code splitting for optimal performance
Error Boundaries: Graceful error handling and recovery

File Structure
Copysrc/
├── components/          # Reusable UI components
│   ├── Canvas.jsx      # Main visualisation area
│   ├── Controls.jsx    # Playback controls
│   ├── InputPanel.jsx  # Algorithm selection & input
│   └── Node.jsx        # Individual data elements
├── algorithms/         # Algorithm implementations
│   ├── bubbleSort.js   # Sorting algorithms
│   ├── bfs.js         # Graph algorithms
│   └── treeOps.js     # Tree algorithms
└── utils/             # Helper functions
    ├── algorithmInfo.js # Algorithm metadata
    └── validateFrames.js # Data validation
🛣️ Roadmap
Immediate Additions

 Pathfinding Algorithms: Dijkstra's, A*, Bellman-Ford
 Advanced Trees: AVL Trees, Red-Black Trees, B-Trees
 Dynamic Programming: Fibonacci, Knapsack, Longest Common Subsequence

Enhanced Features

 Custom Algorithm Upload: Let users write and visualise their own algorithms
 Performance Benchmarking: Real execution time measurements
 3D Visualisations: Advanced data structures in three dimensions
 Collaborative Sessions: Share visualisations in real-time

Platform Improvements

 Mobile App: Native iOS and Android applications
 Offline Mode: Download algorithms for offline learning
 Multi-language Support: Internationalisation for global accessibility
 Accessibility Enhancements: Full screen reader and keyboard support