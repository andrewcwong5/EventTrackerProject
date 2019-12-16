import { MealService } from './../../services/meal.service';
import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { subscribeOn } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({

  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  // Field
  title: 'Meal Tracker';
  newMeal: Meal = new Meal();
  meals: Meal[] = [];
  selectedMeal: Meal = null;
  editMeal: Meal = null;


  // Constructor
  constructor(private mealService: MealService, private route: ActivatedRoute, private router: Router) { }

  // Methods
  ngOnInit() {
    if (!this.selectedMeal && this.route.snapshot.paramMap.get('id')) {
      this.mealService.showOne(this.route.snapshot.paramMap.get('id')).subscribe(
        data => {
          this.selectedMeal = data;
          if (this.selectedMeal === null) {
            this.router.navigateByUrl('todo' + this.route.snapshot.paramMap.get('id') + 'NotFound');
          }
        },
        err => console.error('failed to find a single todo')
      );
    }
    this.reload();
  }
  getMeals() {
    this.mealService.index().subscribe(
      data => {
        this.meals = data;
      },
      err => {
        console.error(err);
      }
    );
  }
  // displaySelected(mid: number) {
  //   this.mealService.showOne(mid).subscribe(
  //     data => {
  //       this.selectedMeal = data;
  //     },
  //     err => {
  //       console.error(err);
  //     }
  //   );
  // }

  numberOfMeals() {

  }

  badgeColor(): string {
    const incompleteTodoCount = this.numberOfMeals();
    // if (this.numberOfMeals >= 10) {
    //   return 'badge-danger';
    // }
    // if (this.numberOfMeals >= 5) {
    //   return 'badge-warning';
    // }
    return 'badge-success';
   }

  addMeal() {
    this.mealService.create(this.newMeal).subscribe(
      data => {
        console.log(data);
        this.reload();
        this.newMeal = new Meal();
    },
      err => {
        console.error(err);
      }
    );
    this.reload();
  }

  updateMeal() {
    this.mealService.update(this.selectedMeal.id, this.selectedMeal).subscribe(
      data => {
        console.log(data);
        this.reload();
      },
      err => {
        console.error(err);
      }
    );
    this.reload();
  }

  deleteMeal(id: number) {
    this.mealService.destroy(id).subscribe(
      data => {
        console.log(data);
        this.reload();
      },
        err => {
          console.error(err);
        }
    );
  }
   reload() {
    this.mealService.index().subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.meals = aGoodThingHappened;
      },

      (didntWork) => {
        console.log(didntWork);
      }
    );
  }
}
