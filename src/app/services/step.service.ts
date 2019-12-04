import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StepDTO, StepList} from "../DTOs/step-dto";

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private static URL:string = "/api/steps/";

  constructor(public http:HttpClient) { }

  query() : Observable<StepList>{
    return this.http.get<StepList>(StepService.URL);
  }

  queryByRecipe(id: number) : Observable<StepList>{
    return this.http.get<StepList>(StepService.URL + id);
  }

  post(ingredient: StepDTO): Observable<StepDTO>{
    return this.http.post<StepDTO>(StepService.URL, ingredient);
  }

  put(ingredient: StepDTO): Observable<any>{
    return this.http.put(StepService.URL, ingredient);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${StepService.URL}/${id}`);
  }
}
