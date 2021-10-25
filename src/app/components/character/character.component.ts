import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ICharacter } from '../../interfaces/character';
import { HttpClientService } from '../../services/http-client.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit, OnDestroy, OnChanges {
  @Input() characterDetails: ICharacter;
  @Output() characterPrinted = new EventEmitter();

  private characterListBackup = [];

  private subs = new Subscription();

  constructor(private _httpService: HttpClientService) {}

  ngOnChanges() {
    this.subs.add(
      this._httpService.charactersList.subscribe((response) => {
        sessionStorage.setItem('characterListBackup', JSON.stringify(response));
      })
    );
  }

  ngOnInit() {
    this.characterListBackup = JSON.parse(
      sessionStorage.getItem('characterListBackup')
    );
  }

  clearCharacter(character: any) {
    character = this.characterListBackup.filter((item: any) => {
      return item.id === character.id;
    })[0];

    this.characterDetails.location.name = character.location.name;
  }

  printCharacter(characterDetails: any) {
    this.characterPrinted.emit(characterDetails);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
