interface ChapterSelectorProps {
  currentPosition: number;
  totalSegments: number;
  showAll: boolean;
  onPositionChange: (position: number) => void;
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({
  currentPosition,
  totalSegments,
  showAll,
  onPositionChange,
}) => {
  return (
    <div className="chapter-selector">
      <input
        type="range"
        min="0"
        max={totalSegments - 1}
        value={currentPosition}
        onChange={(e) => onPositionChange(parseInt(e.target.value))}
        className="chapter-progress"
        disabled={showAll}
      />
    </div>
  );
}; 