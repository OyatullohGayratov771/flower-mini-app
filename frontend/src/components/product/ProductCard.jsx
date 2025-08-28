// src/components/product/ProductCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { add } = useCart();

  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Image & Price */}
      <Link to={`/products/${product.Slug}`} className="block relative">
        <img
          src={
            // product.ImageURL || 
            "/flower_2.jpg"}
          alt={product.Name}
          className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-600 to-pink-500 text-white px-3 py-1 rounded-full text-sm shadow-md">
          {(product.PriceCents / 100).toFixed(2)} {product.Currency || "UZS"}
        </span>
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col h-48">
        <h3 className="font-serif text-xl font-semibold text-rose-900 line-clamp-1">
          {product.Name}
        </h3>
        <p className="mt-2 text-gray-600 text-sm line-clamp-2 flex-grow">
          {product.Description}
        </p>
        <button
          onClick={() => add(product)}
          className="mt-4 w-full bg-rose-600 text-white py-2 rounded-xl shadow hover:bg-rose-700 active:scale-95 transition-all"
        >
          🛒 Savatga qo'shish
        </button>
      </div>
    </div>
  );
}
