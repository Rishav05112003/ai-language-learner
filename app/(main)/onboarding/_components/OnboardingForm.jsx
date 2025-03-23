"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { languages } from "@/data/languages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const OnboardingForm = ({ languages }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const router = useRouter();


  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const watchLanguage = watch("language")
  const watchNativeLang = watch("nativeLang")

  const onSubmit = async (values) => {
    console.log(values);
    console.log("values received");
    try {
      await updateUserFn({
        ...values,
      })
    } catch (error) {
      console.error("Onboarding error : ", error);
    }
  }


  const onError = (errors) => {
    console.log("Validation errors:", errors);
  };

  useEffect(() => {
    if(updateResult?.success && !updateLoading){
      toast.success("Profile Completed SUccessfully");
      router.push("/dashboard");
      router.refresh();
    }
  },[updateLoading, updateResult])

  return (
    <div className="flex items-center justify-center bg-white">
      <Card className="w-full max-w-lg mt-20 max-2">
        <CardHeader>
          <CardTitle className="text-4xl">Complete Your Profile </CardTitle>
          <CardDescription>
            Select The Necessary Details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="space-y-6">
              <Label htmlFor="language" className="mb-2">
                Language You want to Learn
              </Label>
              <Select
                onValueChange={(value) => {
                  const selected = languages.find((lang) => lang.id === value);
                  if(selected){
                    setValue("language", selected.name);
                    setSelectedLanguage(selected);
                  }
                }}
              >
                <SelectTrigger id="language" className="w-[180px]">
                  <SelectValue placeholder="Languages" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => {
                    return (
                      <SelectItem key={lang.id} value={lang.id}>
                        {lang.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.language && (
                <p className="text-sm text-red-700">
                  {errors.language.message}
                </p>
              )}
            </div>

            {watchLanguage && (<div className="space-y-6">
              <Label htmlFor="Native Language" className="mb-2">
                Spoken Language
              </Label>
              <Select
                onValueChange={(value) => {
                  const selected = languages.find((lang) => lang.id === value);
                  if(selected){
                    setValue("nativeLang", selected.name);
                    setSelectedLanguage(selected);
                  }
                }}
              >
                <SelectTrigger id="nativeLang" className="w-[180px]">
                  <SelectValue placeholder="Native Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => {
                    return (
                      <SelectItem key={lang.id} value={lang.id}>
                        {lang.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.nativeLang && (
                <p className="text-sm text-red-700">
                  {errors.nativeLang.message}
                </p>
              )}
            </div>)}

            { watchNativeLang && (<div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="0"
                max="70"
                placeholder="Enter your Age"
                {...register("age", {valueAsNumber:true})}
              />
              {errors.age && (
                <p className="text-sm text-red-500">
                  {errors.age.message}
                </p>
              )}
            </div>)}



            <button type="submit" className="w-full mt-5 bg-black text-white h-7 rounded-[6px]">
              {updateLoading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
