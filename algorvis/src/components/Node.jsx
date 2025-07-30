import { useEffect, useState } from 'react';
import './Node.css';

export default function Node({ 
  value, 
  index, 
  isHighlighted, 
  isSwapped, 
  isSorted,
  isVisited,
  algorithmType 
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isHighlighted || isSwapped || isVisited) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isHighlighted, isSwapped, isVisited]);

  const getNodeClass = () => {
    if (algorithmType.includes('Search')) {
      return isVisited ? 'visited' : '';
    }
    return isSorted ? 'sorted' : '';
  };

  const nodeClasses = [
    'node',
    getNodeClass(),
    isHighlighted ? 'highlighted' : '',
    isSwapped ? 'swapped' : '',
    isAnimating ? 'pulse' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={nodeClasses}>
      <div className="node-value">{value}</div>
      {!algorithmType.includes('Tree') && (
        <div className="node-index">{index}</div>
      )}
    </div>
  );
}