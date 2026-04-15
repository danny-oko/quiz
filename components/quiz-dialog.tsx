"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Sparkles } from "lucide-react";
import { Quiz } from "@/lib/common/type";
import { QuizResults } from "./quiz-results";

export function QuizDialog({
  isOpen,
  onClose,
  quizData,
}: {
  isOpen: boolean;
  onClose: () => void;
  quizData: Quiz[];
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuiz = quizData[currentStep];

  const handleNext = () => {
    if (currentStep < quizData.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl bg-slate-50">
        {showResults ? (
          <div className="p-6">
            <QuizResults
              questions={quizData}
              userAnswers={userAnswers}
              onRestart={() => {
                setShowResults(false);
                setCurrentStep(0);
                setUserAnswers({});
              }}
              onSave={onClose}
            />
          </div>
        ) : (
          <>
            <div className="p-6 pb-2">
              <DialogHeader className="flex flex-row items-center justify-between space-y-0 text-left">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-slate-900" />
                    <DialogTitle className="text-xl font-bold">
                      Quick test
                    </DialogTitle>
                  </div>
                  <DialogDescription className="text-sm text-slate-500">
                    Take a quick test about your knowledge
                  </DialogDescription>
                </div>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 border bg-white rounded-xl"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </DialogHeader>
            </div>

            <div className="p-6 pt-2">
              <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="font-bold text-lg leading-snug text-left">
                    {currentQuiz?.question}
                  </h3>
                  <span className="text-sm font-bold text-slate-300 tabular-nums">
                    {currentStep + 1} / {quizData.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentQuiz?.options.map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      className={`h-auto min-h-[3rem] py-3 text-center transition-all ${userAnswers[currentStep] === option ? "border-black ring-1 ring-black bg-slate-50" : "border-slate-100"}`}
                      onClick={() =>
                        setUserAnswers({
                          ...userAnswers,
                          [currentStep]: option,
                        })
                      }
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 flex justify-end">
              <Button
                disabled={!userAnswers[currentStep]}
                onClick={handleNext}
                className="bg-black text-white px-8 rounded-lg h-11"
              >
                {currentStep === quizData.length - 1
                  ? "Finish"
                  : "Next Question"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
