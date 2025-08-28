import { createContext, useContext, useState } from "react"

// Context yaratamiz
const AppContext = createContext()

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light")
  const [user, setUser] = useState(null)

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, setUser }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook qilib ishlatish uchun
export function useApp() {
  return useContext(AppContext)
}
