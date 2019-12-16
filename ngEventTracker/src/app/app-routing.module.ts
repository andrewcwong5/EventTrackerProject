import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MealComponent } from './components/meal/meal.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
{path: 'meals', component: MealComponent},
{path: 'home', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
