import { useRouter } from 'next/router'
import React from 'react'

const Unauthorized = () => {
    const router = useRouter();
    const { message } = router.query;
  return (
    <div className='unauthorized-container'>
    <h1 className="unauthorized">Access Denied</h1>
      {message && <div className="unauthorized-message">{message}</div>}
    </div>
  )
}

export default Unauthorized