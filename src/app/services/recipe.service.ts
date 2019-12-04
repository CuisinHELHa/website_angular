import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RecipeDTO, RecipeList} from "../DTOs/recipe-dto";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private static search:string = "";
  private static URL:string = "/api/recipes/";

  constructor(public http:HttpClient) { }

  query() : Observable<RecipeList>{
    return this.http.get<RecipeList>(RecipeService.URL);
  }

  queryPseudo(): Observable<RecipeList>{
    return this.http.get<RecipeList>(RecipeService.URL + "pseudo");
  }

  queryText(text:string): Observable<RecipeList>{
    text.replace(" ", "_");
    return this.http.get<RecipeList>(RecipeService.URL + "text=" + text);
  }

  queryId(id:number): Observable<RecipeList>{
    return this.http.get<RecipeList>(RecipeService.URL + "id=" +id);
  }

  post(ingredient: RecipeDTO): Observable<RecipeDTO>{
    return this.http.post<RecipeDTO>(RecipeService.URL, ingredient);
  }

  put(ingredient: RecipeDTO): Observable<any>{
    return this.http.put(RecipeService.URL, ingredient);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${RecipeService.URL}/${id}`);
  }
}
