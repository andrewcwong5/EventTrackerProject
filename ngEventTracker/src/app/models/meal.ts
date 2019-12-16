export class Meal {

  id: number;
  name: string;
  foods: string;
  calories: number;
  cost: number;


  // Constructors

  constructor(id?: number, name?: string, foods?: string, calories?: number, cost?: number) {
    this.id = id;
    this.name = name;
    this.foods = foods;
    this.calories = calories;
    this.cost = cost;
  }
}
