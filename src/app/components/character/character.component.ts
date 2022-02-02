import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

import { ICharacter } from '../../interfaces/character';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit, OnDestroy {
  @Input() characterDetails: ICharacter;
  @Output() characterPrinted = new EventEmitter();

  private characterListBackup = [];

  constructor(private _charactersService: CharactersService) {}

  ngOnInit() {
    this.characterListBackup = this._charactersService.getDataFromLocal(
      'characterListBackup'
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
    alert(characterDetails.name);
  }

  ngOnDestroy() {}
}
