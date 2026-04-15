export type Article = {
  userId: string;
  id: number;
  title: string;
  content: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
};
export type Quiz = {
  id: string;
  answer: string;
  articleId: number;
  options: string[];
  createdAt: string;
};
