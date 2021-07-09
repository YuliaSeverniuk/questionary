import { IQuestionType } from './i-question-type';

export interface IQuestionModel {
  date: number;
  question: string;
  answers: string[];
  type: IQuestionType;
  questionAnswered: boolean;
  addedAnswer?: string[];
  answerDate?: number;
}
