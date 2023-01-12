import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qId = 0;
  constructor(private _route: ActivatedRoute, private _q : QuizService, private _cat: CategoryService, private _router: Router) { }
  
  categories: any = []
  quiz:any;

  ngOnInit(): void {

    this._cat.categories().subscribe((data) => {
      // console.log(data);
      this.categories = data;

    },
      (error) => {
        Swal.fire("Error !!", "Error in Loading data from Server", 'error');
      })



    this.qId = this._route.snapshot.params['qid'];
    // alert(this.qId);

    this._q.getQuiz(this.qId).subscribe((data)=>{
      this.quiz = data;
      console.log(this.quiz);
      
    },
    (error)=>{
      console.log(error);
      
    })
  }

  // update Quiz
  public updateQuiz() {
    this._q.updateQuiz(this.quiz).subscribe((data)=>{
      Swal.fire('Updated Successfully :)', '!!', 'success').then((e)=>{
        this._router.navigate(['/admin/quizzes']);
      });
    },
    (error)=>{
      Swal.fire("Error :(", 'Error in Updating into DB', 'error');
      console.log(error);
      
    })
  }

}
