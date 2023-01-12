package com.exam.service;

import com.exam.model.exam.Category;
import com.exam.model.exam.Quiz;

import java.util.List;
import java.util.Set;

public interface QuizService {

    public Quiz addQuiz(Quiz q);


    public Quiz updateQuiz(Quiz q);

    public Set<Quiz> getQuizzes();

    public Quiz getQuiz(Long qid);

    public void deleteQuiz(Long qid);

    public List<Quiz> getQuizzesOfCategory(Category category);

    public List<Quiz> getActiveQuizzes();

    public List<Quiz> getActiveQuizzesOfCategory(Category c);
}
