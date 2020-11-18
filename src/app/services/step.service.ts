import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StepDTO, StepList} from '../DTOs/step-dto';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private static URL = '/api/steps/';

  constructor(public http: HttpClient) {
  }

  query(): Observable<StepList> {
    return this.http.get<StepList>(StepService.URL);
  }

  queryByRecipe(id: number): Observable<StepList> {
    return this.http.get<StepList>(StepService.URL + id);
  }

  post(step: StepDTO): Observable<StepDTO> {
    return this.http.post<StepDTO>(StepService.URL, step);
  }

  put(step: StepDTO): Observable<any> {
    return this.http.put(StepService.URL, step);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${StepService.URL}/${id}`);
  }
}
