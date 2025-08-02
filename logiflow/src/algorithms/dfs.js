export function generateFrames(array) {
  const frames = [];
  const graph = buildGraphFromArray(array);
  const visited = new Set();
  
  // Initial state
  frames.push({
    array: [...array],
    highlight: [],
    visited: [],
    description: "Starting Depth-First Search"
  });

  // Start from first node (assuming it's index 0)
  if (array.length > 0) {
    dfsVisit(0, graph, visited, frames, array);
  }

  // Final state
  frames.push({
    array: [...array],
    highlight: [],
    visited: [...visited],
    description: "DFS traversal complete"
  });

  return frames;
}

function dfsVisit(node, graph, visited, frames, array) {
  visited.add(node);
  
  frames.push({
    array: [...array],
    highlight: [node],
    visited: [...visited],
    description: `Visiting node ${node} (value: ${array[node]})`
  });

  const neighbors = graph[node] || [];
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      frames.push({
        array: [...array],
        highlight: [node, neighbor],
        visited: [...visited],
        description: `Exploring edge from ${node} to ${neighbor}`
      });
      
      dfsVisit(neighbor, graph, visited, frames, array);
    }
  }
}

function buildGraphFromArray(array) {
  // Same as BFS - simple binary tree structure
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