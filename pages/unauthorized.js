import { useRouter } from 'next/router'
import React from 'react'

const Unauthorized = () => {
    const router = useRouter();
    const { message } = router.query;
  return (
    
    <div className='unauthorized-page-container'>
    <div className='unauthorized-container'>
    <h1 className="unauthorized-title">Access Denied</h1>
      {message && <div className="unauthorized-message">{message}</div>}
    </div>
    </div>
  )
}

export default Unauthorized