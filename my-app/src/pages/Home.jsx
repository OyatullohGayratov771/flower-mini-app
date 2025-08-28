import { useEffect, useState } from "react";
import { getProducts } from "../api/products";  // ✅ shu joyni qo‘sh
import { useCart } from "../context/CartContext";

import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleAdd = (product) => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🌸 Bizning Gullar
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.ID} product={p} onAdd={handleAdd} />
        ))}
      </div>
    </div>
  );
}
