"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [body, setBody] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setBody((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(body)

  const isDisabled = !body.title.trim() || !body.content.trim();

  return (
    <div className="flex justify-center p-8">
      <div className="bg-white rounded-xl border p-8 w-full max-w-2xl space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Article Quiz Generator
          </h1>
          <p className="text-sm text-muted-foreground">
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Article Title
          </label>
          <Input
            placeholder="Enter a title for your article..."
            name="title"
            value={body.title}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Article Content
          </label>
          <Textarea
            placeholder="Paste your article content here..."
            className="min-h-36 resize-none"
            name="content"
            value={body.content}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="secondary" disabled={isDisabled}>
            Generate summary
          </Button>
        </div>
      </div>
    </div>
  );
}
