import { useState, useEffect, useCallback } from 'react';
import * as bubbleSort from './algorithms/bubbleSort';
import * as mergeSort from './algorithms/mergeSort';
import * as quickSort from './algorithms/quickSort';
import * as bfs from './algorithms/bfs';
import * as dfs from './algorithms/dfs';
import * as treeOps from './algorithms/treeOps';
import * as insertionSort from './algorithms/insertionSort';
import * as heapSort from './algorithms/heapSort';
import * as selectionSort from './algorithms/selectionSort';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import InputPanel from './components/InputPanel';
import { ALGORITHM_INFO } from './utils/algorithmInfo';
import { validateFrames } from './utils/validateFrames';
import Loader from './components/Loader';
import './index.css';

const ALGORITHMS = {
  'Bubble Sort': bubbleSort,
  'Merge Sort': mergeSort,
  'Quick Sort': quickSort,
  'Breadth-First Search': bfs,
  'Depth-First Search': dfs,
  'Binary Tree Operations': treeOps,
  'Insertion Sort': insertionSort,
  'Heap Sort': heapSort,
  'Selection Sort': selectionSort

};

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble Sort');
  const [inputArray, setInputArray] = useState([5, 3, 8, 4, 2]);
  const [frames, setFrames] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(500);
  const [isGeneratingFrames, setIsGeneratingFrames] = useState(false);
  const [exportData, setExportData] = useState(null);
  const [error, setError] = useState(null);

  // Generate frames with enhanced error handling
  useEffect(() => {
    const generateFrames = async () => {
      try {
        setIsGeneratingFrames(true);
        setError(null);
        const algorithm = ALGORITHMS[selectedAlgorithm];
        
        if (!algorithm?.generateFrames) {
          throw new Error('Selected algorithm not implemented');
        }

        const newFrames = algorithm.generateFrames(inputArray);
        if (!newFrames || newFrames.length === 0) {
          throw new Error('Algorithm returned no frames');
        }

        // Validate frames before setting them
        const validatedFrames = validateFrames(newFrames, selectedAlgorithm);
        setFrames(validatedFrames);
        setFrameIndex(0);
        setIsPlaying(false);
      } catch (error) {
        console.error('Frame generation error:', error);
        setError(error.message);
        setFrames([{
          array: inputArray,
          highlight: [],
          swapped: false,
          sortedIndices: [],
          description: `Error: ${error.message}`
        }]);
      } finally {
        setIsGeneratingFrames(false);
      }
    };

    generateFrames();
  }, [selectedAlgorithm, inputArray]);

  // Animation handling
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleStepForward();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleStepBackward();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, frameIndex, frames]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleStepForward = useCallback(() => {
    if (frameIndex < frames.length - 1) {
      setFrameIndex(frameIndex + 1);
    }
  }, [frameIndex, frames]);

  const handleStepBackward = useCallback(() => {
    if (frameIndex > 0) {
      setFrameIndex(frameIndex - 1);
    }
  }, [frameIndex]);

  const handleReset = useCallback(() => {
    setFrameIndex(0);
    setIsPlaying(false);
  }, []);

  const handleSpeedChange = useCallback((e) => {
    setSpeedMs(1000 - e.target.value);
  }, []);

  const handleExport = useCallback(() => {
    try {
      const data = {
        algorithm: selectedAlgorithm,
        inputArray,
        frames,
        currentFrame: frameIndex,
        speed: speedMs,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      const json = JSON.stringify(data);
      setExportData(json);
      navigator.clipboard.writeText(json).then(() => {
        alert('Visualisation state copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy to clipboard. Please try again.');
      });
    } catch (error) {
      alert('Export failed: ' + error.message);
    }
  }, [selectedAlgorithm, inputArray, frames, frameIndex, speedMs]);

  const handleImport = useCallback(() => {
    try {
      const json = prompt('Paste the exported visualisation state:');
      if (!json) return;
      
      const data = JSON.parse(json);
      if (!data.algorithm || !data.inputArray || !data.frames) {
        throw new Error('Invalid visualisation state format');
      }

      setSelectedAlgorithm(data.algorithm);
      setInputArray(data.inputArray);
      setFrames(data.frames);
      setFrameIndex(data.currentFrame || 0);
      setSpeedMs(data.speed || 500);
    } catch (error) {
      alert('Failed to import visualisation state: ' + error.message);
    }
  }, []);

  return (
    <div className="app">
      <h1>AlgorVis - Your Algorithm Visualiser</h1>
      <div className="main-container">
        <InputPanel
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
          inputArray={inputArray}
          setInputArray={setInputArray}
          algorithmInfo={ALGORITHM_INFO[selectedAlgorithm]}
          isGeneratingFrames={isGeneratingFrames}
        />
        
        {isGeneratingFrames ? (
          <div className="loading-overlay">
            <Loader />
            <p>Generating visualisation frames...</p>
          </div>
        ) : (
          <Canvas
            frame={frames[frameIndex] || {}}
            algorithm={selectedAlgorithm}
            frameIndex={frameIndex}
            totalFrames={frames.length}
            algorithmInfo={ALGORITHM_INFO[selectedAlgorithm]}
            error={error}
          />
        )}
        
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
          onExport={handleExport}
          onImport={handleImport}
          isGeneratingFrames={isGeneratingFrames}
        />
      </div>
    </div>
  );
}

export default App;