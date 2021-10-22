import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { HttpClientService } from '../../services/http-client.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit, OnDestroy {
  public characters: any;

  private subs = new Subscription();

  constructor(private _httpService: HttpClientService) {}

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this._httpService.getAllCharacters();

    this.subs.add(
      this._httpService.charactersList.subscribe((characters) => {
        this.characters = characters;
      })
    );
    
  }

  showCharacterPrinted(character: any) {
    console.log(character);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
