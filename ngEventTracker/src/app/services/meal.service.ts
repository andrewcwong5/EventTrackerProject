import { Meal } from 'src/app/models/meal';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  // Fields

  private baseUrl = 'http://localhost:8082/';
    private url = this.baseUrl + 'api/meal';

  // Constructor
  constructor(private http: HttpClient) { }

  // Methods

    // Gets
  index() {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.get<Meal[]>(this.url, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('MealService.index(): Error retrieving meals');
      })
    );
  }
  showOne(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
      })
    };
    return this.http.get<Meal>(this.url + '/' + id, httpOptions).pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError('Meal update error');
      })
    );
  }
    show(id): Observable<Meal> {
    return this.http.get<Meal>(this.url + '/' + id);
  }

    // Create/Post
  create(data: Meal) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<Meal>(this.url, data, httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('create failed');
      })
    );
  }
    // Update
  update(id: number, data: Meal) {
    console.log('in update');
    console.log(data);
    const httpOptions = { };
    return this.http.put<Meal>(this.url + '/' + id, data, httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('update failed');
      })
    );
  }
    // Delete
  destroy(id: number) {
    const httpOptions = { };
    return this.http.delete<Meal>(this.url + '/' + id, httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('update failed');
      })
    );
  }
}
