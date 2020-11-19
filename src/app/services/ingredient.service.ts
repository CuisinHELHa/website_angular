import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IngredientDTO, IngredientList} from '../DTOs/ingredient-dto';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private static URL = '/api/ingredients/';

  constructor(private http: HttpClient) {

  }

  query(): Observable<IngredientList> {
    return this.http.get<IngredientList>(environment.apiUrl + IngredientService.URL);
  }

  queryRecipeId(id: number): Observable<IngredientList> {
    return this.http.get<IngredientList>(environment.apiUrl + IngredientService.URL + 'recipe=' + id);
  }

  post(ingredient: IngredientDTO): Observable<IngredientDTO> {
    console.log('post');
    return this.http.post<IngredientDTO>(environment.apiUrl + IngredientService.URL, ingredient);
  }

  postToRecipe(ingredient: IngredientDTO): Observable<IngredientDTO> {
    console.log('postToRecipe');
    return this.http.post<IngredientDTO>(environment.apiUrl + IngredientService.URL + 'recipe', ingredient);
  }

  put(ingredient: IngredientDTO): Observable<any> {
    return this.http.put(environment.apiUrl + IngredientService.URL, ingredient);
  }

  putInRecipe(ingredient: IngredientDTO): Observable<any> {
    return this.http.put(environment.apiUrl + IngredientService.URL + 'recipe', ingredient);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${IngredientService.URL}/${id}`);
  }

  deleteFromRecipe(idRecipe: number, idIngredient: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${IngredientService.URL}/recipe=${idRecipe}/ingredient=${idIngredient}`);
  }
}
