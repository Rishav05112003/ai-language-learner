import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function notfound() {
  return (
    <div className='pt-40 flex flex-col justify-center items-center'>
        <h1 className='text-6xl font-bold  mb-4'>404</h1>
        <h2 className='text-2xl font-semibold mb-4'>Page Not Found</h2>
      <p className='text-gray-600 mb-8 '>Oops! The page you are looking for either doesnot exist or has been moved.</p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  )
}

export default notfound
