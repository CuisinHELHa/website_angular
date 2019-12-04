import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ReviewDTO, ReviewList} from "../DTOs/review-dto";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private static URL: string = "/api/reviews";

  constructor(public http: HttpClient) {
  }

  query(): Observable<ReviewList> {
    return this.http.get<ReviewList>(ReviewService.URL);
  }

  post(ingredient: ReviewDTO): Observable<ReviewDTO> {
    return this.http.post<ReviewDTO>(ReviewService.URL, ingredient);
  }

  put(ingredient: ReviewDTO): Observable<any> {
    return this.http.put(ReviewService.URL, ingredient);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${ReviewService.URL}/${id}`);
  }
}
