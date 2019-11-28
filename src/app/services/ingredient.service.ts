import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IngredientDTO, IngredientList} from "../DTOs/ingredient-dto";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private static URL:string = "/api/ingredients";

  constructor(public http:HttpClient) { }

  query() : Observable<IngredientList>{
    return this.http.get<IngredientList>(IngredientService.URL);
  }

  post(ingredient: IngredientDTO): Observable<IngredientDTO>{
    return this.http.post<IngredientDTO>(IngredientService.URL, ingredient);
  }

  put(ingredient: IngredientDTO): Observable<any>{
    return this.http.put(IngredientService.URL, ingredient);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${IngredientService.URL}/${id}`);
  }
}
