import { useEffect, useState } from "react";
import { listCategories, adminCreateCategory, adminDeleteCategory } from "../../api/categories";

export default function CategoriesPage() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);

  // Load categories
  const load = async () => {
    setLoading(true);
    try {
      const r = await listCategories();
      setList(r.data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Create category
  const create = async () => {
    if (!name.trim()) return alert("Name bo‘sh bo‘lmasligi kerak!");
    try {
      await adminCreateCategory({ name, slug });
      setName("");
      setSlug("");
      load();
    } catch (err) {
      console.error("Failed to create category:", err);
    }
  };

  // Delete category
 const del = async (id) => {
  try {
    await adminDeleteCategory(id);
    load();
  } catch (err) {
    alert(err.response?.data?.error || "Delete failed");
  }
};


  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-rose-700">📂 Admin • Categories</h1>

      {/* Create category form */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row gap-3 border border-rose-100">
        <input
          className="rounded-lg border p-3 flex-1 shadow-sm focus:ring-2 focus:ring-rose-400 outline-none"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="rounded-lg border p-3 flex-1 shadow-sm focus:ring-2 focus:ring-rose-400 outline-none"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <button
          onClick={create}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow hover:from-rose-600 hover:to-pink-600 transition"
        >
          ➕ Create
        </button>
      </div>

      {/* Category list */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c) => (
            <li
              key={c.ID}
              className="bg-white shadow rounded-2xl p-4 border hover:shadow-md transition flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-rose-700">{c.Name}</div>
                <div className="text-sm text-gray-500">/{c.Slug}</div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-rose-100 text-rose-600 font-medium">
                  ID: {c.ID}
                </span>
                <button
                  onClick={() => del(c.ID)}
                  className="px-3 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition text-sm"
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
