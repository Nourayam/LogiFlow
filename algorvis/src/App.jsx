import { useState, useEffect } from 'react';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import InputPanel from './components/InputPanel';
import Loader from './components/Loader';
import { ALGORITHM_INFO } from './utils/algorithmInfo';
import { validateFrames } from './utils/validateFrames';
import './App.css';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble Sort');
  const [inputArray, setInputArray] = useState([5, 3, 8, 4, 2]);
  const [frames, setFrames] = useState([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [isGeneratingFrames, setIsGeneratingFrames] = useState(false);
  const [error, setError] = useState(null);

  const algorithmInfo = ALGORITHM_INFO[selectedAlgorithm];

  // Load algorithm dynamically
  const loadAlgorithm = async (algorithm) => {
    const algorithmMap = {
      'Bubble Sort': () => import('./algorithms/bubbleSort'),
      'Merge Sort': () => import('./algorithms/mergeSort'),
      'Quick Sort': () => import('./algorithms/quickSort'),
      'Breadth-First Search': () => import('./algorithms/bfs'),
      'Depth-First Search': () => import('./algorithms/dfs'),
      'Binary Tree Operations': () => import('./algorithms/treeOps')
    };

    try {
      const module = await algorithmMap[algorithm]();
      return module.generateFrames;
    } catch (err) {
      throw new Error(`Failed to load algorithm: ${algorithm}`);
    }
  };

  // Generate visualisation frames
  const generateVisualisationFrames = async () => {
    if (inputArray.length === 0) {
      setError('Please provide input data');
      return;
    }

    setIsGeneratingFrames(true);
    setError(null);
    
    try {
      const generateFrames = await loadAlgorithm(selectedAlgorithm);
      const newFrames = generateFrames([...inputArray]);
      const validatedFrames = validateFrames(newFrames, selectedAlgorithm);
      
      setFrames(validatedFrames);
      setCurrentFrameIndex(0);
      setIsPlaying(false);
    } catch (err) {
      setError(`Visualisation error: ${err.message}`);
      console.error('Algorithm generation failed:', err);
    } finally {
      setIsGeneratingFrames(false);
    }
  };

  // Auto-play animation
  useEffect(() => {
    let interval;
    if (isPlaying && frames.length > 0) {
      interval = setInterval(() => {
        setCurrentFrameIndex(prev => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 - speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, frames.length, speed]);

  // Generate initial frames
  useEffect(() => {
    generateVisualisationFrames();
  }, [selectedAlgorithm, inputArray]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleStepForward = () => {
    if (currentFrameIndex < frames.length - 1) {
      setCurrentFrameIndex(currentFrameIndex + 1);
    }
  };
  const handleStepBackward = () => {
    if (currentFrameIndex > 0) {
      setCurrentFrameIndex(currentFrameIndex - 1);
    }
  };
  const handleReset = () => {
    setCurrentFrameIndex(0);
    setIsPlaying(false);
  };
  const handleSpeedChange = (e) => setSpeed(parseInt(e.target.value));

  const handleExport = () => {
    const data = { algorithm: selectedAlgorithm, input: inputArray, frames };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `algorvis-${selectedAlgorithm.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            setSelectedAlgorithm(data.algorithm);
            setInputArray(data.input);
            setFrames(data.frames);
            setCurrentFrameIndex(0);
          } catch (err) {
            setError('Invalid import file format');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const currentFrame = frames[currentFrameIndex] || { array: inputArray, highlight: [], description: 'Ready to visualise' };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 AlgorVis</h1>
        <p>Interactive Algorithm Visualisation Platform</p>
      </header>

      <main className="app-main">
        <div className="sidebar">
          <InputPanel
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            inputArray={inputArray}
            setInputArray={setInputArray}
            algorithmInfo={algorithmInfo}
            isGeneratingFrames={isGeneratingFrames}
          />
        </div>

        <div className="visualisation-area">
          {isGeneratingFrames ? (
            <Loader />
          ) : (
            <>
              <Canvas
                frame={currentFrame}
                algorithm={selectedAlgorithm}
                frameIndex={currentFrameIndex}
                totalFrames={frames.length}
                algorithmInfo={algorithmInfo}
                error={error}
              />
              <Controls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
                onReset={handleReset}
                speed={speed}
                onSpeedChange={handleSpeedChange}
                frameIndex={currentFrameIndex}
                totalFrames={frames.length}
                onExport={handleExport}
                onImport={handleImport}
                isGeneratingFrames={isGeneratingFrames}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;