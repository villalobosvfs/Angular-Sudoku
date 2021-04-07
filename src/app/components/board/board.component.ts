import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Square } from '../../models/square';
import { Board } from '../../models/board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;
  @Output() square: EventEmitter<Square> = new EventEmitter();
  @Output() key: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClick(event: Square) {
    this.square.emit(event);
  }

  onKeyPress(event: number) {
    this.key.emit(event);
  }
}
