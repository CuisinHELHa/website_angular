import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IngredientDTO, IngredientList} from "../DTOs/ingredient-dto";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private static URL:string = "/api/ingredients/";

  constructor(private http:HttpClient) {

  }

  query(): Observable<IngredientList> {
    return this.http.get<IngredientList>(IngredientService.URL);
  }


  queryRecipeId(id:number) : Observable<IngredientList>{
    return this.http.get<IngredientList>(IngredientService.URL + "recipe=" + id);
  }

  post(ingredient: IngredientDTO): Observable<IngredientDTO>{
    return this.http.post<IngredientDTO>(IngredientService.URL, ingredient);
  }

  postToRecipe(ingredient: IngredientDTO): Observable<IngredientDTO>{
      return this.http.post<IngredientDTO>(IngredientService.URL+"recipe", ingredient);
  }

  put(ingredient: IngredientDTO): Observable<any>{
      return this.http.put(IngredientService.URL, ingredient);
  }
  putInRecipe(ingredient: IngredientDTO): Observable<any>{
      return this.http.put(IngredientService.URL+"recipe", ingredient);
  }

  delete(id: number): Observable<any>{
      return this.http.delete(`${IngredientService.URL}/${id}`);
  }

  deleteFromRecipe(idRecipe: number, idIngredient: number): Observable<any>{
      return this.http.delete(`${IngredientService.URL}/recipe=${idRecipe}/ingredient=${idIngredient}`);;
  }
}
