import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionManagementComponent } from './components/question-management/question-management.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { ListOfQuestionsComponent } from './components/list-of-questions/list-of-questions.component';
import { SharedModule } from '../shared/shared.module';
import { FeatureRoutingModule } from './feature-routing.module';

@NgModule({
  declarations: [
    QuestionManagementComponent,
    CreateQuestionComponent,
    ListOfQuestionsComponent
  ],
    imports: [
        CommonModule,
        FeatureRoutingModule,
        SharedModule,
    ],
  exports: [
    QuestionManagementComponent,
    CreateQuestionComponent,
    ListOfQuestionsComponent
  ]
})
export class FeatureModule { }
