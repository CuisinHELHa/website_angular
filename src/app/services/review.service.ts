import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReviewDTO, ReviewList} from '../DTOs/review-dto';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private static URL = '/api/reviews/';

  constructor(public http: HttpClient) {
  }

  query(): Observable<ReviewList> {
    return this.http.get<ReviewList>(environment.apiUrl + environment.apiUrl + ReviewService.URL);
  }

  queryByRecipe(id: number): Observable<ReviewList> {
    return this.http.get<ReviewList>(environment.apiUrl + ReviewService.URL + 'recipe=' + id);
  }

  queryUser(id: number): Observable<ReviewList> {
    return this.http.get<ReviewList>(environment.apiUrl + ReviewService.URL + 'user=' + id);
  }

  queryAvgByRecipe(id: number): Observable<number> {
    return this.http.get<number>(environment.apiUrl + ReviewService.URL + 'average/' + id);
  }

  post(review: ReviewDTO): Observable<ReviewDTO> {
    return this.http.post<ReviewDTO>(environment.apiUrl + ReviewService.URL, review);
  }

  put(review: ReviewDTO): Observable<any> {
    return this.http.put(environment.apiUrl + ReviewService.URL, review);
  }

  delete(idUser: number, idRecipe: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${ReviewService.URL}${idUser}/${idRecipe}`);
  }
}
