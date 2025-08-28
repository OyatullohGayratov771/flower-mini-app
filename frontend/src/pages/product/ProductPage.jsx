// src/pages/shop/ProductPageSlug.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductBySlug } from "../../api/products";
import { useCart } from "../../context/CartContext";

export default function ProductPageSlug() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { add } = useCart();

  useEffect(() => {
    fetchProductBySlug(slug).then((res) => {
      setProduct(res.data);
    });
  }, [slug]);

  if (!product) return <p className="text-center py-20 text-gray-500">Loading...</p>;

  const normalizedProduct = {
    ID: product.ID,
    Name: product.Name,
    Description: product.Description,
    PriceCents: product.PriceCents ?? 0,
    Currency: product.Currency || "UZS",
    ImageURL:
    //  product.ImageURL || 
    "/flower_2.jpg"
  };

  return (
    <div className="px-6 md:px-16 py-12 bg-gradient-to-br from-white via-pink-50 to-rose-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Image */}
        <div className="relative">
          <img
            src={normalizedProduct.ImageURL}
            alt={normalizedProduct.Name}
            className="rounded-3xl shadow-xl w-full object-cover transition-transform hover:scale-[1.02] duration-500"
          />
        </div>

        {/* Details */}
        <div className="space-y-6">
          <h1 className="text-5xl font-serif font-bold text-rose-900">
            {normalizedProduct.Name}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {normalizedProduct.Description}
          </p>
          <p className="text-4xl font-bold text-rose-700">
            {(normalizedProduct.PriceCents / 100).toFixed(2)} {normalizedProduct.Currency}
          </p>

          <button
            onClick={() => add(normalizedProduct)}
            className="px-10 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white text-lg rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            🛒 Savatga qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}
