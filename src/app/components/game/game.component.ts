import { Component, OnInit } from '@angular/core';
import { Board } from '../../models/board';
import { Square } from '../../models/square';
import { Button } from '../../models/button';
import { GameService } from '../../services/game.service';
import { Location } from '../../models/location';
import { Sudoku } from '../../models/sudoku';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  board: Board;
  buttonPad: Button[];

  constructor(private service: GameService) { }

  ngOnInit() {

    this.board = this.service.get();
    this.buttonPad = this.setButtons();

    this.resetStatus();

    this.service.add(this.board);
  }

  onGameSelect(event: number[][]) {
    const brd = new Board(-1);
    brd.grid = event;

    this.service.addGame(brd);
  }

  onLevelChange(event: number) {
    this.service.add(this.board);
    this.board.level = event;

    Sudoku.GenerateAsync(event).then(n => {
      this.board.squares = n;

      this.resetStatus();
    });
  }

  onSelected(event: Square) {
    this.board.toggleSelected(event);
  }

  onNewGameClick() {
    if (this.board.level === undefined) {
      this.board.level = 0;
    }

    Sudoku.GenerateAsync(this.board.level).then(n => {
      this.service.add(this.board);
      this.board.squares = n;
      this.resetStatus();
    });

  }

  onPadClick(event: number) {

    this.service.add(this.board);

    if (this.board.selected && this.board.selected.hide) {
      if (this.board.notes) {

        this.board.selected.addNotes(event);

      } else {
        this.board.selected.addUserValue(event);
        this.board.clearNotes();
        this.board.highlightSqrs();
        this.board.showMatches();
      }

      this.resetStatus();
    }
  }

  onUndoClick() {
    const brd = this.service.get();

    this.board.squares.forEach(x => {
      if (!x.compare(brd.squares[x.index])) {
        x.update(brd.squares[x.index]);
      }
    });

    this.board.selected = undefined;

    this.board.toggleSelected(this.board.squares[brd.selected.index]);

    this.resetStatus();

    document.getElementById(brd.selected.id).focus();

  }

  onNotesClick() {
    this.board.notes = !this.board.notes;
    if (this.board.selected) {
      this.board.toggleSelected(this.board.selected);
    }
  }

  onEraseClick() {
    let erase = false;

    this.service.add(this.board);

    this.buttonPad.forEach(x => {
      if (x.value === this.board.selected.value) {
        erase = !x.disabled;
      }
    });

    if (erase) {
      this.board.erase();
    }

  }

  onKey(event: number) {
    let mv = false;
    let x = this.board.selected.location.xCoord;
    let y = this.board.selected.location.yCoord;

    switch (event) {
      case 0:
        this.onUndoClick();
        break;
      case -1:
        this.onEraseClick();
        break;
      case -2:
        this.board.notes = !this.board.notes;
        break;
      case -3: // right add to x
        if (y < 8) {
          y++;
          mv = true;
        }
        break;
      case -4: // left subtract from x
        if (y > 0) {
          y--;
          mv = true;
        }
        break;
      case -5: // up subtract from y
        if (x > 0) {
          x--;
          mv = true;
        }
        break;
      case -6: // down add to y
        if (x < 8) {
          x++;
          mv = true;
        }
        break;
      default:
        this.buttonPad.forEach(n => {
          if (n.value === event && !n.disabled) {
            this.onPadClick(event);
          }
        });
        break;
    }

    if (mv) {
      const loc: Location = new Location(x, y);

      const sqr = this.board.squares.find(n => n.location.compare(loc));

      this.board.toggleSelected(sqr);

      document.getElementById(sqr.id).focus();
    }

  }

  resetStatus() {
    const status: number[] = this.board.checkStatus();

    this.buttonPad.forEach(x => x.disabled = false);

    this.buttonPad.forEach(x => {
      if (status[x.value] === 9) {
        x.disabled = true;
      }
    });
  }

  setButtons() {
    const btns: Button[] = [];

    for (let n = 1; n < 10; n++) {
      btns.push(new Button(n));
    }

    return btns;
  }
}
