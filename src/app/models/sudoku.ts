import { Observable } from 'rxjs';
import { Square } from './square';
import { Location } from './location';
import { Grid } from './grid';

export class Sudoku {

  static Generate(level: number): Square[] {
    const hidden = this.setLevel(level);
    const arr: number[][] = Grid.newGrid(true);

    const hiddenlist = this.getHidden(hidden, arr);

    const squares = this.getSquares(arr, hiddenlist);

    return squares;
  }

  static GenerateObs(level: number): Observable<Square[]> {
    let squares: Square[] = [];

    return new Observable((o) => {
      const hidden = this.setLevel(level);

      const obs = Grid.newGridObs(true).subscribe(n => {
        const hiddenlist = this.getHidden(hidden, n);
        squares = this.getSquares(n, hiddenlist);
      });

      obs.unsubscribe();

      o.next(squares);
      o.complete();
    });
  }

  static async GenerateAsync(level: number): Promise<Square[]> {
    const hidden = this.setLevel(level);
    let squares: Square[] = [];

    await Grid.newGridAsync(true).then(n => {
      const hiddenlist = this.getHidden(hidden, n);

      squares = this.getSquares(n, hiddenlist);
    });

    return Promise.resolve(squares);
  }

  static Import(game: number[][]): Square[] {
    const hiddenlist: number[] = [];
    let count = 0;

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (game[x][y] === 0) {
          hiddenlist.push(count);
        }

        count++;
      }
    }

    const arr: number[][] = Grid.newGrid(false, game);
    const squares = this.getSquares(arr, hiddenlist);

    return squares;
  }

  static ImportObs(game: number[][]): Observable<Square[]> {
    let squares: Square[] = [];
    const hiddenlist: number[] = [];
    let count = 0;

    return new Observable((o) => {
      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          if (game[x][y] === 0) {
            hiddenlist.push(count);
          }

          count++;
        }
      }

      const obs = Grid.newGridObs(false, game).subscribe(n => {
        squares = this.getSquares(n, hiddenlist);
      });

      obs.unsubscribe();

      o.next(squares);
      o.complete();
    });
  }

  static async ImportAsync(game: number[][]): Promise<Square[]> {
    let squares: Square[] = [];
    const hiddenlist: number[] = [];
    let count = 0;

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (game[x][y] === 0) {
          hiddenlist.push(count);
        }

        count++;
      }
    }

    await Grid.newGridAsync(false, game).then(n => {
      squares = this.getSquares(n, hiddenlist);
    });

    return Promise.resolve(squares);
  }

  private static setLevel(level: number): number {
    let hidden = 0;

    switch (level) {
      case 1:
        hidden = 40;
        break;
      case 2:
        hidden = 45;
        break;
      case 3:
        hidden = 50;
        break;
      default:
        hidden = 35;
        break;
    }

    return hidden;
  }

  private static getHidden(num: number, board: number[][]): number[] {
    let arr: number[];
    let test = JSON.stringify(board);
    let brd: number[][] = [];
    let single = false;
    let cnt = 0;

    do {
      arr = this.getHiddenList(num);

      brd = this.setHidden(JSON.parse(test), arr);

      single = this.checkBoard(brd, test);

      if (cnt > 5) {
        console.log('reset');
        brd = Grid.newGrid(true);
        test = JSON.stringify(brd);
        arr = [];
        cnt = 0;
        single = false;
      }

      cnt++;
    } while (!single);

    brd = JSON.parse(test);

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        board[x][y] = brd[x][y];
      }
    }

    return arr;
  }

  private static checkBoard(arr: number[][], board: string): boolean {
    let single = false;

    for (let n = 0; n < 5; n++) {
      const test = Grid.newGrid(true, arr);

      single = (board === JSON.stringify(test));

      if (!single) {
        break;
      }
    }

    return single;
  }

  private static getSquares(arr: number[][], hiddenlist: number[]): Square[] {
    const squares: Square[] = [];
    let hide = false;
    let count = 0;

    for (let x = 0; x < 9 ; x++) {
      for (let y = 0; y < 9; y++) {

        hide = hiddenlist.includes(count) ? true : false;

        const square = new Square(arr[x][y], new Location(x, y), hide);

        squares.push(square);

        count++;
      }
    }

    return squares;
  }

  private static getHiddenList(num: number): number[] {
    const arr: number[] = [];

    for (let n = 0; n < num; n++) {
        arr.push(this.getRandom(arr, 80));
    }

    return arr;
  }

  private static setHidden(board: number[][], hidden: number[]): number[][] {
    let count = 0;
    const brd = JSON.parse(JSON.stringify(board));

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {

        if (hidden.includes(count)) {
          brd[x][y] = 0;
        }

        count++;
      }
    }

    return brd;
  }

  private static getRandom(exclude: number[], top: number): number {
    let n = 0;

    do {
      n = Math.floor(Math.random() * top + 1);

      if (exclude.length !== 0) {
        n = exclude.find(x => x === n) ? 0 : n;
      }

    } while (n === 0);

    return n;
  }
}
