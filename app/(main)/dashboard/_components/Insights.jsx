"use client";

import React, { useEffect } from "react";
import useFetch from "@/hooks/use-fetch";
import { getLanguageInsights } from "@/actions/dashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function Insights() {
  const {
    loading: insightsLoading,
    fn: getInsightsFn,
    data: insightsInfo,
  } = useFetch(getLanguageInsights);

  useEffect(() => {
    const insights = async () => {
      await getInsightsFn();
    };
    insights();
  }, []);

  if (insightsLoading) {
    return <div className="container mx-auto">Loading insights...</div>;
  }


  if (!insightsInfo) {
    return <div className="container mx-auto">No insights available.</div>;
  }

  return (
    <div>
      <p className="text-4xl mt-10 font-bold">Language Insights</p>
      <p className="text-xl mt-2 font-bold text-gray-500">Know About the Language you want to learn</p>
      <div className="container mx-auto mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Total</CardTitle>
            <CardDescription className="text-xl">Speakers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-700">
              {insightsInfo?.totalSpeaker / 1000000} M
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Native</CardTitle>
            <CardDescription className="text-xl">Speakers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-700">
              {insightsInfo?.nativeSpeaker / 1000000} M
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Rank</CardTitle>
            <CardDescription className="text-xl">Worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-500">
              {insightsInfo?.rank}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Countries</CardTitle>
            <CardDescription className="text-xl">spoken in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insightsInfo?.geoDist?.length > 0 ? (
                insightsInfo.geoDist.map((country, index) => (
                  <Badge variant="outline" className="bg-green-700 text-white"
                  >
                    {country}
                  </Badge>
                ))
              ) : (
                <p>N/A</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Insights;
