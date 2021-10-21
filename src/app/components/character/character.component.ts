import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
export class CharacterComponent implements OnInit {
  @Input() characterDetails: ICharacter;
  @Output() characterPrinted = new EventEmitter();
  @Output() characterCleaned = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  clearLocation(characterDetails: any) {
    this.characterCleaned.emit(true);
  }

  printCharacter(characterDetails: any) {
    this.characterPrinted.emit(characterDetails);
  }
}
