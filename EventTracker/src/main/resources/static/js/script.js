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
//	 resolve events into tables on main page
	document.allMeals.meals.addEventListener('click', function(e) {
		event.preventDefault();
		console.log("getting meals");
		getMeals();
	});
	
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
	xhr.open('GET', 'api/meal', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var meals = JSON.parse(xhr.responseText)
			console.log(meals);
			displayMeals(meals);
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.repsonseText);
		}
	};
	xhr.send(null);
	
}
function displayMeals(meals) {
	let dataDiv = document.getElementById('mealData');
	dataDiv.textContent = '';
	
	let title = document.createElement('h1');
	title.textContent = "All Meals";
	dataDiv.appendChild(title);
	
	let table = document.createElement('table');
	table.textContent = "Meals";
	dataDiv.appendChild(table);
	
	for (i = 0; i < meals.length; i++) {
		let tableRow = document.createElement('tr');
		table.appendChild(tableRow);
		let tableData0 = document.createElement('td');
		let tableData1 = document.createElement('td');
		let tableData2 = document.createElement('td');
		let tableData3 = document.createElement('td');
		tableData0.textContent = 'Meal Name: ' + meals[i].name;
		tableData1.textContent = 'Foods: ' + meals[i].foods;
		tableData2.textContent = 'Calories: ' + meals[i].calories;
		tableData3.textContent = 'Cost: ' + meals[i].cost;
		tableRow.appendChild(tableData0);
		tableRow.appendChild(tableData1);
		tableRow.appendChild(tableData2);
		tableRow.appendChild(tableData3);
	}
			
//	let mealsDiv = document.getElementById("meals");
//	let ul = document.createElement("ul");
//	for (let i =0; i < meals.length; i ++) {
//		let li = document.createElement('li');
//		let e = meals[i];
//		li.textContent = e.id + " " + e.name;
//		ul.appendChild(li);
//	}
//	mealsDiv.appendChild(ul);
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
	calories.textContent = 'Calories: ' + meal.calories;
	
	let cost = document.createElement('li');
	dataDiv.appendChild(cost);
	cost.textContent = meal.cost;
	
	// Delete Button
	let deleteForm = document.createElement('form');
	dataDiv.appendChild(deleteForm);
	let deleteButton = document.createElement('button');
	dataDiv.appendChild(deleteButton);
	deleteButton.name = 'Delete';
	deleteButton.textContext = 'Delete';
	deleteButton.addEventListener('click', function(event) {
		event.preventDefault();
		deleteMeal(meal.id);
	});
	
	// Update Button
	let updateForm = document.createElement('form');
	dataDiv.appendChild(updateForm);
	var updateButton = document.createElement('button');
	dataDiv.appendChild(updateButton);
	updateButton.name = 'update';
	updateButton.textContent = 'Update';
	updateButton.addEventListener('click', function(event) {
		event.preventDefault();
		updateMeal(meal);
	});
	
//	dataDiv.appendChild(deleteMeal);
//	dataDiv.appendChild(updateMeal);
//	
//	deleteMeal.addEventListener('click', function(e) {
//		console.log('delete button clicked');
//		console.log(meal.id);
//		deleteMeal(meal.id);
//	})
//	updateMeal.addEventListener('click', function(e) {
//		console.log('update clicked');
//		updateMeal(meal, meal.id);
//	})
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