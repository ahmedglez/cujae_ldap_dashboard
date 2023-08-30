import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import { useEffect, useState } from 'react'

const useFetchUsers = (ednpoint, baseDN) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await withAuthAxiosInstance.post(`${ednpoint}`, {
          baseDN
        })
        setUsers(response.data.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err)
      }
    }

    fetchData()
  }, [baseDN])

  return {
    loading,
    error,
    users
  }
}

export default useFetchUsers
