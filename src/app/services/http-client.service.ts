import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private baseApiUrl = 'https://rickandmortyapi.com/api/character';

  public charactersList = new BehaviorSubject<any>([]);

  constructor(private _httpClient: HttpClient) {}

  getAllCharacters() {
    return this._httpClient.get(this.baseApiUrl).subscribe((response) => {
      this.charactersList.next(response['results']);
    });
  }
}
