import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { HttpClientService } from '../../services/http-client.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit, OnDestroy {
  public characters: any;

  private subs = new Subscription();

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getCharacters();
  }

  getCharacters() {
    this.subs.add(
      this.http.getAllCharacters().subscribe((characters) => {
        this.characters = characters;
        this.characters = this.characters?.results;
      })
    );
  }

  showCharacterPrinted(character: any) {
    console.log(character);
  }

  cleanCharacter() {
    console.log('Test');
    this.characters = this.characters;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
