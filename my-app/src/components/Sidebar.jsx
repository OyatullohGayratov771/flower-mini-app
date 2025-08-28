import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-60 bg-gray-200 h-full p-4">
      <h2 className="text-lg font-bold mb-4">📂 Menu</h2>
      <ul className="space-y-2">
        <li><Link to="/" className="block p-2 hover:bg-gray-300 rounded">Home</Link></li>
        <li><Link to="/about" className="block p-2 hover:bg-gray-300 rounded">About</Link></li>
        <li><Link to="/dashboard" className="block p-2 hover:bg-gray-300 rounded">Dashboard</Link></li>
      </ul>
    </aside>
  )
}
