"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Article } from "@/lib/common/type";
import { LoaderCircle, FileText, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizDialog } from "@/components/quiz-dialog";

export default function ArticleClientPage() {
  const params = useParams();
  const id = params?.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

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

  return (
    <div className="flex justify-center p-8">
      <div className="bg-white rounded-xl border p-8 w-full max-w-2xl space-y-6 shadow-sm">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-bold flex gap-2">
            <Sparkles className="text-blue-500" /> {article.title}
          </h1>
        </div>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase text-muted-foreground flex gap-2">
            <FileText className="w-4" /> Summarized content
          </h3>
          <p className="leading-relaxed text-slate-800 font-medium">
            {article.summary}
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase text-muted-foreground flex gap-2">
            <BookOpen className="w-4" /> Article Content
          </h3>
          <p
            className={`text-slate-600 text-sm ${!isExpanded ? "line-clamp-3" : ""}`}
          >
            {article.content}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-bold ml-auto block"
          >
            {isExpanded ? "Show less" : "See more"}
          </button>
        </section>

        <div className="pt-6 border-t">
          <Button
            onClick={() => setIsQuizOpen(true)}
            className="bg-black text-white px-10 h-11 rounded-lg"
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
