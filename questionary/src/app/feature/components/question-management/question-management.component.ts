import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../../core/services/questions.service';
import { Observable } from 'rxjs';
import { IQuestionModel } from '../../../shared/models/iquestion-model';
import { map } from 'rxjs/operators';
import { initQuestions } from '../../../shared/constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent implements OnInit {
  public questionsList$: Observable<IQuestionModel[]>;

  constructor(
    private questionsService: QuestionsService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.questionsList$ = this.questionsService.getAllQuestions()
      .pipe(map(questions => {
        return questions.sort( (a, b) => {
          if (a.date > b.date) {
            return -1;
          }
          if (a.date < b.date) {
            return 1;
          }
          // a должно быть равным b
          return 0;
        });
      }));
  }

  editQuestion(q: IQuestionModel) {
    this.questionsService.setEditedQuestion(q);
    this.router.navigate(['/question-edit']);
  }

  deleteQuestion(date: number) {
    this.questionsService.deleteQuestion(date);
  }

}
