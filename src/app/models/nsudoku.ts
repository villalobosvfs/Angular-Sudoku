import { Square } from './square';
import { Location } from './location';

export class Test {

  static Generate(level: number): Square[] {
    const hidden = this.setLevel(level);
    const squares: Square[] = [];
    const arr = this.getSudoku();
    const hiddenlist = this.getHidden(hidden);
    let count = 0;
    let hide = false;

    for (let y = 0; y < 9 ; y++) {
      for (let x = 0; x < 9; x++) {

        hide = hiddenlist.find(n => n === count) ? false : true;

        const square = new Square(arr[x][y], new Location(x, y), hide);

        squares.push(square);

        count++;
      }
    }

    return squares;
  }

  private static setLevel(level: number): number {
    let hidden = 0;

    switch (level) {
      case 1:
        hidden = 35;
        break;
      case 2:
        hidden = 30;
        break;
      case 3:
        hidden = 25;
        break;
      default:
        hidden = 40;
        break;
    }

    return hidden;
  }

  private static getHidden(num: number): number[] {
    const arr: number[] = [];

    for (let n = 0; n < num; n++) {
        arr.push(this.getNumber(arr, 80));
    }

    return arr;
  }

  private static getSudoku(arr?: number[][]): number[][] {
    let board = [];

    if (arr) {
      board = JSON.parse(JSON.stringify(arr));
    } else {
      board = this.newBoard();
      arr = this.newBoard();
    }
    let finished = true;

    do {
      let count = 0;
      finished = true;

      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          if (board[x][y] === 0) {
            const exclude = this.getExclusions(board, new Location(x, y));

            if (exclude.length < 9) {

                board[x][y] = this.getNumber(exclude, 9);

            } else {
                y = -1;
                board[x] = JSON.parse(JSON.stringify(arr[x]));
                count++;
            }

            if (count > 100) {
              board = JSON.parse(JSON.stringify(arr));
              finished = false;
              break;
            }
          }
        }

        if (count > 100) {
          break;
        }
      }
    } while (!finished);

    return board;
  }

  private static getExclusions(arr: number[][], loc: Location): number[] {
    let exclude: number[] = arr[loc.xCoord].filter(n => n > 0);
    const col: number[] = this.colExclusions(arr, loc.xCoord, loc.yCoord);
    const subgrid: number[] = this.subgridExclusions(arr, loc.xCoord, loc.yCoord);
    const mirror: number[] = this.mirrorExclusions(arr, loc.xCoord, loc.yCoord);

    exclude = exclude.concat(col, subgrid, mirror);

    return [...new Set(exclude)];
  }

  private static colExclusions(arr: number[][], x: number, y: number): number[] {
    const exclude = [];

    for (let n = 0; n < 9; n++) {
        if (arr[n][y]) {
          exclude.push(arr[n][y]);
        }
    }

    return exclude;
  }

  private static subgridExclusions(arr: number[][], x: number, y: number): number[] {
    const exclude: number[] = [];
    const start = new Location(x, y).start();
    const xN = start[0];
    const yN = start[1];

    for (let n = 0; n < 3; n++) {
        for (let j = 0; j < 3; j++) {
          const val = arr[n + xN][j + yN];

          if (val) {
            exclude.push(val);
          }
        }
    }

    return exclude;
  }

  private static mirrorExclusions(arr: number[][], x: number, y: number): number[] {
    const exclude: number[] = [];
    const loc = new Location(x, y);
    const start = loc.start();
    const xN = start[0];
    const yN = start[1];

    if (xN === 3 && yN === 0 || xN === 6 && yN === 0) {
      const val = arr[loc.yCoord][loc.xCoord];

      if (val) {
        exclude.push(val);
      }
    } else if (xN === 3 && yN === 6 || xN === 6 && yN === 6) {
      const val = arr[8 - loc.yCoord][8 - loc.xCoord];

      if (val) {
        exclude.push(val);
      }
    } else if (xN === 6 && yN === 3) {
      let val = arr[8 - loc.yCoord][8 - loc.xCoord];

      if (val) {
        exclude.push(val);
      }

      val = arr[loc.yCoord][loc.xCoord];

      if (val) {
        exclude.push(val);
      }
    }

    return exclude;
  }

  private static getNumber(exclude: number[], top: number): number {
    let n = 0;

    do {
      n = Math.floor(Math.random() * top + 1);

      if (exclude.length !== 0) {
        n = exclude.find(x => x === n) ? 0 : n;
      }

    } while (n === 0);

    return n;
  }

  private static newBoard(): number[][] {
    const board: number[][] = [];

    for (let n = 0; n < 9; n++) {
      const row: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

      board.push(row);
    }

    return board;
  }
}
