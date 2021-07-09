import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IQuestionModel } from '../../shared/models/iquestion-model';

@Injectable()
export class QuestionsService {

  public editedQuestion = new BehaviorSubject<IQuestionModel>(null);
  public newQuestion = new BehaviorSubject<IQuestionModel>(null);
  private questionList = new BehaviorSubject<IQuestionModel[]>([]);

  constructor() { }

  init() {
    this.questionList.next(localStorage.getItem('question-list') ? JSON.parse(localStorage.getItem('question-list')) : []);
    this.editedQuestion.next(JSON.parse(localStorage.getItem('edited-question')));
    this.newQuestion.next(JSON.parse(localStorage.getItem('new-question')));
  }

  getAllQuestions() {
    return this.questionList.asObservable();
  }

  setEditedQuestion(q:IQuestionModel) {
    this.editedQuestion.next(q);
    localStorage.setItem('edited-question', JSON.stringify(q))
  }

  setNewQuestion(question: IQuestionModel) {
    const allQuestions = this.questionList.getValue();
    allQuestions.unshift(question);
    this.questionList.next(allQuestions);
    localStorage.setItem('question-list', JSON.stringify(allQuestions));
    this.removeEditedQuestion();
  }

  saveQuestion(question: IQuestionModel) {
    const questionsList = JSON.parse(JSON.stringify(this.questionList.getValue()));
    questionsList.map(q => {
      if(q.date === question.date) {
        Object.keys(q).forEach(key => {
          q[key] = question[key];
        })
      }
    });
    this.questionList.next(questionsList);
    localStorage.setItem('question-list', JSON.stringify(questionsList));
    this.removeEditedQuestion()
  }

  saveQuestionState(q: IQuestionModel) {
    localStorage.setItem('new-question', JSON.stringify(q));
  }

  removeEditedQuestion() {
    localStorage.removeItem('edited-question');
    localStorage.removeItem('new-question');
  }

  deleteQuestion(date: number) {
    const questionsList = JSON.parse(JSON.stringify(this.questionList.getValue()));
    const resultArray = [];
    questionsList.forEach(q => {
      if(q.date !== date) {
       resultArray.push(q);
      }
    });
    this.questionList.next(resultArray);
    localStorage.setItem('question-list', JSON.stringify(resultArray));
  }

  setQuestionAnsweredState(question: IQuestionModel, state: boolean) {
    const array = this.questionList.getValue();
    array.map(q => {
      if (q.date === question.date) {
        q.questionAnswered = state;
        return q;
      }
      return q;
    });
    localStorage.setItem('question-list', JSON.stringify(array));
    this.questionList.next(array);
  }

}
