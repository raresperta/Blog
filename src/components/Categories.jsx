import CategoryCard from "./CategoryCard";
import "../styles/categories.css";

export default function Categories({ categories }) {
  return (
    <section className="categories">
      <div className="categories-grid">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat}/>
        ))}
      </div>
    </section>
  );
}