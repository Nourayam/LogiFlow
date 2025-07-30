import { useState } from 'react';
import './InputPanel.css';

export default function InputPanel({
  selectedAlgorithm,
  setSelectedAlgorithm,
  inputArray,
  setInputArray,
  algorithmInfo,
  isGeneratingFrames
}) {
  const [inputValue, setInputValue] = useState(inputArray.join(', '));

  const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newArray = inputValue
        .split(',')
        .map(item => {
          const num = parseInt(item.trim(), 10);
          if (isNaN(num)) throw new Error(`Invalid number: ${item}`);
          return num;
        });
      
      if (newArray.length === 0) {
        throw new Error('Please enter at least one number');
      }

      if (selectedAlgorithm.includes('Tree') && newArray.length > 15) {
        throw new Error('Tree algorithms work best with ≤15 elements');
      }

      setInputArray(newArray);
    } catch (error) {
      alert(`Input error: ${error.message}`);
      setInputValue(inputArray.join(', '));
    }
  };

  const handleRandomize = () => {
    const randomArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 50) + 1);
    setInputArray(randomArray);
    setInputValue(randomArray.join(', '));
  };

  return (
    <div className="input-panel">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="algorithm">Algorithm:</label>
          <select
            id="algorithm"
            value={selectedAlgorithm}
            onChange={handleAlgorithmChange}
            disabled={isGeneratingFrames}
          >
            <option value="Breadth-First Search">Breadth First Search</option>
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Depth-First Search">Depth First Search</option>
            <option value="Heap Sort">Heap Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
            <option value="Merge Sort">Merge Sort</option>
            <option value="Quick Sort">Quick Sort</option>
            <option value="Selection Sort">Selection Sort</option>
            <option value="Binary Tree Operations">Tree Operations</option>
</select>
        </div>
        
        {algorithmInfo && (
          <div className="algorithm-info">
            <p>{algorithmInfo.description}</p>
            <div className="complexity-info">
              <span>Time Complexity: </span>
              <ul>
                <li>Worst: {algorithmInfo.timeComplexity.worst}</li>
                <li>Average: {algorithmInfo.timeComplexity.average}</li>
                <li>Best: {algorithmInfo.timeComplexity.best}</li>
              </ul>
              <span>Space Complexity: {algorithmInfo.spaceComplexity}</span>
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="array-input">Input Array:</label>
          <input
            id="array-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="e.g. 5, 3, 8, 4, 2"
            disabled={isGeneratingFrames}
          />
        </div>
        <div className="button-group">
          <button type="submit" disabled={isGeneratingFrames}>
            {isGeneratingFrames ? 'Generating...' : 'Visualise'}
          </button>
          <button 
            type="button" 
            onClick={handleRandomize}
            disabled={isGeneratingFrames}
          >
            Randomise
          </button>
        </div>
      </form>
    </div>
  );
}