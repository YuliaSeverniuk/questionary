import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { questionTypes } from '../../../shared/constants/constants';
import { IQuestionType } from '../../../shared/models/i-question-type';
import { QuestionsService } from '../../../core/services/questions.service';
import { IQuestionModel } from '../../../shared/models/iquestion-model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public types: IQuestionType[] = [ ...questionTypes ];
  public typesObject = {};
  public destroy$ = new Subject();
  public edit: boolean;
  public editedQuestion: IQuestionModel = null;

  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private activeRoute: ActivatedRoute
    ) {
    this.types.forEach(elem => {
      this.typesObject[elem.value] = elem.name;
    })
  }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.routeConfig.path === 'question-edit') {
      this.editedQuestion = this.questionService.editedQuestion.getValue();
      this.edit = true;
      this.buildForm(true, this.editedQuestion);
    } else {
      this.buildForm();
      this.form.get('type').valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => {
        this.answers.clear();
        if (value !== 'open_question') {
          this.answers.push(new FormControl('', [Validators.required]));
          this.answers.push(new FormControl('', [Validators.required]));
        }
      });
    }
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(value => this.questionService.saveQuestionState(value));
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  buildForm(edit?: boolean, formValue?: IQuestionModel) {
    this.form = new FormGroup({
      question: new FormControl(edit ? formValue.question : '', [Validators.required]),
      type: new FormControl(edit ? formValue.type.value : 'open_question'),
      answers: new FormArray([])
    })
    if (edit) {
      formValue.answers.forEach(answ => this.answers.push(new FormControl(answ, [Validators.required])));
      if(localStorage.getItem('new-question')) {
        const formValue = JSON.parse(localStorage.getItem('new-question'));
        this.form.patchValue(formValue);
      }
    } else {
      if(localStorage.getItem('new-question')) {
        const formVal = JSON.parse(localStorage.getItem('new-question'));
        formVal.answers.forEach(answ => this.answers.push(new FormControl(answ, [Validators.required])));
        this.form.patchValue(formVal);
      } else {
        if (this.form.get('type').value !== 'open_question') {
          this.answers.push(new FormControl('', [Validators.required]));
        }
      }
    }

  }

  get answers() {
    return this.form.get('answers') as FormArray;
  }

  addControl() {
    this.answers.push(new FormControl());
  }

  createQuestion() {
    const formValue = this.form.value;
    const question: IQuestionModel = {
      questionAnswered: this.edit ? this.editedQuestion.questionAnswered : false,
      answers: formValue.answers,
      question: formValue.question,
      date: this.edit ? this.editedQuestion.date : Date.now(),
      type: {
       name: this.typesObject[formValue.type],
       value: formValue.type
      },
      addedAnswer: this.edit ? this.editedQuestion.addedAnswer: null,
      answerDate: this.edit ? this.editedQuestion.answerDate: null
    }
    if (this.edit) {
      this.questionService.saveQuestion(question)
    } else {
      this.questionService.setNewQuestion(question);
    }
    this.router.navigate(['/question-management']);
  }

  return() {
    this.questionService.removeEditedQuestion();
    this.router.navigate(['/question-management']);
  }

}
