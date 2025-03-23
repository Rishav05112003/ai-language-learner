import React from 'react'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';

async function page() {
    const {isOnboarded} = await getUserOnboardingStatus();
    console.log(isOnboarded);
    
    if(!isOnboarded){
        redirect("/onboarding");
    }
  return (
    <div>
      Dashboard
    </div>
  )
}

export default page
