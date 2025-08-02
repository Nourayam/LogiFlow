export function generateFrames(array) {
  const frames = [];
  let arr = [...array];
  let n = arr.length;
  
  // Initial state
  frames.push({
    array: [...arr],
    highlight: [],
    swapped: false,
    sortedIndices: [0],
    description: "Starting Insertion Sort - building sorted portion from left"
  });

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    // Highlight the key element
    frames.push({
      array: [...arr],
      highlight: [i],
      swapped: false,
      sortedIndices: Array.from({length: i}, (_, idx) => idx),
      description: `Inserting ${key} into the sorted portion`
    });

    // Shift elements
    while (j >= 0 && arr[j] > key) {
      frames.push({
        array: [...arr],
        highlight: [j, j + 1],
        swapped: false,
        sortedIndices: Array.from({length: i}, (_, idx) => idx),
        description: `Comparing ${arr[j]} with ${key} - shifting right`
      });

      arr[j + 1] = arr[j];
      
      frames.push({
        array: [...arr],
        highlight: [j, j + 1],
        swapped: true,
        sortedIndices: Array.from({length: i}, (_, idx) => idx),
        description: `Shifted ${arr[j + 1]} to position ${j + 1}`
      });
      
      j--;
    }
    
    // Insert key
    arr[j + 1] = key;
    frames.push({
      array: [...arr],
      highlight: [j + 1],
      swapped: true,
      sortedIndices: Array.from({length: i + 1}, (_, idx) => idx),
      description: `Inserted ${key} at position ${j + 1}`
    });
  }

  // Final sorted array
  frames.push({
    array: [...arr],
    highlight: [],
    swapped: false,
    sortedIndices: Array.from({length: n}, (_, idx) => idx),
    description: "Insertion Sort complete! All elements inserted correctly."
  });

  return frames;
}