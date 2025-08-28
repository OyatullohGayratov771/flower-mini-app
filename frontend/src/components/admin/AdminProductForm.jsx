import React, { useState } from "react";
import client from "../../api/client";

function AdminProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post("/admin/products", {
        name,
        price: Number(price),
        image_url: image,
      });
      alert("Mahsulot qo‘shildi ✅");
      setName("");
      setPrice("");
      setImage("");
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Mahsulot qo‘shish</h2>
      <input
        type="text"
        placeholder="Nomi"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      /><br />
      <input
        type="number"
        placeholder="Narxi"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      /><br />
      <input
        type="text"
        placeholder="Rasm URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      /><br />
      <button type="submit">Saqlash</button>
    </form>
  );
}

export default AdminProductForm;
