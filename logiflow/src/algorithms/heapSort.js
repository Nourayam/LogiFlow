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
    description: "Starting Heap Sort - building max heap"
  });

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, frames);
  }

  frames.push({
    array: [...arr],
    highlight: [],
    swapped: false,
    sortedIndices: [],
    description: "Max heap built! Largest element is at root."
  });

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    frames.push({
      array: [...arr],
      highlight: [0, i],
      swapped: true,
      sortedIndices: Array.from({length: n - i}, (_, idx) => n - 1 - idx),
      description: `Moving largest element ${arr[i]} to sorted position`
    });

    // Call heapify on the reduced heap
    heapify(arr, i, 0, frames);
  }

  // Final sorted array
  frames.push({
    array: [...arr],
    highlight: [],
    swapped: false,
    sortedIndices: Array.from({length: n}, (_, idx) => idx),
    description: "Heap Sort complete! Array is fully sorted."
  });

  return frames;
}

function heapify(arr, n, i, frames) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // Highlight nodes being compared
  const nodesToHighlight = [i];
  if (left < n) nodesToHighlight.push(left);
  if (right < n) nodesToHighlight.push(right);

  frames.push({
    array: [...arr],
    highlight: nodesToHighlight,
    swapped: false,
    sortedIndices: [],
    description: `Heapifying at node ${i} (value: ${arr[i]})`
  });

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    frames.push({
      array: [...arr],
      highlight: [i, largest],
      swapped: true,
      sortedIndices: [],
      description: `Swapping ${arr[largest]} with ${arr[i]} to maintain heap property`
    });

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, frames);
  }
}