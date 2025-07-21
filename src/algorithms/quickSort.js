export function generateFrames(array) {
  const frames = [];
  const arr = [...array];
  const n = arr.length;

  // Initial state
  frames.push({
    array: [...arr],
    highlight: [],
    swapped: false,
    sortedIndices: [],
    description: "Starting Quick Sort (Divide and Conquer)"
  });

  function quickSort(start, end) {
    if (start >= end) return;

    const pivotIndex = partition(start, end);
    quickSort(start, pivotIndex - 1);
    quickSort(pivotIndex + 1, end);
  }

  function partition(start, end) {
    const pivotValue = arr[end];
    let pivotIndex = start;

    // Highlight pivot selection
    frames.push({
      array: [...arr],
      highlight: [end],
      swapped: false,
      sortedIndices: [],
      description: `Selecting pivot: ${pivotValue} at index ${end}`,
      metadata: { pivot: pivotValue }
    });

    for (let i = start; i < end; i++) {
      // Highlight comparison
      frames.push({
        array: [...arr],
        highlight: [i, end],
        swapped: false,
        sortedIndices: [],
        description: `Comparing ${arr[i]} with pivot ${pivotValue}`
      });

      if (arr[i] < pivotValue) {
        // Swap elements
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        
        // Show swap
        frames.push({
          array: [...arr],
          highlight: [i, pivotIndex],
          swapped: true,
          sortedIndices: [],
          description: `Moving ${arr[pivotIndex]} to position ${pivotIndex}`
        });

        pivotIndex++;
      }
    }

    // Final swap with pivot
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    frames.push({
      array: [...arr],
      highlight: [pivotIndex, end],
      swapped: true,
      sortedIndices: [pivotIndex],
      description: `Placing pivot ${pivotValue} in final position ${pivotIndex}`,
      metadata: { pivot: pivotValue }
    });

    return pivotIndex;
  }

  quickSort(0, n - 1);

  // Final sorted array
  frames.push({
    array: [...arr],
    highlight: [],
    swapped: false,
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    description: "Array is completely sorted!"
  });

  return frames;
}