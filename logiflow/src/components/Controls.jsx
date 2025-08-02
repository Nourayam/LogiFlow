import './Controls.css';

export default function Controls({
  isPlaying,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onReset,
  speed,
  onSpeedChange,
  frameIndex,
  totalFrames,
  onExport,
  onImport,
  isGeneratingFrames
}) {
  return (
    <div className="controls-container">
      <div className="buttons-container">
        <button 
          onClick={onStepBackward} 
          disabled={frameIndex === 0 || isGeneratingFrames}
        >
          ⏪ Step Back
        </button>
        <button 
          onClick={onPlayPause} 
          disabled={totalFrames === 0 || isGeneratingFrames}
        >
          {isPlaying ? '⏸ Pause' : '⏵ Play'}
        </button>
        <button 
          onClick={onStepForward} 
          disabled={frameIndex >= totalFrames - 1 || isGeneratingFrames}
        >
          ⏩ Step Forward
        </button>
        <button 
          onClick={onReset}
          disabled={isGeneratingFrames}
        >
          🔄 Reset
        </button>
        <button 
          onClick={onExport}
          disabled={totalFrames === 0 || isGeneratingFrames}
        >
          💾 Export
        </button>
        <button 
          onClick={onImport}
          disabled={isGeneratingFrames}
        >
          📂 Import
        </button>
      </div>
      <div className="speed-control">
        <label htmlFor="speed">Speed:</label>
        <input
          type="range"
          id="speed"
          min="0"
          max="900"
          step="100"
          value={speed}
          onChange={onSpeedChange}
          disabled={isGeneratingFrames}
        />
        <span>{1000 - speed}ms</span>
      </div>
      <div className="progress-bar">
        <progress 
          value={frameIndex + 1} 
          max={totalFrames || 1} 
        />
      </div>
    </div>
  );
}