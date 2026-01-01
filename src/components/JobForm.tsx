import { useState } from "react";

export default function JobForm({
  onSubmit,
  loading,
}: {
  onSubmit: (title: string, author: string, description: string) => void;
  loading: boolean;
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      <button
        onClick={() => onSubmit(title, author, description)}
        disabled={loading}
      >
        Create
      </button>
    </div>
  );
}
