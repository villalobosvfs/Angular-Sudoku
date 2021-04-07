import { Location } from './location';

export class Square {
  id: string;
  location: Location;
  index: number;
  value: number;
  userValue: number;
  display: string;
  notes: number[] = [];
  highlight: boolean;
  hightlightNotes: boolean;
  selected: boolean;
  show: boolean;
  hide: boolean;
  error: boolean;
  disable: boolean;
  key: boolean;

  constructor(n: number, loc: Location, hide: boolean) {
      this.value = n;
      this.location = loc;
      this.hide = hide;
      this.error = false;
      this.selected = false;
      this.highlight = false;
      this.show = false;

      this.display = hide ? '' : n.toString();
  }

  copy() {
      const sqr: Square = new Square(this.value, this.location, this.hide);

      sqr.index = this.index;
      sqr.id = this.id;
      sqr.userValue = this.userValue;
      sqr.display = this.display;
      sqr.notes = this.notes;
      sqr.highlight = this.highlight;
      sqr.selected = this.selected;
      sqr.show = this.show;
      sqr.error = this.error;
      sqr.notes = this.notes.length > 0 ? this.notes : [];
      sqr.disable = this.disable;

      return sqr;
  }

  compare(sqr: Square) {

    if (JSON.stringify(this) !== JSON.stringify(sqr)) {
      return false;
    }

    return true;
  }

  update(sqr: Square) {
    this.value = sqr.value;
    this.location = sqr.location;
    this.hide = sqr.hide;
    this.index = sqr.index;
    this.id = sqr.id;
    this.userValue = sqr.userValue;
    this.display = sqr.display;
    this.notes = sqr.notes;
    this.highlight = sqr.highlight;
    this.selected = sqr.selected;
    this.show = sqr.show;
    this.error = sqr.error;
    this.notes = sqr.notes.length > 0 ? this.notes : [];
    this.disable = sqr.disable;
  }

  addNotes(num: number) {
      const f = this.notes.findIndex(x => x === num);

      if (f < 0) {
        this.notes.push(num);
      } else {
        this.notes.splice(f, 1);
      }

      this.notes.sort();

      this.display = this.notes.join(' ');
  }

  addUserValue(num: number) {
      this.error = false;
      this.userValue = num;
      this.display = num.toString();
      this.notes = [];

      if (num !== this.value) {
          this.error = true;
        }
  }
}
