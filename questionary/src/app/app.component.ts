import { Component } from '@angular/core';
import { QuestionsService } from './core/services/questions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Questionnaire';
  constructor(private questionService: QuestionsService) {
    questionService.init();
  }
}
