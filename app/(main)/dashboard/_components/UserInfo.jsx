"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import { getUser } from "@/actions/user";
import { countAssessments } from "@/actions/prep";

function UserInfo() {
  const [date, setDate] = useState(new Date());
  const {
    loading: userLoading,
    fn: getUserFn,
    data: userInfo,
  } = useFetch(getUser);

  const {
    loading: countLoading,
    fn: countAssessmentsFn,
    data: countAssessmentData,
  } = useFetch(countAssessments);

  useEffect(() => {
    const fetchData = async () => {
      await getUserFn();
      await countAssessmentsFn();
    };
    fetchData();
  }, []);

  return (
    <div className="mt-0 ">
      <div className="mb-4">
        {userLoading ? (
          "Loading user info..."
        ) : userInfo ? (
          <div className="text-4xl font-bold">
            Welcome, {userInfo.name ? userInfo.name : "User"}!
          </div>
        ) : (
          "No user info available."
        )}
      </div>

      {/* Only render user data cards if userInfo is available */}
      {userInfo && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Language</CardTitle>
                <CardDescription>You want to Learn</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-700">
                  {userInfo.language}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Native</CardTitle>
                <CardDescription>Language</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-700">
                  {userInfo.nativeLang}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Age</CardTitle>
                <CardDescription>in years</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-500">
                  {userInfo.age}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Assessments</CardTitle>
                <CardDescription>Done</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-500">
                  {countAssessmentData}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}


      
    </div>
  );
}

export default UserInfo;
