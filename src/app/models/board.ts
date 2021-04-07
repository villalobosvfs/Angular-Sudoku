import { Sudoku } from './sudoku';
import { Square } from './square';
import { Location } from './location';

export class Board {
  squares: Square[];
  grid: number[][];
  selected: Square;
  level: number;
  notes: boolean;
  disabled: boolean;

  constructor(level?: number) {

    if (level >= 0) {
      this.level = level;
      this.notes = false;
      this.squares = Sudoku.Generate(level);
    }
  }

  copy() {
    const board: Board = new Board(-1);

    if (this.selected) {
      board.selected = this.selected.copy();
    }

    board.squares = [];
    this.squares.forEach(n => {
      board.squares.push(n.copy());
    });

    board.level = this.level;
    board.notes = this.notes;
    board.disabled = this.disabled;

    return board;
  }

  checkStatus() {
    const status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.squares.forEach(x => {
      if (!x.hide && x.value && x.value > 0) {
        status[0]++;
        status[x.value]++;
      }

      if (x.userValue && x.userValue === x.value && !x.error) {
        status[0]++;
        status[x.userValue]++;
      }
    });

    if (status[0] === 81) {
      // Game Completed
      this.disable();
    } else {
      if (this.disabled) {
        this.enable();
      }
    }

    return status;
  }

  disable() {
    this.squares.forEach(x => x.disable = true);
    this.disabled = true;
  }

  enable() {
    this.squares.forEach(x => x.disable = false);
    this.disabled = false;
  }

  erase() {
    if (this.selected && this.selected.hide) {
      this.clearHightlight();
      this.selected.userValue = undefined;
      this.selected.error = false;
      this.selected.notes = [];
      this.selected.display = '';

      this.squares[this.selected.index].userValue = undefined;
      this.squares[this.selected.index].error = false;
      this.squares[this.selected.index].notes = [];
      this.squares[this.selected.index].display = '';

    }
  }

  toggleSelected(event: Square) {

    if (this.selected) {
      if (this.selected.index !== event.index) {
        this.clearHightlight();
        this.clearSelected();
        this.squares[event.index].selected = true;
        this.selected = event;

        if (!event.hide) {
          this.highlightSqrs();
          this.showMatches();
        } else {
          if (event.userValue) {
            this.highlightSqrs();
            this.showMatches();
          }
        }
      } else {
        this.clearSelected();
        this.clearHightlight();
        this.selected = undefined;
      }
    } else {
      this.selected = event;

      if (!event.hide) {
        this.highlightSqrs();
        this.showMatches();
      } else {
        if (event.userValue) {
          this.highlightSqrs();
          this.showMatches();
        }
      }

    }

  }

  clearSelected() {
      this.squares.forEach(x => {
          x.selected = false;
          x.hightlightNotes = false;
      });
  }

  clearHightlight() {
      this.squares.forEach(x => {
        if (x.highlight) {
          x.highlight = false;
        }

        x.show = false;
      });
  }

  highlightSqrs() {
    const locList: Location[] = this.selected.location.list();

    this.clearHightlight();

    this.squares.forEach(x => {
      locList.forEach(n => {
        if (n.compare(x.location) && !x.highlight && x.index !== this.selected.index) {
          x.highlight = true;
        }
      });
    });

  }

  showMatches() {
    try {
      const val = this.selected.userValue ? this.selected.userValue : this.selected.value;

      this.squares.forEach(x => {
        if (!this.selected.location.compare(x.location)) {
          if (!x.hide && x.value === val) {
            x.show = true;
          }

          if (x.hide && x.userValue === val) {
            x.show = true;
          }
        }

        if (x.notes.find(n => n === val)) {
          x.hightlightNotes = true;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  clearNotes() {
    const locList: Location[] = this.selected.location.list();
    const sqrList: Square[] = [];

    this.squares.forEach(n => {
      if (locList.find(x => x.compare(n.location))) {
        const f = n.notes.findIndex(h => h === this.selected.userValue);

        if (f > -1) {
          n.notes.splice(f, 1);
          sqrList.push(n);
        }
      }
    });

    sqrList.forEach(n => {
      this.squares[n.index] = n.copy();
    });
  }
}
