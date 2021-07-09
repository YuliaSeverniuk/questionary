import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuestionManagementComponent } from './components/question-management/question-management.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { ListOfQuestionsComponent } from './components/list-of-questions/list-of-questions.component';

const routes: Routes = [
  {path: 'question-management', component: QuestionManagementComponent},
  {path: 'create-question', component: CreateQuestionComponent},
  {path: 'question-edit', component: CreateQuestionComponent},
  {path: 'lists-of-questions', component: ListOfQuestionsComponent},
  {path: '', redirectTo: '/lists-of-questions', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FeatureRoutingModule { }
