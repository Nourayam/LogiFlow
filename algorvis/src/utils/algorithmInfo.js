export const ALGORITHM_INFO = {
  'Bubble Sort': {
    description: 'A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      worst: 'O(n²)',
      average: 'O(n²)',
      best: 'O(n)'
    },
    spaceComplexity: 'O(1)'
  },
  'Merge Sort': {
    description: 'A divide-and-conquer algorithm that divides the input array into two halves, sorts them recursively, and then merges the sorted halves.',
    timeComplexity: {
      worst: 'O(n log n)',
      average: 'O(n log n)',
      best: 'O(n log n)'
    },
    spaceComplexity: 'O(n)'
  },
  'Quick Sort': {
    description: 'Another divide-and-conquer algorithm that selects a pivot element and partitions the array around the pivot, placing smaller elements before it and larger elements after it.',
    timeComplexity: {
      worst: 'O(n²)',
      average: 'O(n log n)',
      best: 'O(n log n)'
    },
    spaceComplexity: 'O(log n)'
  },
  'Breadth-First Search': {
    description: 'A graph traversal algorithm that explores all neighbour nodes at the present depth prior to moving on to nodes at the next depth level.',
    timeComplexity: {
      worst: 'O(V + E)',
      average: 'O(V + E)',
      best: 'O(V + E)'
    },
    spaceComplexity: 'O(V)'
  },
  'Depth-First Search': {
    description: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking.',
    timeComplexity: {
      worst: 'O(V + E)',
      average: 'O(V + E)',
      best: 'O(V + E)'
    },
    spaceComplexity: 'O(V)'
  },
  'Binary Tree Operations': {
    description: 'Various operations on binary trees including traversal, insertion, deletion, and searching.',
    timeComplexity: {
      worst: 'O(n)',
      average: 'O(log n)',
      best: 'O(1)'
    },
    spaceComplexity: 'O(n)'
  },

  'Selection Sort': {
  description: 'Finds the minimum element from the unsorted portion and places it at the beginning. Builds the sorted array one element at a time.',
  timeComplexity: {
    worst: 'O(n²)',
    average: 'O(n²)',
    best: 'O(n²)'
  },
  spaceComplexity: 'O(1)'
},
'Insertion Sort': {
  description: 'Builds the sorted array one element at a time by repeatedly taking an element and inserting it into its correct position.',
  timeComplexity: {
    worst: 'O(n²)',
    average: 'O(n²)',
    best: 'O(n)'
  },
  spaceComplexity: 'O(1)'
},
'Heap Sort': {
  description: 'Uses a binary heap data structure to sort elements. First builds a max heap, then repeatedly extracts the maximum element.',
  timeComplexity: {
    worst: 'O(n log n)',
    average: 'O(n log n)',
    best: 'O(n log n)'
  },
  spaceComplexity: 'O(1)'
}
};