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
    description: "Starting Selection Sort - finding minimum elements"
  });

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Highlight current position
    frames.push({
      array: [...arr],
      highlight: [i],
      swapped: false,
      sortedIndices: Array.from({length: i}, (_, idx) => idx),
      description: `Finding minimum element from position ${i} onwards`
    });

    // Find minimum element
    for (let j = i + 1; j < n; j++) {
      frames.push({
        array: [...arr],
        highlight: [minIndex, j],
        swapped: false,
        sortedIndices: Array.from({length: i}, (_, idx) => idx),
        description: `Comparing ${arr[minIndex]} with ${arr[j]}`
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        frames.push({
          array: [...arr],
          highlight: [minIndex],
          swapped: false,
          sortedIndices: Array.from({length: i}, (_, idx) => idx),
          description: `New minimum found: ${arr[minIndex]} at position ${minIndex}`
        });
      }
    }

    // Swap if needed
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      frames.push({
        array: [...arr],
        highlight: [i, minIndex],
        swapped: true,
        sortedIndices: Array.from({length: i}, (_, idx) => idx),
        description: `Swapping ${arr[minIndex]} with ${arr[i]}`
      });
    }

    // Mark as sorted
    frames.push({
      array: [...arr],
      highlight: [],
      swapped: false,
      sortedIndices: Array.from({length: i + 1}, (_, idx) => idx),
      description: `Element ${arr[i]} is now in its correct position`
    });
  }

  // Final sorted array
  frames.push({
    array: [...arr],
    highlight: [],
    swapped: false,
    sortedIndices: Array.from({length: n}, (_, idx) => idx),
    description: "Selection Sort complete! Array is fully sorted."
  });

  return frames;
}