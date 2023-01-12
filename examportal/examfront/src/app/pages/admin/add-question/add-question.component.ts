import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qId: any;
  qTitle:any;
  question = {
    quiz: {
      qid:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }
  constructor(private _route: ActivatedRoute, private _ques: QuestionService, private _snack: MatSnackBar) { }

  ngOnInit(): void {

    this.qTitle = this._route.snapshot.params['title'];
    this.question.quiz['qid'] = this._route.snapshot.params['qid'];

  }

  // add question to db
  public addQuestion() {

    if(this.question.content.trim() == '' || this.question.content == null) {
      this._snack.open('Content must required', '', {
        duration: 3000,
      })
      return;
    }

    if(this.question.option1.trim() == '' || this.question.option1 == null || this.question.option2.trim() == '' || this.question.option2 == null) {
      this._snack.open('Two Options must required', '', {
        duration: 3000,
      })
      return;
    }

    if(this.question.answer.trim() == '' || this.question.answer == null) {
      this._snack.open('Please Choose Correct answer', '', {
        duration: 3000,
      })
      return;
    }


    this._ques.addQuestion(this.question).subscribe((data)=>{
      Swal.fire("Success :)", 'Question Added to Quiz', 'success');
      this.question = {
        quiz: {
          qid:this.qId
        },
        content:'',
        option1:'',
        option2:'',
        option3:'',
        option4:'',
        answer:'',
      }
    }, (error)=>{
      Swal.fire('Error :(', 'Internal Server Error', 'error');
    })
  }

}
