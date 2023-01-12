package com.exam.service;

import com.exam.model.exam.Category;
import com.exam.repo.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

public interface CategoryService {

    public Category addCategory(Category category);

    public Category updateCategory(Category category);

    public Set<Category> getCategories();

    public void deleteCategory(Long categoryId);

    public Category getCategory(Long categoryId);
}
