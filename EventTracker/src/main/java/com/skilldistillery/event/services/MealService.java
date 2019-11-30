package com.skilldistillery.event.services;

import java.util.List;

import com.skilldistillery.event.entities.Meal;

public interface MealService {
	List<Meal> listAllMeals();
	Meal getMeal(int id);
	Meal addMeal(Meal meal);
	Meal update(int id, Meal meal);
	boolean deleteMeal(int id);
}
