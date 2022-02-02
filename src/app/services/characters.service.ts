import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private baseApiUrl = 'https://rickandmortyapi.com/api/character';

  public charactersList = new BehaviorSubject<any>([]);

  constructor(private _httpClient: HttpClient) {}

  getAllCharacters() {
    return this._httpClient
      .get(this.baseApiUrl)
      .pipe(
        map((response) => {
          return response['results'];
        })
      )
      .subscribe((response) => {
        this.saveDataInLocal('characterListBackup', response);
        this.charactersList.next(response);
      });
  }

  saveDataInLocal(dataName = '', data = []): void {
    sessionStorage.setItem(dataName, JSON.stringify(data));
  }

  getDataFromLocal(dataName = ''): [] {
    return JSON.parse(sessionStorage.getItem(dataName));
  }
}
