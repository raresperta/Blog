import PostCard from "./PostCard";
import "../styles/posts.css";

export default function Posts({ posts }) {
  return (
    <section className="content">

      <div className="sectionHeader">
        <span>your space</span>

        <h2>Recent deschise</h2>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

    </section>
  );
}