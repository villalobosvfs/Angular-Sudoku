import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Square } from '../../models/square';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Output() output: EventEmitter<Square> = new EventEmitter();
  @Output() key: EventEmitter<number> = new EventEmitter();
  @Input() square: Square;
  @Input() index: number;
  section: boolean;

  constructor() {
  }

  ngOnInit() {
    this.square.index = this.index;
    this.square.id = 'square' + this.index.toString();

    this.setSections();

    if (this.square.hide) {
      if (this.square.userValue) {
        this.square.display = this.square.userValue.toString();
      } else {
        this.square.display = this.square.notes ? this.square.notes.join(' ') : '';
      }
    } else {
      this.square.display = this.square.value ? this.square.value.toString() : '';
    }
  }

  onKeyPress(event) {

    if (event && event.key) {
      const n: string = event.key;

      switch (n.toLowerCase()) {
        case 'u':
          this.key.emit(0);
          break;
        case 'delete':
          this.key.emit(-1);
          break;
        case 'n':
          this.key.emit(-2);
          break;
        case 'arrowright':
          this.key.emit(-3);
          break;
        case 'arrowleft':
          this.key.emit(-4);
          break;
        case 'arrowup':
          this.key.emit(-5);
          break;
        case 'arrowdown':
          this.key.emit(-6);
          break;
        default:
          if (n.charCodeAt(0) >= 49 && n.charCodeAt(0) <= 57) {
            this.key.emit(parseInt(n, 10));
          }
          break;
      }
    }
  }

  setSections() {
    const x = this.square.location.xCoord;
    const y = this.square.location.yCoord;

    if (x < 3 && y < 3) {
      this.section = true;
    }

    if (x < 3 && y > 5) {
      this.section = true;
    }

    if (x > 2 && x < 6 && y > 2 && y < 6) {
      this.section = true;
    }

    if (x > 5 && y < 3) {
      this.section = true;
    }

    if (x > 5 && y > 5) {
      this.section = true;
    }
  }

  onClick() {
    this.square.selected = !this.square.selected;
    this.output.emit(this.square);
  }

  getClass() {
    let key = '';
    const ret = {
      number: false
    };

    if (this.square.notes.length <= 0) {
      ret.number = this.square.show;
    }

    if (this.section) {
      key = 'section';
      ret[key] = true;
    }

    if (this.square.hightlightNotes) {
      key = 'highlightNotes';
      ret[key] = true;
    }

    if (this.square.error) {
      key = 'error';
      ret[key] = true;
    }

    if (this.square.highlight) {
      key = 'highlight';
      ret[key] = true;
    }

    if (this.square.selected) {
      key = 'selected';
      ret[key] = true;
    }

    if (this.square.notes.length > 0) {
      key = 'notes';
      ret[key] = true;
    }

    return ret;
  }
}
