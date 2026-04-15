export type Quiz = {
  id: number;
  question: string;
  answer: string;
  options: string[];
  articleId: number;
  createdAt: Date;
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
