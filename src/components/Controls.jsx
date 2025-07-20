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
  totalFrames
}) {
  return (
    <div className="controls-container">
      <div className="buttons-container">
        <button onClick={onStepBackward} disabled={frameIndex === 0}>
          ⏪ Step Back
        </button>
        <button onClick={onPlayPause}>
          {isPlaying ? '⏸ Pause' : '⏵ Play'}
        </button>
        <button onClick={onStepForward} disabled={frameIndex >= totalFrames - 1}>
          ⏩ Step Forward
        </button>
        <button onClick={onReset}>🔄 Reset</button>
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
        />
        <span>{1000 - speed}ms</span>
      </div>
      <div className="progress-bar">
        <progress value={frameIndex + 1} max={totalFrames || 1} />
      </div>
    </div>
  );
}