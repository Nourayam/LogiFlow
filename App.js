import { useState, useEffect, useCallback } from 'react';
import * as bubbleSort from './algorithms/bubbleSort';
import * as mergeSort from './algorithms/mergeSort';
import * as quickSort from './algorithms/quickSort';
import * as bfs from './algorithms/bfs';
import * as dfs from './algorithms/dfs';
import * as treeOps from './algorithms/treeOps';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import InputPanel from './components/InputPanel';
import './index.css';

const ALGORITHMS = {
  'Bubble Sort': bubbleSort,
  'Merge Sort': mergeSort,
  'Quick Sort': quickSort,
  'Breadth-First Search': bfs,
  'Depth-First Search': dfs,
  'Binary Tree Operations': treeOps,
};

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble Sort');
  const [inputArray, setInputArray] = useState([5, 3, 8, 4, 2]);
  const [frames, setFrames] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(500);


// Generate frames with error handling
  useEffect(() => {
    try {
      const algorithm = ALGORITHMS[selectedAlgorithm];
      if (algorithm?.generateFrames) {
        const newFrames = algorithm.generateFrames(inputArray);
        if (!newFrames || newFrames.length === 0) {
          throw new Error('Algorithm returned no frames');
        }
        setFrames(newFrames);
        setFrameIndex(0);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Frame generation error:', error);
      setFrames([{
        array: inputArray,
        highlight: [],
        swapped: false,
        sortedIndices: [],
        description: `Error: ${error.message}`
      }]);
    }
  }, [selectedAlgorithm, inputArray]);

  // Safer animation handling
  useEffect(() => {
    if (!isPlaying || frames.length === 0) return;

    const timer = setTimeout(() => {
      setFrameIndex(prev => {
        if (prev < frames.length - 1) return prev + 1;
        setIsPlaying(false);
        return prev;
      });
    }, speedMs);

    return () => clearTimeout(timer);
  }, [isPlaying, frameIndex, frames, speedMs]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    if (frameIndex < frames.length - 1) {
      setFrameIndex(frameIndex + 1);
    }
  };

  const handleStepBackward = () => {
    if (frameIndex > 0) {
      setFrameIndex(frameIndex - 1);
    }
  };

  const handleReset = () => {
    setFrameIndex(0);
    setIsPlaying(false);
  };

  const handleSpeedChange = (e) => {
    setSpeedMs(1000 - e.target.value);
  };

  return (
    <div className="app">
      <h1>Algorithm Visualizer</h1>
      <div className="main-container">
        <InputPanel
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
          inputArray={inputArray}
          setInputArray={setInputArray}
        />
        <Canvas
          frame={frames[frameIndex] || {}}
          algorithm={selectedAlgorithm}
          frameIndex={frameIndex}
          totalFrames={frames.length}
        />
        <Controls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onStepForward={handleStepForward}
          onStepBackward={handleStepBackward}
          onReset={handleReset}
          speed={1000 - speedMs}
          onSpeedChange={handleSpeedChange}
          frameIndex={frameIndex}
          totalFrames={frames.length}
        />
      </div>
    </div>
  );
}

export default App;