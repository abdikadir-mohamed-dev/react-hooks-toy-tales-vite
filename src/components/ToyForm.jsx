import React, { useState } from "react";

function ToyForm({ toys, setToys }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = { name, image, likes: 0 };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create toy");
        return res.json();
      })
      .then((createdToy) => {
        setToys([...toys, createdToy]);
        setName("");    // clear form after submit
        setImage("");
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>  {/* 👈 added */}
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={name}                          // 👈 added
          onChange={(e) => setName(e.target.value)}  // 👈 added
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={image}                          // 👈 added
          onChange={(e) => setImage(e.target.value)}  // 👈 added
        />
        <br />
        <input
          type="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;