"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, LoaderCircle, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [body, setBody] = useState({ title: "", content: "" });
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBody((prev) => ({ ...prev, [name]: value }));
  };

  const isDisabled = !body.title.trim() || !body.content.trim() || isLoading;

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/articles/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      setResult(data.summary);
    } catch (err) {
      console.error("Generation failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 space-y-8">
      <div className="bg-white rounded-xl border p-8 w-full max-w-2xl space-y-6 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            Article Quiz Generator
          </h1>
          <p className="text-sm text-muted-foreground">
            Paste your article to generate a summary and quiz questions.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" /> Article Title
            </label>
            <Input
              placeholder="Enter a title..."
              name="title"
              value={body.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" /> Article Content
            </label>
            <Textarea
              placeholder="Paste content here..."
              className="min-h-36"
              name="content"
              value={body.content}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleGenerate}
            disabled={isDisabled}
            className="gap-2"
          >
            {isLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isLoading ? "Generating..." : "Generate Summary & Quiz"}
          </Button>
        </div>
      </div>
    </div>
  );
}
