import {  Component, Input, OnInit } from '@angular/core';
import { IQuestionModel } from '../../models/iquestion-model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionsService } from '../../../core/services/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: IQuestionModel;
  public form: FormGroup;
  public formArray: FormArray;
  public multipleChoiceError: boolean;
  constructor(
    private questionsService: QuestionsService,
  ) { }

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent() {
    this.form = new FormGroup({
      multiple_choice: new FormArray([], [Validators.required]),
      open_question: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      single_choice: new FormControl(null, [Validators.required])
    })
    this.question.answers.forEach(() => {
      this.multiAnswers.push(new FormControl(false));
    })

  }

  get multiAnswers() {
    return this.form.get('multiple_choice') as FormArray;
  }

  addAnswer() {
    let answer: string[] = [];
    switch (this.question.type.value) {
      case 'single_choice': answer.push(this.form.get(this.question.type.value).value); break;
      case 'open_question': answer.push(this.form.get(this.question.type.value).value); break;
      case 'multiple_choice': this.multiAnswers.value.forEach((elem, i) => {
        if (elem) {
          answer.push(this.question.answers[i]);
        }
      }); break
    }
    if (answer.length) {
      this.question.addedAnswer = answer;
      this.question.answerDate = Date.now();
      this.questionsService.setQuestionAnsweredState(this.question, true);
      this.multipleChoiceError = false;
    } else {
      this.multipleChoiceError = true;
    }
    console.log(this.multipleChoiceError)
  }

  changeAnswer() {
    this.question.addedAnswer = [];
    this.question.answerDate = null;
    this.questionsService.setQuestionAnsweredState(this.question, false);
  }
}
