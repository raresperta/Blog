import "../styles/categoryCard.css";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  return (
    <div className="card" onClick = {() => navigate(`/${category.name.toLowerCase()}`)}>
      <div className="cardGlow" />

      <div className="icon">
        {category.icon}
      </div>

      <h3>{category.name}</h3>

      <p>{category.description}</p>

      <span>{category.count} articole</span>
    </div>
  );
}