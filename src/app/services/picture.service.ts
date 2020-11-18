import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PictureDTO, PictureList} from '../DTOs/picture-dto';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private static URL = '/api/pictures';

  constructor(public http: HttpClient) {
  }

  query(): Observable<PictureList> {
    return this.http.get<PictureList>(PictureService.URL);
  }

  post(ingredient: PictureDTO): Observable<PictureDTO> {
    return this.http.post<PictureDTO>(PictureService.URL, ingredient);
  }

  put(picture: PictureDTO): Observable<any> {
    return this.http.put(PictureService.URL, picture);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${PictureService.URL}/${id}`);
  }
}
