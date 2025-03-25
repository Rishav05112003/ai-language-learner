"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import useFetch from "@/hooks/use-fetch";
import { getUser } from "@/actions/user";

function UserInfo() {
  const [date, setDate] = useState(new Date());
  const {
    loading: userLoading,
    fn: getUserFn,
    data: userInfo,
  } = useFetch(getUser);

  useEffect(() => {
    const fetchData = async () => {
      await getUserFn();
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
                  {userInfo.assessmentsDone ?? 0}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}


      {/* Calendar is independent of userInfo */}
      {/* <div className="mt-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div> */}
    </div>
  );
}

export default UserInfo;
