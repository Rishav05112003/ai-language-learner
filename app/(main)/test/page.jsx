import React from "react";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import StatCards from "./_components/StatCards";
import { getAssessments } from "@/actions/prep";
import PerformanceChart from "./_components/performanceChart";
import QuestionList from "./_components/QuestionList";



async function page() {
  const { isOnboarded } = await getUserOnboardingStatus();
  console.log(isOnboarded);

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const assessments = await getAssessments();
  return <div className="pt-20 text-black container mx-auto">
    <div className="flex items-center justify-between mb-5">
        <h1 className="sm:text-6xl font-bold gradient-title text-4xl">
          Assessment
        </h1>
      </div>
    <div className="space-y-6">
    <StatCards assessments={assessments}/>
    <PerformanceChart assessments={assessments}/>
    <QuestionList assessments={assessments}/>
    </div>
  </div>;
}

export default page;
