export function generateFrames(array) {
  const frames = [];
  let arr = [...array];
  let n = arr.length;
  
  // Initial state
  frames.push({
    array: [...arr],
    highlight: [],
    swapped: false,
    sortedIndices: [],
    description: "Starting Bubble Sort"
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight the current elements being compared
      frames.push({
        array: [...arr],
        highlight: [j, j + 1],
        swapped: false,
        sortedIndices: Array.from({length: i}, (_, idx) => n - 1 - idx),
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`
      });

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        
        // Show swap
        frames.push({
          array: [...arr],
          highlight: [j, j + 1],
          swapped: true,
          sortedIndices: Array.from({length: i}, (_, idx) => n - 1 - idx),
          description: `Swapping ${arr[j + 1]} and ${arr[j]}`
        });
      }
    }
    
    // Mark the last element as sorted
    frames.push({
      array: [...arr],
      highlight: [],
      swapped: false,
      sortedIndices: Array.from({length: i + 1}, (_, idx) => n - 1 - idx),
      description: `Element ${arr[n - 1 - i]} is now in its final position`
    });
  }

  // Final sorted array
  frames.push({
    array: [...arr],
    highlight: [],
    swapped: false,
    sortedIndices: Array.from({length: n}, (_, idx) => idx),
    description: "Array is completely sorted!"
  });

  return frames;
}