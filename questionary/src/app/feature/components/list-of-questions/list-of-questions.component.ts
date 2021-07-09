import { Component, OnInit } from '@angular/core';
import { IQuestionModel } from '../../../shared/models/iquestion-model';
import { QuestionsService } from '../../../core/services/questions.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-of-questions',
  templateUrl: './list-of-questions.component.html',
  styleUrls: ['./list-of-questions.component.scss']
})
export class ListOfQuestionsComponent implements OnInit {

  public unansweredQuestionsList: IQuestionModel[];
  public answeredQuestionsList: IQuestionModel[];

  constructor(
    private questionService: QuestionsService,
  ) { }

  ngOnInit(): void {
    this.questionService.getAllQuestions()
      .pipe(map(q => q.filter(el => !el.questionAnswered))).subscribe(value => {
      this.unansweredQuestionsList = value.sort( (a, b) => {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        // a должно быть равным b
        return 0;
      });
    })
    this.questionService.getAllQuestions()
      .pipe(map(q => q.filter(el => el.questionAnswered))).subscribe(value => {
      this.answeredQuestionsList = value.sort( (a, b) => {
        if (a.answerDate > b.answerDate) {
          return -1;
        }
        if (a.answerDate < b.answerDate) {
          return 1;
        }
        // a должно быть равным b
        return 0;
      });
    })
  }

}
