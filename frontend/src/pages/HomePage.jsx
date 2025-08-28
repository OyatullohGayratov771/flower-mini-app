import { Link } from "react-router-dom";

export default function HomePage() {
  const featured = [
    { id: 1, name: "Qizil Atirgullar", price: "120 000 so‘m", img: "/redroses.jpg" },
    { id: 2, name: "Lola Gullar", price: "90 000 so‘m", img: "/tulips.jpg" },
    { id: 3, name: "Oq Zambaklar", price: "150 000 so‘m", img: "/whitelilies.jpg" },
  ];

  const categories = [
    { id: 1, name: "Tug‘ilgan kunlar", img: "/bithday.jpg" },
    { id: 2, name: "To‘ylar", img: "/wedding.jpg" },
    { id: 3, name: "Sevgi va Muhabbat", img: "/loveandromance.jpg" },
    { id: 4, name: "Ofis bezagi", img: "/oficedecor.jpg" },
  ];

  const reviews = [
    { id: 1, user: "Dilnoza", text: "Gullar juda chiroyli va vaqtida yetkazib berildi!" },
    { id: 2, user: "Javohir", text: "Xizmat sifati zo‘r, xotinim juda xursand bo‘ldi." },
    { id: 3, user: "Madina", text: "Eng yaxshi gul do‘koni, hammaga tavsiya qilaman!" },
  ];

  return (
    <div className="space-y-20 bg-gradient-to-b from-white via-rose-50 to-white pb-16">

      {/* Hero Section */}
      <section className="relative h-[450px] sm:h-[550px] rounded-3xl overflow-hidden shadow-xl">
        <img
          src="/flower_1.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          alt="gullar"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="relative h-full flex flex-col items-start justify-center px-8 sm:px-16 text-white">
          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight drop-shadow-lg">
            Zamonaviy nafis <br /> gullar
          </h1>
          <p className="mt-5 max-w-lg text-white/90 text-lg sm:text-xl font-light leading-relaxed">
            Har bir lahzani yanada unutilmas qilish uchun o‘ziga xos buketlar.
          </p>
          <Link
            to="/shop"
            className="mt-8 px-8 py-4 bg-rose-500/90 backdrop-blur-sm text-white text-lg font-semibold rounded-full shadow-lg hover:bg-rose-600 transition-all"
          >
            Buyurtma berish
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-10 text-center">
          🌸 Mashhur Tanlovlar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {featured.map((f) => (
            <div key={f.id} className="bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden transition transform hover:-translate-y-1">
              <img src={f.img} alt={f.name} className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="font-serif text-xl text-gray-800">{f.name}</h3>
                <p className="text-rose-500 font-semibold mt-2">{f.price}</p>
                <Link to="/shop" className="mt-4 inline-block px-6 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition">
                  Ko‘rish
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-10 text-center">
          Toifalar
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl shadow hover:shadow-xl overflow-hidden group cursor-pointer transition">
              <img src={c.img} alt={c.name} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-4 text-center font-medium text-gray-700">{c.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="px-6 sm:px-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-10 text-center">
          ✨ Mijozlar Fikri
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <p className="italic text-gray-600">"{r.text}"</p>
              <div className="mt-4 font-bold text-rose-600">— {r.user}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About & Contact Section */}
      <section className="px-6 sm:px-12">
        <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl py-12 px-6 sm:px-12 shadow-inner text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-rose-700">
            Biz haqimizda
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700 text-lg leading-relaxed">
            Bizning gul do‘konimiz — nafislik va mehr uyg‘unlashgan maskan. 
            Har bir buketimiz sizning quvonchli onlaringizni yanada go‘zal qiladi. 
            Sifat va nafislik bizning asosiy qadriyatimizdir. 🌸
          </p>

          {/* Contact Info */}
          <div className="space-y-2 text-gray-800">
            <p className="text-lg">📞 <a href="tel:+998901234567" className="hover:text-rose-600">+998 90 123 45 67</a></p>
            <p className="text-lg">📍 Toshkent, O‘zbekiston</p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://t.me/yourtelegram" target="_blank" rel="noreferrer" className="text-rose-600 hover:text-rose-800 text-2xl">
              <i className="fab fa-telegram-plane"></i>
            </a>
            <a href="https://instagram.com/yourinstagram" target="_blank" rel="noreferrer" className="text-rose-600 hover:text-rose-800 text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}
