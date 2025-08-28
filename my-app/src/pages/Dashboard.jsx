import { useApp } from "../context/AppContext"

export default function Dashboard() {
  const { user, setUser } = useApp()

  const loginDemo = () => {
    setUser({ name: "Azamat", role: "Admin" })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>

      {user ? (
        <p>👋 Salom, <b>{user.name}</b> ({user.role})</p>
      ) : (
        <>
          <p>🚀 Hali login qilmagansiz</p>
          <button 
            onClick={loginDemo} 
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
          >
            Demo Login
          </button>
        </>
      )}
    </div>
  )
}
