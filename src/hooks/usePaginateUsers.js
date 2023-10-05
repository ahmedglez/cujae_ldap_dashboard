import { useEffect, useState } from 'react'

const usePagination = (entries, pagination) => {
  const [paginatedEntries, setPaginatedEntries] = useState([])

  useEffect(() => {
    // Get the initial rendered users
    const initialRenderedEntries = entries.slice(
      (pagination.page - 1) * pagination.rowsPerPage,
      pagination.page * pagination.rowsPerPage
    )
    // Set the initial rendered users
    setPaginatedEntries(initialRenderedEntries)
  }, [entries])

  // Update the rendered users whenever the pagination changes
  useEffect(() => {
    const newRenderedEntries = entries.slice(
      (pagination.page - 1) * pagination.rowsPerPage,
      pagination.page * pagination.rowsPerPage
    )

    // Set the new rendered users
    setPaginatedEntries(newRenderedEntries)
  }, [pagination])

  return paginatedEntries
}

export default usePagination
