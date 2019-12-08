import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReviewDTO, ReviewList} from "../DTOs/review-dto";
import {RecipeList} from "@app/DTOs/recipe-dto";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private static URL:string = "/api/reviews/";

  constructor(public http: HttpClient) {
  }

  query(): Observable<ReviewList> {
    return this.http.get<ReviewList>(ReviewService.URL);
  }

  queryByRecipe(id: number) : Observable<ReviewList>{
    return this.http.get<ReviewList>(ReviewService.URL + "recipe="+ id);
  }

  queryUser(id: number): Observable<ReviewList>{
    return this.http.get<ReviewList>(ReviewService.URL + "user="+id);
  }

  queryAvgByRecipe(id: number):Observable<number>{
    return this.http.get<number>(ReviewService.URL+"average/"+id);
  }

  post(review: ReviewDTO): Observable<ReviewDTO>{
    return this.http.post<ReviewDTO>(ReviewService.URL, review);
  }

  put(review: ReviewDTO): Observable<any> {
    return this.http.put(ReviewService.URL, review);
  }

  delete(idUser: number, idRecipe: number): Observable<any> {
    return this.http.delete(`${ReviewService.URL}${idUser}/${idRecipe}`);
  }
}
