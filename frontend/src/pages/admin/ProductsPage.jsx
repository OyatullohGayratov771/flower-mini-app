import { useEffect, useState } from "react";
import {
  adminListProducts,
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} from "../../api/products";
import { listCategories } from "../../api/categories";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price_cents: 0,
    currency: "UZS",
    image_url: "",
    category_id: "",
    stock: 0,
    active: true,
  });
  const [loading, setLoading] = useState(true);

  // Load products & categories
  const load = async () => {
    setLoading(true);
    try {
      const [pRes, cRes] = await Promise.all([
        adminListProducts(),
        listCategories(),
      ]);
      setProducts(pRes.data);
      setCategories(cRes.data);
    } catch (err) {
      console.error("Failed to load products or categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Create product
  const createProduct = async () => {
    try {
      await adminCreateProduct(form);
      setForm({
        name: "",
        slug: "",
        description: "",
        price_cents: 0,
        currency: "UZS",
        image_url: "",
        category_id: "",
        stock: 0,
        active: true,
      });
      load();
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  // Toggle active
  const toggleActive = async (id, active) => {
    await adminUpdateProduct(id, { active: !active });
    load();
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!confirm("Rostan ham o‘chirmoqchimisiz?")) return;
    await adminDeleteProduct(id);
    load();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-rose-700">📦 Admin • Products</h1>

      {/* Create product form */}
      <div className="bg-white shadow-lg rounded-2xl p-6 grid lg:grid-cols-2 gap-4 border border-rose-100">
        <input
          className="rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-rose-400 outline-none"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-rose-400 outline-none"
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <textarea
          className="rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-rose-400 outline-none lg:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          className="rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-rose-400 outline-none"
          placeholder="Price (cents)"
          value={form.price_cents}
          onChange={(e) =>
            setForm({ ...form, price_cents: Number(e.target.value) })
          }
        />
        <input
          className="rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-rose-400 outline-none"
          placeholder="Currency"
          value={form.currency}
          onChange={(e) => setForm({ ...form, currency: e.target.value })}
        />
        <div className="lg:col-span-2">
          <label className="block mb-2 text-sm font-medium text-rose-700">Rasm</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              // FormData yaratish
              const formData = new FormData();
              formData.append("photo", file);

              // Backendga yuborish
              const res = await fetch("/api/admin/upload_photo", {
                method: "POST",
                body: formData,
              });

              const data = await res.json();
              if (res.ok) {
                // Telegram file_id backenddan qaytaradi
                setForm({ ...form, image_url: data.file_id });
              } else {
                alert("Rasm yuklashda xatolik: " + data.error);
              }
            }}
            className="w-full rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-rose-400 outline-none"
          />
        </div>

        <select
          className="rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-rose-400 outline-none"
          value={form.category_id || ""}
          onChange={(e) =>
            setForm({ ...form, category_id: Number(e.target.value) })
          }
        >
          {categories.length > 0 ? (
            categories.map((c) => (
              <option key={c.ID} value={c.ID}>
                {c.Name}
              </option>
            ))
          ) : (
            <option disabled>Category not available</option>
          )}
        </select>

        <input
          type="number"
          className="rounded-lg border p-3 shadow-sm focus:ring-2 focus:ring-rose-400 outline-none"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          <span>Active</span>
        </label>
        <button
          onClick={createProduct}
          className="lg:col-span-2 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow hover:from-rose-600 hover:to-pink-600 transition"
        >
          ➕ Create Product
        </button>
      </div>

      {/* Products list */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.ID}
            className="bg-white shadow-md rounded-2xl p-5 flex flex-col gap-3 border hover:shadow-lg transition"
          >
            {p.ImageURL && (
              <img
                src={
                  // p.ImageURL ||
                  "https://t.me/flower_shop_photos/2"
                }
                
                alt={p.Name}
                className="w-full h-40 object-cover rounded-lg border"
                />
            )}
            <div className="flex-1">
              <div className="font-semibold text-lg text-rose-700">
                {p.Name}
              </div>
              <div className="text-sm text-gray-500 line-clamp-2">
                {p.Description}
              </div>
              <div className="mt-2 text-rose-600 font-semibold">
                {(p.PriceCents / 100).toFixed(2)} {p.Currency}
              </div>
              <div className="text-xs text-gray-400">
                stock: {p.stock} • {p.Active ? "✅ active" : "❌ inactive"}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => toggleActive(p.ID, p.Active)}
                className="flex-1 py-2 rounded-lg bg-amber-100 text-amber-700 font-medium hover:bg-amber-200 transition"
              >
                {p.active ? "Deactivate" : "Activate"}
              </button>
              <button
                onClick={() => deleteProduct(p.ID)}
                className="flex-1 py-2 rounded-lg bg-rose-100 text-rose-700 font-medium hover:bg-rose-200 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
