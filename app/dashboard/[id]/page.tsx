"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Article } from "@/lib/common/type";
import {
  LoaderCircle,
  FileText,
  Sparkles,
  BookOpen,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizDialog } from "@/components/quiz-dialog";

export default function ArticleClientPage() {
  const params = useParams();
  const id = params?.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(`/api/articles/get/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setArticle(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center p-20">
        <LoaderCircle className="animate-spin w-8 h-8" />
      </div>
    );

  if (!article)
    return (
      <div className="p-8 text-center text-red-500">Article not found.</div>
    );

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4 bg-slate-50/50">
      <div className="w-full max-w-2xl flex justify-start">
        <Button
          variant="outline"
          size="icon"
          onClick={handleBack}
          className="bg-white hover:bg-slate-100 rounded-xl h-10 w-10 border shadow-sm transition-all"
        >
          <ChevronLeft className="h-5 w-5 text-slate-600" />
        </Button>
      </div>

      <div className="bg-white rounded-xl border p-8 w-full max-w-2xl space-y-6 shadow-sm">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
            <Sparkles className="text-blue-500 h-6 w-6" /> {article.title}
          </h1>
        </div>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <FileText className="w-4 h-4" /> Summarized content
          </h3>
          <p className="leading-relaxed text-slate-800 font-medium">
            {article.summary}
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Article Content
          </h3>
          <div className="relative">
            <p
              className={`text-slate-600 text-sm leading-relaxed transition-all duration-300 ${!isExpanded ? "line-clamp-3" : ""}`}
            >
              {article.content}
            </p>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm font-bold text-slate-900 hover:underline mt-2 block ml-auto"
            >
              {isExpanded ? "Show less" : "See more"}
            </button>
          </div>
        </section>

        <div className="pt-6 border-t flex justify-start">
          <Button
            onClick={() => setIsQuizOpen(true)}
            className="bg-zinc-900 text-white px-10 h-11 rounded-lg hover:bg-black transition-all shadow-md"
          >
            Take a quiz
          </Button>
        </div>
      </div>

      {article.quizzes && (
        <QuizDialog
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          quizData={article.quizzes}
        />
      )}
    </div>
  );
}
