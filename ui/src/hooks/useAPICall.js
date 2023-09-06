import React, { useState, useEffect } from 'react'

const useAPICall = (ready, params, apiCall) => {
    const [data, setData] = useState(null)
    useEffect(() => {
      if (!ready) {
        return
      }
      const getData = async () => {
        const data = await apiCall(params)
        setData(data)
      }
      getData()
    }, [ready])
    return data
  }

export default useAPICall