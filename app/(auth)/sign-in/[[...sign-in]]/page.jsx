import React from 'react'
import { SignIn } from '@clerk/nextjs'

function Page() {
  return (
    <SignIn forceRedirectUrl='/onboarding'/>
  )
}

export default Page
