// ProductCard.jsx
export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      {/* Rasm qismi */}
      <div className="relative w-full h-48">
        <img
          src={product.ImageUrl}
          alt={product.Name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info qismi */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.Name}
        </h3>
        <p className="text-gray-500 line-clamp-2">{product.Description}</p>
        <p className="text-xl font-bold text-pink-600">
          {(product.PriceCents / 100).toLocaleString()} {product.Currency}
        </p>

        <button
          onClick={() => onAdd(product)}
          className="mt-2 bg-gradient-to-r from-pink-500 to-red-400 text-white py-2 rounded-xl hover:scale-105 transition-transform duration-200"
        >
          🛒 Savatchaga qo‘shish
        </button>
      </div>
    </div>
  );
}
