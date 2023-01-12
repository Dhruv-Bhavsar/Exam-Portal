package com.exam.controller;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;
    // add question
    @PostMapping("/")
    public ResponseEntity<?> addQuestion(@RequestBody Question q) {
        return ResponseEntity.ok(this.questionService.addQuestion(q));
    }

    // update question
    @PutMapping("/")
    public ResponseEntity<?> updateQuestion(@RequestBody Question q) {
        return ResponseEntity.ok(this.questionService.updateQuestion(q));
    }

    // get all questions of any quiz
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestions(@PathVariable("qid")Long qid) {
//        Quiz quiz = new Quiz();
//        quiz.setQid(qid);
//        Set<Question> questionOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
//
//        return ResponseEntity.ok(questionOfQuiz);

        Quiz quiz = this.quizService.getQuiz(qid);
        Set<Question> questions = quiz.getQuestions();

        List<Question> list = new ArrayList(questions);

        if(list.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()));
        }

        list.forEach((q)->{
            q.setAnswer("");
        });
        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }


    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid")Long qid) {
        Quiz quiz = new Quiz();
        quiz.setQid(qid);
        Set<Question> questionOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);

        return ResponseEntity.ok(questionOfQuiz);


    }


    // get single question
    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId){
        return this.questionService.getQuestion(quesId);
    }

    // delete question
    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") Long quesId) {
        this.questionService.deleteQuestion(quesId);
    }


    // eval Quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) {
        System.out.println(questions);
        double marksGot = 0;
        Integer correctAnswers = 0;
        Integer attempted = 0;
        for(Question q : questions){
            Question question = this.questionService.get(q.getQuesId());
            if(question.getAnswer().equals(q.getGivenAnswer())) {
                // correct
                correctAnswers++;
                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
                marksGot += marksSingle;
            }
            if(q.getGivenAnswer() != null) {
                attempted++;
            }
        }

        Map<String, Object> map = Map.of("marksGot", marksGot, "correctAnswers", correctAnswers, "attempted", attempted);
        return ResponseEntity.ok(map);
    }
}
