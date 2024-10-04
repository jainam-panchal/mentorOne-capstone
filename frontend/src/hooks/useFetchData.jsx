import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { token } from '../../config.js'

const useFetchData = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await fetch(url, {
          headers: {Authorization : `Bearer ${token}`}
        })
        const result = await res.json()

        if (!res.ok) {
          const errorMessage = result.message
            ? result.message
            : 'An error occurred'
          setError(errorMessage + ' 🤢')
          return
        }

        setData(result.data)
      } catch (err) {
        setError(err.message + ' 🤢')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetchData
