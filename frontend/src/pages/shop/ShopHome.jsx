import { useEffect, useState, useMemo } from "react";
import { listCategories } from "../../api/categories";
import { fetchProducts } from "../../api/products";
import ProductCard from "../../components/product/ProductCard";

export default function ShopHome() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [catRes, prodRes] = await Promise.all([
          listCategories(),
          fetchProducts(),
        ]);
        setCategories(Array.isArray(catRes?.data) ? catRes.data : []);
        setProducts(Array.isArray(prodRes?.data) ? prodRes.data : []);
      } catch (err) {
        console.error("❌ Kategoriya yoki mahsulotlarni olishda xatolik:", err);
        setCategories([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filtered = useMemo(() => {
    return activeCategory === "all"
      ? products
      : products.filter((p) => p.CategoryID === activeCategory);
  }, [activeCategory, products]);

  return (
    <div className="px-6 md:px-16 py-12 bg-gradient-to-br from-pink-50 via-white to-rose-50 min-h-screen">
      {/* Sarlavha */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-rose-700 to-pink-500 bg-clip-text text-transparent">
          Nafis gullar dunyosiga xush kelibsiz
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Har bir tadbir uchun tanlab olingan, yangi va nafis gullar
        </p>
        <div className="w-24 h-1 bg-rose-300 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Kategoriya filteri */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => setActiveCategory("all")}
          aria-pressed={activeCategory === "all"}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
            activeCategory === "all"
              ? "bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-lg"
              : "bg-white border border-rose-200 text-rose-700 hover:bg-rose-50"
          }`}
        >
          🌸 Barchasi
        </button>
        {categories.map((cat) => (
          <button
            key={cat.ID}
            onClick={() => setActiveCategory(cat.ID)}
            aria-pressed={activeCategory === cat.ID}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
              activeCategory === cat.ID
                ? "bg-gradient-to-r from-rose-600 to-pink-500 text-white shadow-lg"
                : "bg-white border border-rose-200 text-rose-700 hover:bg-rose-50"
            }`}
          >
            {cat.Name}
          </button>
        ))}
      </div>

      {/* Mahsulotlar gridi */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-white rounded-2xl shadow-sm h-72"
            />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.ID} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          🚫 Ushbu kategoriyada hozircha mahsulot mavjud emas
        </p>
      )}
    </div>
  );
}
