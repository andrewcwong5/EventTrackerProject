package com.skilldistillery.event.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.event.entities.Meal;
import com.skilldistillery.event.repository.MealRepository;

@Service
public class MealServiceImpl implements MealService {

	@Autowired
	private MealRepository repo;
	
	@Override
	public List<Meal> listAllMeals() {
		return repo.findAll();
	}

	@Override
	public Meal getMeal(int id) {
		Meal meal = null;
		// TODO use findById, check optional.isPresent(), then optional 
		Optional<Meal> opt = repo.findById(id);
		if (opt.isPresent()) {
			meal = opt.get();
		}
		return meal;
	}

	@Override
	public Meal addMeal(Meal meal) {
		Meal opt = repo.saveAndFlush(meal);
		return opt;
	}

	@Override
	public Meal update(int id, Meal meal) {
		repo.flush();
		return null;
	}

	@Override
	public boolean deleteMeal(int id) {
		repo.deleteById(id);
		return false;
	}

}
