// File: @/lib/common/type.ts (or wherever your types are)

export type Quiz = {
  id: number; // Changed from string to number to match DB
  question: string; // Added missing field from DB
  answer: string;
  options: string[];
  articleId: number;
  createdAt: Date; // Changed to Date to match Prisma output
};

export type Article = {
  id: number;
  userId: string;
  title: string;
  content: string;
  summary: string;
  quizzes: Quiz[];
  createdAt: Date;
  updatedAt: Date;
};
