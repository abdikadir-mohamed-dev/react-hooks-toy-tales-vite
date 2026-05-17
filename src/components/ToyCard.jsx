import React from "react";

function ToyCard({ toy, toys = [], setToys }) {
  const { id, name, image, likes } = toy;

  function handleDelete() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        setToys(toys.filter((t) => t.id !== id)); // 👈 t not toy
      })
      .catch((err) => console.error(err));
  }

  function handleLike() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Like failed");
        return res.json();
      })
      .then((updatedToy) => {
        setToys(toys.map((t) => (t.id === id ? updatedToy : t))); // 👈 t not toy
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes</p>
      <button onClick={handleLike}>Like ❤️</button>
      <button onClick={handleDelete}>Donate 🗑️</button>
    </div>
  );
}

export default ToyCard;