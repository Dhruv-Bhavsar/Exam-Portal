import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId: any;
  quizzes: any;
  quizzesByCategory: any;
  constructor(private _route: ActivatedRoute, private _quiz: QuizService) { }

  ngOnInit(): void {

    this.catId = this._route.snapshot.params['catId'];

    this._route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        // load all quizzes
        this._quiz.getActiveQuizzes().subscribe((data) => {
          console.log(data);
          this.quizzes = data;
        }, (error) => {
          console.log(error);
          alert("error in loading quizzes from server");

        })
      } else {
        console.log(this.catId);
        
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data)=>{
          this.quizzes = data;
        }, (error)=>{
          console.log(error);
          alert('error in loading quizzes from server');
          
        })
      }
    })



  }

}
