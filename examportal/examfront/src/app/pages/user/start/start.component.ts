import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid: any;
  questions: any;

  timer: any;
  isSubmit = false;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;


  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionService, private _router: Router) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestion();
    
  }
  loadQuestion() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe((data:any)=>{
      // console.log(data);
      this.questions = data;

      this.timer = this.questions.length*2*60;

      // this.questions.forEach((element:any) => {
      //   element['givenAnswer'] = '';
      // });

      console.log(this.questions);
      this.startTimer();
      
    }, (error)=>{
      console.log(error);
      Swal.fire('Error :(', 'Error in loading questions from server', 'error');
    });
  }

  preventBackButton() {
    history.pushState(null, 'null', location.href);
    this.locationSt.onPopState(()=>history.pushState(null, 'null', location.href))
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.evalQuiz();
        
        
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  evalQuiz() {

    // **************************** Evaluate Quiz on Server ***************************

    this._question.evalQuiz(this.questions).subscribe((data:any)=>{
      console.log(data);
      this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers = data.correctAnswers;
      this.attempted = data.attempted;
      
    }, (error)=>{
      console.log(error);
      
    })

    // this._router.navigate(['user-dashboard/0']);

    // **************************** Evaluate Quiz on Browser ***************************

    this.isSubmit = true;
    //     this.questions.forEach((q:any)=>{
    //       if(q.givenAnswer == q.answer) {
    //         this.correctAnswers++;
    //         let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //         this.marksGot += marksSingle;
    //       }
    //       if(q.givenAnswer.trim() != '') {
    //         this.attempted++;
    //       }
    //     })

    //     console.log('correct answers: ' + this.correctAnswers);
    //     console.log('marks got: ' + this.marksGot);
    //     console.log('attempted: ' + this.attempted);
        
    //     console.log(this.questions);
  }


  startTimer() {
    let t = window.setInterval(()=>{
      if(this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else{
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let d = this.timer;
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs: ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins: ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
    return hDisplay + mDisplay + sDisplay;
  }


  public printPage() {
    window.print();
  }

}
