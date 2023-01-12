import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: any = [

  ]

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      id: ''
    },
  };
  constructor(private _cat: CategoryService, private _q: QuizService) { }

  ngOnInit(): void {

    this._cat.categories().subscribe((data) => {
      // console.log(data);
      this.categories = data;

    },
      (error) => {
        Swal.fire("Error !!", "Error in Loading data from Server", 'error');
      })
  }

  // add quiz
  public addQuiz() {
    this._q.addQuiz(this.quizData).subscribe((data) => {
      Swal.fire('Success :) ', 'Successfully Added New Quiz', 'success');
      this.quizData = {
        title: '',
        description: '',
        maxMarks: '',
        numberOfQuestions: '',
        active: true,
        category: {
          id: ''
        },
      }
    },
      (error) => {
        Swal.fire("Error :(", 'Internal Server Error', 'error');
      })
  }

}
