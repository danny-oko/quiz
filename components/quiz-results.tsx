"use client";

import { CheckCircle2, XCircle, RotateCcw, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/lib/common/type"; // Using your Quiz type

interface QuizResultProps {
  questions: Quiz[];
  userAnswers: Record<number, string>;
  onRestart: () => void;
  onSave: () => void;
}

export function QuizResults({
  questions,
  userAnswers,
  onRestart,
  onSave,
}: QuizResultProps) {
  const score = questions.reduce(
    (acc, q, idx) => (userAnswers[idx] === q.answer ? acc + 1 : acc),
    0,
  );

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <Sparkles className="w-8 h-8 text-slate-900" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Quiz completed</h2>
        <p className="text-sm text-slate-500">Let's see what you did</p>
      </div>

      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6 max-h-[350px] overflow-y-auto">
        <h3 className="text-xl font-bold">
          Your score: {score}{" "}
          <span className="text-slate-300">/ {questions.length}</span>
        </h3>

        <div className="space-y-6">
          {questions.map((q, idx) => {
            const isCorrect = userAnswers[idx] === q.answer;
            return (
              <div
                key={q.id}
                className="flex gap-4 items-start border-l-2 pl-4 py-1 border-slate-50"
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1 text-sm text-left">
                  <p className="font-medium text-slate-400">
                    {idx + 1}. {q.question}
                  </p>
                  <p className="text-slate-900">
                    Your answer:{" "}
                    <span className="font-bold">{userAnswers[idx]}</span>
                  </p>
                  {!isCorrect && (
                    <p className="text-green-600 font-bold">
                      Correct: {q.answer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 h-11" onClick={onRestart}>
          <RotateCcw className="w-4 h-4 mr-2" /> Restart quiz
        </Button>
        <Button className="flex-1 h-11 bg-black text-white" onClick={onSave}>
          <Save className="w-4 h-4 mr-2" /> Save and leave
        </Button>
      </div>
    </div>
  );
}
