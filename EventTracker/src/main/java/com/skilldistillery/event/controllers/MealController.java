package com.skilldistillery.event.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.event.entities.Meal;
import com.skilldistillery.event.services.MealService;

@RestController
@RequestMapping("api")
public class MealController {

	@Autowired
	private MealService svc;
	
	@GetMapping ("/meal")
	List<Meal> all() {
		return svc.listAllMeals();
	}
	@GetMapping ("/meal/{id}")
	public Meal getMeal(@PathVariable int id) {
		return svc.getMeal(id);
	}
	
	@PostMapping ("/meal")
	public Meal create(@RequestBody Meal meal) {
		
		return svc.addMeal(meal);
	}

	// Post PUT api/meal/{id} Replaces an existing post by id
		@PutMapping("meal/{id}")
		public Meal update(
				@PathVariable("id") Integer id,
				@RequestBody Meal newMeal,
				HttpServletResponse resp) {
			try {
				newMeal = svc.update(id, newMeal);
				if (newMeal == null) {
					resp.setStatus(404); //invalid path variable
				}
			} catch (Exception e) {
				
				e.printStackTrace();
				resp.setStatus(400);
				newMeal = null;
			}
			return newMeal;
		}
	
	@DeleteMapping("/meal/{id}")
	  void deleteFilm(@PathVariable Integer id) {
	    svc.deleteMeal(id);
	  }
}
