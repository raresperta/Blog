import { categories, posts } from "../data/mockData";
import Categories from "../components/Categories";
import Posts from "../components/Posts";
import "../styles/hero.css";

export default function Home() {
  return (
    <main className="home">
      <div className="hero" />

      <Categories categories={categories} />
      <Posts posts={posts} />
    </main>
  );
}