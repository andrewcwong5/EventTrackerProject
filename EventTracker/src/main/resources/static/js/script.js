window.addEventListener('load', function(e) {
	console.log("loaded");
	init();
});

function init() {
	// add event listeners to buttons, 
	
	document.form.submit.addEventListener('click', function(e) {
		console.log('submit button clicked');
		event.preventDefault();
		var mealId = document.form.mealId.value;
		if (!isNaN(mealId) && mealId > 0) {
			getMeal(mealId);
		}
		
	});
	// Get all events and display them
	// resolve events into tables on main page
//	document.allMeals.meals.addEventListener('click', function(e) {
//		event.preventDefault();
//		getMeals();
//	});
	
//	 Create button function listener
	document.addMealForm.create.addEventListener('click',function(e) {
		e.preventDefault();
		addNewMeal();
	});
}
function addNewMeal() {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/api/meal/', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var mealObject = JSON.parse(xhr.responseText);
			displayMeal(mealObject);
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText)
		}
	};

	let form = documuent.addMealForm;
	var mealObject = {
			
			name: form.name.value,
			foods: form.foods.value,
			calories: form.calories.value,
			cost: form.cost.value
	};
	//Convert JS object to JSON string
	var mealObjectJson = JSON.stringify(mealObject); 
	xhr.send(mealObjectJson);
};

function getMeal(mealId) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/meal/' + mealId, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var mealObject = JSON.parse(xhr.responseText);
			displayMeal(mealObject);
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
			
			dataDiv.textContent = 'Meal Not Found';
		}
	};
	xhr.send(null);
}
function getMeals() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/meals', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var meals = JSON.parse(xhr.responseText)
			displayMeals(meals);
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.repsonseText);
		}
	};
	xhr.send(null);
}
function displayMeal(meal) {
	var dataDiv = document.getElementById('mealData')
	dataDiv.textContent = '';
	
	let titleH1 = document.createElement('h1');
	dataDiv.appendChild(titleH1);
	titleH1.textContent = meal.name;
	
//	let miscUl = document.createElement('ul');
//	dataDiv.appendChid(miscUl);
	
	let foods = document.createElement('li');
	dataDiv.appendChild(foods);
	foods.textContent = meal.foods;
	
	let calories = document.createElement('li');
	dataDiv.appendChild(calories);
	calories.textContent = meal.calories;
	
	let cost = document.createElement('li');
	dataDiv.appendChild(cost);
	cost.textContent = meal.cost;
	
	dataDiv.appendChild(deleteMeal);
	dataDiv.appendChild(updateMeal);
	
	deleteMeal.addEventListener('click', function(e) {
		console.log('delete button clicked');
		console.log(meal.id);
		deleteMeal(meal.id);
	})
	updateMeal.addEventListener('click', function(e) {
		console.log('update clicked');
		updateMeal(meal, meal.id);
	})
}

function deleteMeal(id) {
	
	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', '/api/meal/' + id, true);
	xhr.onreadystatechange = function() {
		
		if (xhr.readyState === 4 && xhr.status < 400) {
			var ok = JSON.parse(xhr.responseText)
			
			console.log(ok)
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};
	xhr.send(null);
}

function updateMeal(meal, id) {
	console.log('in update meal');
	console.log(meal);
	var xhr = new XMLHttpRequest();
	
	xhr.open('PUT', 'api/meal/' + mealId, true)
	xhr.setRequestHeader("Content-type", "application/json")
	xhr.onreadystatechange = function() {
		
		if (xhr.readyState === 4 && xhr.status < 400) {
			var ok = JSON.parse(xhr.responseText)
			console.log('meal updated')
			console.log(ok)
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
		}
	};
	var mealObj = JSON.stringify(meal);
	xhr.send(mealObj)
}










//	xhr.open('GET', 'http://localhost:8082/api/', true);
//	
//	xhr.onreadystatechange = function() {
//		if (xhr.readyState === 4 && xhr.status < 400) {
//			var data = JSON.parse(xhr.responseText);
//			
//			console.log(data);
//			console.log('success');
//			displayLogs(data);
//		}
//		if (xhr.readyState === 4 && xhr.status >= 400) {
//			console.error(xhr.status + ': ' + xhr.responseText);
//		}
//	};
//	xhr.send(null);
//}