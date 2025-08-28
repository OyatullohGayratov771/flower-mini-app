import Button from "../components/Button"

export default function About() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-green-600">ℹ️ About Page</h1>
      <Button onClick={() => alert("Bosildi!")}>Click Me 🚀</Button>
    </div>
  )
}
