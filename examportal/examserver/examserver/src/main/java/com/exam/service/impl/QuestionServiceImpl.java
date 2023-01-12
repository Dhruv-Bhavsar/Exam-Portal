package com.exam.service.impl;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.repo.QuestionRepository;
import com.exam.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class QuestionServiceImpl implements QuestionService {


    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question q) {
        return this.questionRepository.save(q);
    }

    @Override
    public Question updateQuestion(Question q) {
        return this.questionRepository.save(q);
    }

    @Override
    public Set<Question> getQuestions() {
        return new HashSet<>(this.questionRepository.findAll());
    }

    @Override
    public Question getQuestion(Long quesId) {
        return this.questionRepository.findById(quesId).get();
    }

    @Override
    public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
        return this.questionRepository.findByQuiz(quiz);
    }

    @Override
    public void deleteQuestion(Long quesId) {
        Question ques = new Question();
        ques.setQuesId(quesId);
        this.questionRepository.delete(ques);
    }

    @Override
    public Question get(Long quesId) {
        return this.questionRepository.getOne(quesId);
    }


}
