"use client";

import { generateQuestions, saveQuestions } from "@/actions/prep";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect } from "react";
import { useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";
import QuestionResult from "./QuestionResult";


function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);


  const {
    loading: generatingQuestions,
    fn: generateQuestionsFn,
    data: questionsData,
  } = useFetch(generateQuestions);

  const {
    loading: savingResult,
    fn : saveQuestionResultFn,
    date: resultData,
    setData: setResultData,
  } = useFetch(saveQuestions);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  }

  const handleNext = () => {
    if(currentQuestion < questionsData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowExplanation(false);
    } else {
        console.log("quiz finished");
        finishQuiz();
    }
  }

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
        if(answer === questionsData[index].correctAnswer) {
            correct++;
        }
    });
    return (correct / questionsData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
        await saveQuestionResultFn(questionsData, answers, score);
        toast.success("Quiz Completed!");
    } catch (error) {
        toast.error(error.message || "Failed to save quiz");
    }
  }

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    generateQuestionsFn();
    setResultData(null);
  }
  
  useEffect(() => {
    if(questionsData){
        setAnswers(new Array(questionsData.length).fill(null))
    }
  }, [questionsData]);


  if(generatingQuestions){
    return <BarLoader className="mt-4" width={"100%"} color="gray"/>
  }

  if(resultData){
    return (
      <div className="mx-2">
        <QuestionResult result={resultData} onStartNew={startNewQuiz}/>
      </div>
    )
  }


  if (!questionsData) {
    return (
      <Card className="mx-2 mt-10 border-2
      ">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your language and
            learnings. Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuestionsFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }
  

  const question = questionsData[currentQuestion];

  return (
  <Card>
    <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {questionsData.length}
        </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
        <p className="text-lg font-medium">{question.question}</p>
        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
          className="space-y-2"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto"
        >
          {savingResult && (
            <BarLoader className="mt-4" width={"100%"} color="gray" />
          )}
          {currentQuestion < questionsData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </CardFooter>
  </Card>
  );
}

export default Questions;
