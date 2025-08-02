export function validateFrames(frames, algorithm) {
  if (!Array.isArray(frames)) {
    throw new Error('Frames must be an array');
  }

  const requiredFields = {
    'Bubble Sort': ['array', 'highlight', 'swapped', 'sortedIndices'],
    'Merge Sort': ['array', 'highlight', 'swapped', 'sortedIndices'],
    'Quick Sort': ['array', 'highlight', 'swapped', 'metadata'],
    'Breadth-First Search': ['array', 'visited', 'highlight'],
    'Depth-First Search': ['array', 'visited', 'highlight'],
    'Binary Tree Operations': ['array', 'highlight', 'metadata']
  };

  const fields = requiredFields[algorithm] || ['array'];

  frames.forEach((frame, index) => {
    fields.forEach(field => {
      if (!(field in frame)) {
        console.warn(`Frame ${index} missing field: ${field}`);
      }
    });
  });

  return frames;
}