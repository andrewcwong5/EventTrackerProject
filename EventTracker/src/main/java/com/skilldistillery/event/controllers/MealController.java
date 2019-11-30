package com.skilldistillery.event.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.event.entities.Meal;
import com.skilldistillery.event.services.MealService;

@RestController
@RequestMapping("api")
public class MealController {

	@Autowired
	private MealService svc;
	
	@GetMapping ("/film")
	List<Meal> all() {
		return svc.listAllMeals();
	}
}
