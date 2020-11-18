import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PictureDTO, PictureList} from '../DTOs/picture-dto';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private static URL = '/api/pictures';

  constructor(public http: HttpClient) {
  }

  query(): Observable<PictureList> {
    return this.http.get<PictureList>(environment.apiUrl + PictureService.URL);
  }

  post(ingredient: PictureDTO): Observable<PictureDTO> {
    return this.http.post<PictureDTO>(environment.apiUrl + PictureService.URL, ingredient);
  }

  put(picture: PictureDTO): Observable<any> {
    return this.http.put(environment.apiUrl + PictureService.URL, picture);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${PictureService.URL}/${id}`);
  }
}
