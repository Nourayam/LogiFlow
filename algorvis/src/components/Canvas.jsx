import Node from './Node';
import './Canvas.css';

export default function Canvas({ frame, algorithm, frameIndex, totalFrames, algorithmInfo, error }) {
  const { 
    array = [], 
    highlight = [], 
    swapped = false, 
    sortedIndices = [], 
    visited = [],
    description = '',
    metadata = {} 
  } = frame;

  const isGraphAlgorithm = algorithm.includes('Search') || algorithm.includes('Tree');
  
  return (
    <div className="canvas-container">
      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div className="algorithm-description">
        {description || `Visualising ${algorithm}`}
        {metadata.pivot && <div>Pivot: {metadata.pivot}</div>}
      </div>
      
      <div className="frame-info">
        Step {frameIndex + 1} of {totalFrames || 1}
      </div>
      
      <div className={`nodes-container ${isGraphAlgorithm ? 'graph-layout' : ''}`}>
        {array.map((value, index) => {
          const isHighlighted = highlight.includes(index);
          const isSorted = sortedIndices.includes(index);
          const isVisited = visited.includes(index);
          
          return (
            <Node
              key={index}
              value={value}
              index={index}
              isHighlighted={isHighlighted}
              isSwapped={swapped && isHighlighted}
              isSorted={isSorted}
              isVisited={isVisited}
              algorithmType={algorithm}
            />
          );
        })}
      </div>
    </div>
  );
}