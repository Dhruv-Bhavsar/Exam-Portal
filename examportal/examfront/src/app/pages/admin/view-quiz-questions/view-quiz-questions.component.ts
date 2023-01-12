import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;
  questions:any[] = []


  constructor(private _route: ActivatedRoute, private _ques : QuestionService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    console.log(this.qTitle);
    
    this._ques.getQuestionsOfQuiz(this.qId).subscribe((data:any)=>{
      this.questions = data;
      console.log(data);
      
    },(error)=>{
      console.log(error);
      
    })
    
    
  }

  // delete question
  public deleteQuestion(qid:any) {

    
      Swal.fire({
        icon:'info',
        title:"Are you sure you want to delete this Question ?",
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result)=>{
        if(result.isConfirmed) {
          this._ques.deleteQuestion(qid).subscribe((data)=>{
            this._snack.open('Success :), Question Deleted Successfully !!', '', {
              duration: 3000,
            })
            this.questions = this.questions.filter((question)=> question.quesId != qid);
          }, (error)=>{
            this._snack.open('Error in Deleting Question :(', '', {
              duration: 3000,
            })
          })

        }
        
      })
    
  }

}
