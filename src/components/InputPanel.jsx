import { useState } from 'react';
import './InputPanel.css';


export default function InputPanel({
  selectedAlgorithm,
  setSelectedAlgorithm,
  inputArray,
  setInputArray
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
    // Reset to last valid input
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
          >
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Merge Sort">Merge Sort</option>
            <option value="Quick Sort">Quick Sort</option>
            <option value="Breadth-First Search">BFS</option>
            <option value="Depth-First Search">DFS</option>
            <option value="Binary Tree Operations">Tree Operations</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="array-input">Input Array:</label>
          <input
            id="array-input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="e.g. 5, 3, 8, 4, 2"
          />
        </div>
        <div className="button-group">
          <button type="submit">Visualize</button>
          <button type="button" onClick={handleRandomize}>
            Randomize
          </button>
        </div>
      </form>
    </div>
  );
}