export function generateFrames(array) {
  const frames = [];
  const tree = buildTreeFromArray(array);
  
  // Initial state
  frames.push({
    array: [...array],
    highlight: [],
    description: "Binary Tree constructed from array",
    metadata: { tree: JSON.parse(JSON.stringify(tree)) }
  });

  // In-order traversal
  const inOrder = [];
  inOrderTraversal(tree, inOrder, frames, array);
  
  // Pre-order traversal
  const preOrder = [];
  preOrderTraversal(tree, preOrder, frames, array);
  
  // Post-order traversal
  const postOrder = [];
  postOrderTraversal(tree, postOrder, frames, array);

  return frames;
}

function buildTreeFromArray(array, index = 0) {
  if (index >= array.length) return null;
  
  return {
    value: array[index],
    left: buildTreeFromArray(array, 2 * index + 1),
    right: buildTreeFromArray(array, 2 * index + 2),
    index
  };
}

function inOrderTraversal(node, traversal, frames, array) {
  if (!node) return;
  
  inOrderTraversal(node.left, traversal, frames, array);
  
  traversal.push(node.index);
  frames.push({
    array: [...array],
    highlight: [node.index],
    description: `In-order traversal: Visiting node ${node.index} (value: ${node.value})`,
    metadata: { traversal: [...traversal], type: 'in-order' }
  });
  
  inOrderTraversal(node.right, traversal, frames, array);
}

function preOrderTraversal(node, traversal, frames, array) {
  if (!node) return;
  
  traversal.push(node.index);
  frames.push({
    array: [...array],
    highlight: [node.index],
    description: `Pre-order traversal: Visiting node ${node.index} (value: ${node.value})`,
    metadata: { traversal: [...traversal], type: 'pre-order' }
  });
  
  preOrderTraversal(node.left, traversal, frames, array);
  preOrderTraversal(node.right, traversal, frames, array);
}

function postOrderTraversal(node, traversal, frames, array) {
  if (!node) return;
  
  postOrderTraversal(node.left, traversal, frames, array);
  postOrderTraversal(node.right, traversal, frames, array);
  
  traversal.push(node.index);
  frames.push({
    array: [...array],
    highlight: [node.index],
    description: `Post-order traversal: Visiting node ${node.index} (value: ${node.value})`,
    metadata: { traversal: [...traversal], type: 'post-order' }
  });
}