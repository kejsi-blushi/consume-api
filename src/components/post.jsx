export default function Post({ title, body, id, deletePost }) {
  return (
    <div className="post-card">
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
      <button className="btn-delete" onClick={() => deletePost(id)}>
        Delete
      </button>
    </div>
  );
}
