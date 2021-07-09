import { IQuestionModel } from '../models/iquestion-model';
import { IQuestionType } from '../models/i-question-type';

export const questionTypes: IQuestionType[] = [
  { name: 'Single choice', value: 'single_choice'},
  { name: 'Multiple choice', value: 'multiple_choice'},
  { name: 'Open question', value: 'open_question'},
]

export const initQuestions: IQuestionModel[] = [
  { date: 11111, question: 'first question', questionAnswered: false, answers: ['first answer', 'second answer'], type: questionTypes[0]},
  { date: 11110, question: 'second question', questionAnswered: false, answers: ['first answer', 'second answer'], type: questionTypes[1]},
  { date: 11110, question: 'third question', questionAnswered: false, answers: ['first answer'], type: questionTypes[2]},
];
