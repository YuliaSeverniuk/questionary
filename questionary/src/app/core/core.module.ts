import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { QuestionsService } from './services/questions.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SharedModule,
  ],
  providers: [
    QuestionsService
  ]
})
export class CoreModule { }
