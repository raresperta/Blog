import "../../../styles/music/creations/CreationsGrid.css";
import CreationCard from "./CreationCard";

function CreationsGrid({
  items,
  onSelect,
  showCover = true,
  onRightClick
}) {
  return (
    <div className="songs-grid">
      {items.map((item) => (
        <CreationCard
          key={item.id}
          item={item}
          showCover={showCover}
          onClick={() => onSelect(item)}
          onRightClick={onRightClick}
        />
      ))}
    </div>
  );
}

export default CreationsGrid;