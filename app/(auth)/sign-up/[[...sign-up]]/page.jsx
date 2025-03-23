import React from 'react'
import { SignUp } from '@clerk/nextjs'

function Page() {
  return (
    <SignUp forceRedirectUrl='/onboarding'/>
    
  )
}

export default Page
