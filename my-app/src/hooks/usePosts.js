import { useEffect, useState } from "react"
import api from "../api/axios"

export default function usePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get("/posts")
      .then((res) => {
        setPosts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { posts, loading, error }
}
