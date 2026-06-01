import "../styles/postCard.css";

export default function PostCard({ post }) {
  return (
    <div className="post">
      <div className="postMood" />

      <span className="postCategory">
        {post.category}
      </span>

      <h4>{post.title}</h4>

      <p>
        little thoughts, saved ideas and inspirations...
      </p>
    </div>
  );
}