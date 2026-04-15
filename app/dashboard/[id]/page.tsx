"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Article } from "@/lib/common/type";
import { LoaderCircle, FileText, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArticleClientPage() {
  const params = useParams();
  const id = params.id;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // Toggle state for "See more"

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/get/${id}`);
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoaderCircle className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  if (!article)
    return (
      <div className="p-8 text-center text-red-500">Article not found.</div>
    );

  return (
    <div className="flex justify-center p-8">
      <div className="bg-white rounded-xl border p-8 w-full max-w-2xl space-y-6 shadow-sm">
        {/* Header */}
        <div className="space-y-2 border-b pb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-500" />
            {article.title}
          </h1>
        </div>

        {/* AI Summary Section */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <FileText className="w-4 h-4" /> Summarized content
          </h3>
          <p className="leading-relaxed text-slate-800 font-medium">
            {article.summary}
          </p>
        </section>

        {/* Original Content Section */}
        <section className="space-y-3 pt-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Article Content
          </h3>

          <div className="relative">
            <p
              className={`leading-relaxed text-slate-600 text-sm transition-all duration-300 ${!isExpanded ? "line-clamp-3" : ""}`}
            >
              {article.content}
            </p>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-sm font-bold text-slate-900 hover:underline block ml-auto"
            >
              {isExpanded ? "Show less" : "See more"}
            </button>
          </div>
        </section>

        <div className="pt-4 flex justify-start items-center border-t">
          <Button className="bg-black text-white px-8 hover:bg-zinc-800 transition-colors">
            Take a quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
