import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any
  constructor(private quiz: QuizService) { }

  ngOnInit() : void {

    this.quiz.quizzes().subscribe((data)=>{
      this.quizzes = data;
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!", 'Error in Loading Data from DB', 'error');
      
    })
  }

  // delete quiz
  public deleteQuiz(id: any) {


    Swal.fire({
      icon:'info',
      title:'Are you sure you want to delete this Quiz ?',
      confirmButtonText:'Delete',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed) {
        // delete quiz
        this.quiz.deleteQuiz(id).subscribe((data)=>{
          this.quizzes = this.quizzes.filter((quiz:any)=>quiz.qid != id);
          Swal.fire("Success :)", 'Quiz Deleted successfully', 'success');
        },
        (error)=>{
          Swal.fire("Error !!", 'Internal Server Error', 'error');
        }) 
      } 
    })


    
  }

}
