import { useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orders";

export default function CartPage() {
  const { items, setQty, remove, total_cents, currency, clear } = useCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const formatPrice = (value) =>
    new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: currency || "UZS",
      minimumFractionDigits: 2,
    }).format(value / 100);

  const canOrder = useMemo(
    () => items.length > 0 && address.trim() && phone.trim(),
    [items, address, phone]
  );

  const submit = async () => {
    setTouched(true);
    if (!canOrder) return;

    setLoading(true);
    try {
      const payload = {
        total_cents,
        currency,
        address,
        phone,
        note,
        items: items.map((i) => ({
          product_id: i.ID,
          qty: i.Qty,
          price_cents: i.PriceCents,
        })),
      };
      const r = await createOrder(payload);
      clear();
      alert(`✅ Buyurtma #${r.data.ID} muvaffaqiyatli yaratildi!`);
    } catch (e) {
      alert("❌ Buyurtma yuborishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 py-6 bg-gradient-to-br from-rose-50 to-pink-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-rose-800 mb-6 text-center">
        🛒 Savatchangiz
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {items.length === 0 && (
            <p className="text-gray-500 text-base sm:text-lg text-center">
              Hozircha savatchangiz bo‘sh.
            </p>
          )}

          {items.map((i, idx) => (
            <div
              key={i.id || idx}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 bg-white shadow-md rounded-2xl p-4 sm:p-5 hover:shadow-xl transition-all"
            >
              {/* Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                <img
                  src={i.image_url || "/flower_2.jpg"}
                  alt={i.name}
                  className="w-full h-full object-cover rounded-xl border"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="font-semibold text-base sm:text-lg text-rose-900">
                  {i.name}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  {formatPrice(i.price_cents)} × {i.qty}
                </div>
                <div className="text-rose-600 font-bold mt-1 text-sm sm:text-base">
                  = {formatPrice(i.price_cents * i.qty)}
                </div>

                {/* Qty input */}
                <div className="mt-3 flex justify-center sm:justify-start items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-500">Miqdor:</span>
                  <div className="flex items-center border rounded-lg shadow-sm overflow-hidden">
                    <button
                      onClick={() => setQty(i.id, Math.max(1, i.qty - 1))}
                      className="px-2 sm:px-3 py-1 sm:py-2 bg-rose-100 hover:bg-rose-200 text-rose-600 font-bold"
                    >
                      –
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={i.qty}
                      onChange={(e) => setQty(i.id, Number(e.target.value))}
                      className="w-12 sm:w-16 text-center outline-none border-x p-1 sm:p-2"
                    />
                    <button
                      onClick={() => setQty(i.id, i.qty + 1)}
                      className="px-2 sm:px-3 py-1 sm:py-2 bg-rose-100 hover:bg-rose-200 text-rose-600 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove */}
              <button
                className="text-red-500 hover:text-red-700 font-bold text-lg sm:text-xl transition"
                onClick={() => remove(i.id)}
                title="O‘chirish"
              >
                ✖
              </button>
            </div>
          ))}
        </div>

        {/* Checkout sidebar */}
        <aside className="order-last lg:order-none backdrop-blur-md bg-white/90 shadow-xl rounded-2xl p-6 sm:p-8 h-fit">
          <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-rose-700">
            Buyurtma qilish
          </h3>

          <div className="space-y-3 sm:space-y-4">
            <input
              className={`w-full rounded-xl border p-2 sm:p-3 text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-rose-400 outline-none ${
                touched && !address ? "border-red-400" : ""
              }`}
              placeholder="🏠 Manzil"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              className={`w-full rounded-xl border p-2 sm:p-3 text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-rose-400 outline-none ${
                touched && !phone ? "border-red-400" : ""
              }`}
              placeholder="📞 Telefon raqami"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              className="w-full rounded-xl border p-2 sm:p-3 text-sm sm:text-base shadow-sm focus:ring-2 focus:ring-rose-400 outline-none"
              placeholder="📝 Izoh (ixtiyoriy)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* Total */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-rose-100 to-pink-200 rounded-xl text-right text-base sm:text-xl font-semibold text-rose-700 shadow-inner">
            Jami: {formatPrice(total_cents)}
          </div>

          {/* Order Button */}
          <button
            disabled={!canOrder || loading}
            onClick={submit}
            className="w-full mt-4 sm:mt-6 py-2 sm:py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-base sm:text-lg font-semibold rounded-xl shadow-md hover:from-rose-700 hover:to-pink-700 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Yuborilmoqda...
              </>
            ) : (
              "✅ Buyurtma berish"
            )}
          </button>
        </aside>
      </div>
    </div>
  );
}
