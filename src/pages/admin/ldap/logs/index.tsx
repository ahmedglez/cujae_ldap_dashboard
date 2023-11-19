import Loader from '@/components/feedback/Loader'
import AdminRoute from '@/components/hocs/AdminRoute'
import PaginationTable from '@/components/pagination/PaginationTable'
import { withAuthAxiosInstance } from '@/constants/axiosInstance'
import { showToastError } from '@/helpers/toastHelper'
import usePagination from '@/hooks/usePaginateUsers'
import useProfileStore from '@/stores/profile.store'
import LogType from '@/types/log.type'
import LogsTable from '@/views/admin/ldap/LogsTable'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const URL = `/logs`
const LogsPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [logs, setLogs] = useState<LogType[]>([])

  const [pagination, setPagination] = useState({ page: 1, rowsPerPage: 25 })
  const { roles } = useProfileStore()
  const ou = router.query.ou
  const paginatedLogs = usePagination(logs, pagination)

  useEffect(() => {
    if (!roles.includes('superadmin')) {
      router.push('/')
    }
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await withAuthAxiosInstance.get(URL)
        const { data } = response
        setLogs(data.logs)
        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        const { data } = error.response
        showToastError(data.message)
      }
    }
    fetchData()
  }, [ou])

  return (
    <div>
      <h1>{`Registro de Logs`}</h1>
      {loading && <Loader message={`Cargando Registro de Logs`} />}
      {logs.length > 0 && !loading && <LogsTable logs={paginatedLogs} loading={loading} />}
      {!loading && paginatedLogs.length > 0 && (
        <PaginationTable pagination={pagination} setPagination={setPagination} entries={logs} />
      )}
    </div>
  )
}

export default AdminRoute(LogsPage)
