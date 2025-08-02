export function generateFrames(array) {
  const frames = [];
  const graph = buildGraphFromArray(array);
  const visited = new Set();
  const queue = [];
  
  // Initial state
  frames.push({
    array: [...array],
    highlight: [],
    visited: [],
    description: "Starting Breadth-First Search"
  });

  // Start from first node (assuming it's index 0)
  if (array.length > 0) {
    queue.push(0);
    visited.add(0);

    frames.push({
      array: [...array],
      highlight: [0],
      visited: [0],
      description: `Visiting node 0 (value: ${array[0]})`
    });

    while (queue.length > 0) {
      const current = queue.shift();
      const neighbors = graph[current] || [];

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);

          frames.push({
            array: [...array],
            highlight: [current, neighbor],
            visited: [...visited],
            description: `Visiting node ${neighbor} (value: ${array[neighbor]}) from node ${current}`
          });
        }
      }
    }
  }

  // Final state
  frames.push({
    array: [...array],
    highlight: [],
    visited: [...visited],
    description: "BFS traversal complete"
  });

  return frames;
}

function buildGraphFromArray(array) {
  // Simple binary tree structure for visualization
  const graph = {};
  for (let i = 0; i < array.length; i++) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    graph[i] = [];
    if (left < array.length) graph[i].push(left);
    if (right < array.length) graph[i].push(right);
  }
  return graph;
}