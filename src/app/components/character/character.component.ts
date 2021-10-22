import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { HttpClientService } from '../../services/http-client.service';

interface ICharacter {
  name: any;
  image: any;
  location: any;
}

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit, OnDestroy {
  @Input() characterDetails: ICharacter;
  @Output() characterPrinted = new EventEmitter();

  private subs = new Subscription();

  constructor(private _httpService: HttpClientService) {}

  ngOnInit() {
    this.subs.add(
      this._httpService.charactersList.subscribe((response) => {
        sessionStorage.setItem('characterListBackup', JSON.stringify(response));
      })
    );
  }

  clearCharacter(character: any) {
    const characterListBackup = JSON.parse(
      sessionStorage.getItem('characterListBackup')
    );
    character = characterListBackup.filter((item: any) => {
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
