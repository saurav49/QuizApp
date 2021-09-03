export type AnswerType = {
  _id: string;
  answerText: string;
  isRight: boolean;
};

export type QuestionType = {
  _id: string;
  img: string;
  point: number;
  questionText: string;
  time: number;
  answers: Array<AnswerType>;
};

export type QuizType = {
  _id: string;
  name: string;
  img: string;
  questions: Array<QuestionType>;
  totalQuestions: number;
  totalPoints: number;
  totalTime: number;
};
