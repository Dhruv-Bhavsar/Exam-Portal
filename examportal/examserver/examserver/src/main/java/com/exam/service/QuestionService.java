package com.exam.service;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

import java.util.Set;

public interface QuestionService {

    public Question addQuestion(Question q);

    public Question updateQuestion(Question q);

    public Set<Question> getQuestions();

    public Question getQuestion(Long quesId);

    public Set<Question> getQuestionsOfQuiz(Quiz quiz);

    public void deleteQuestion(Long quesId);

    public Question get(Long quesId);

}
