import React from 'react'
import { getUserOnboardingStatus } from '@/actions/user'
import { redirect } from 'next/navigation';
import UserInfo from './_components/UserInfo';
import Insights from './_components/Insights';

async function page() {
    const {isOnboarded} = await getUserOnboardingStatus();
    console.log(isOnboarded);
    
    if(!isOnboarded){
        redirect("/onboarding");
    }
  return (
    <div className='pt-20'>
      <UserInfo/>
      <Insights/>
    </div>
  )
}

export default page
