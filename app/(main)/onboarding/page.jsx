import React from 'react'
import OnboardingForm from './_components/OnboardingForm'
import { languages } from '@/data/languages'
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';

const Page = async () => {

  const {isOnboarded} = await getUserOnboardingStatus();

  if(isOnboarded){
    redirect("/dashboard");
  }


  return (
    <main className='pt-10'>
      <OnboardingForm languages={languages}/>
    </main>
  )
}

export default Page
