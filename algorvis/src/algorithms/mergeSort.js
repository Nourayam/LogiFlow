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
    description: "Starting Merge Sort (Divide and Conquer)"
  });

  function mergeSort(mainArray, startIdx = 0, auxiliaryArray = [...mainArray]) {
    if (mainArray.length <= 1) return;

    const middle = Math.floor(mainArray.length / 2);
    const left = mainArray.slice(0, middle);
    const right = mainArray.slice(middle);

    // Visualize the split
    frames.push({
      array: [...auxiliaryArray],
      highlight: Array.from({ length: right.length }, (_, i) => startIdx + middle + i),
      swapped: false,
      sortedIndices: [],
      description: `Splitting array at index ${startIdx + middle}`
    });

    mergeSort(left, startIdx, auxiliaryArray);
    mergeSort(right, startIdx + middle, auxiliaryArray);
    merge(left, right, mainArray, startIdx, auxiliaryArray);
  }

  function merge(left, right, mainArray, startIdx, auxiliaryArray) {
    let i = 0, j = 0, k = 0;
    const mergeIndices = [];

    // Visualize the two halves being merged
    frames.push({
      array: [...auxiliaryArray],
      highlight: [
        ...left.map((_, idx) => startIdx + idx),
        ...right.map((_, idx) => startIdx + left.length + idx)
      ],
      swapped: false,
      sortedIndices: [],
      description: `Merging two sorted halves starting at index ${startIdx}`
    });

    while (i < left.length && j < right.length) {
      const currentLeft = startIdx + i;
      const currentRight = startIdx + left.length + j;

      // Highlight comparison
      frames.push({
        array: [...auxiliaryArray],
        highlight: [currentLeft, currentRight],
        swapped: false,
        sortedIndices: [],
        description: `Comparing ${left[i]} and ${right[j]}`
      });

      if (left[i] <= right[j]) {
        auxiliaryArray[startIdx + k] = left[i];
        mergeIndices.push(startIdx + k);
        i++;
      } else {
        auxiliaryArray[startIdx + k] = right[j];
        mergeIndices.push(startIdx + k);
        j++;
      }

      // Show element being placed
      frames.push({
        array: [...auxiliaryArray],
        highlight: [startIdx + k],
        swapped: true,
        sortedIndices: [...mergeIndices],
        description: `Placing ${auxiliaryArray[startIdx + k]} at position ${startIdx + k}`
      });

      k++;
    }

    while (i < left.length) {
      auxiliaryArray[startIdx + k] = left[i];
      mergeIndices.push(startIdx + k);
      
      frames.push({
        array: [...auxiliaryArray],
        highlight: [startIdx + k],
        swapped: true,
        sortedIndices: [...mergeIndices],
        description: `Placing remaining element ${left[i]} at position ${startIdx + k}`
      });

      i++;
      k++;
    }

    while (j < right.length) {
      auxiliaryArray[startIdx + k] = right[j];
      mergeIndices.push(startIdx + k);
      
      frames.push({
        array: [...auxiliaryArray],
        highlight: [startIdx + k],
        swapped: true,
        sortedIndices: [...mergeIndices],
        description: `Placing remaining element ${right[j]} at position ${startIdx + k}`
      });

      j++;
      k++;
    }

    // Copy back to main array for next recursion level
    for (let idx = 0; idx < mainArray.length; idx++) {
      mainArray[idx] = auxiliaryArray[startIdx + idx];
    }
  }

  mergeSort(arr);

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