import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Questions from "../_components/Questions";

function page() {
  return (
    <div className="pt-20">
        <Link href="/test">
        <Button className="bg-white text-black hover:bg-gray-100">
          <ArrowLeft className="gap-2 pl-0" />
          Back to Assessment Section
        </Button>
      </Link>
      <h1 className="text-5xl font-bold pb-2 pt-5">Assessment</h1>
      <p className="text-gray-600">Test Your Knowledge using language-specific quiz</p>
      <Questions/>
    </div>
  );
}

export default page;
