import { Observable } from 'rxjs';
import { Location } from './location';

export class Grid {

  static newGrid(mirror: boolean, arr?: number[][]): number[][] {
    let board = [];
    let finished = true;

    if (arr) {
      board = JSON.parse(JSON.stringify(arr));
    } else {
      board = this.newBoard();
      arr = this.newBoard();
    }

    do {
      let count = 0;
      finished = true;

      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          if (board[x][y] === 0) {
            const exclude = this.getExclusions(board, new Location(x, y), mirror);

            if (exclude.length < 9) {

                board[x][y] = this.getNumber(exclude);

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

  static newGridObs(mirror: boolean, arr?: number[][]): Observable<number[][]> {
    let board = [];

    return new Observable((o) => {
      if (arr) {
        board = this.newGrid(mirror, arr);
      } else {
        board = this.newGrid(mirror);
      }

      o.next(board);
      o.complete();
    });
  }

  static async newGridAsync(mirror: boolean, arr?: number[][]): Promise<number[][]> {
    let board = [];

    if (arr) {
      board = this.newGrid(mirror, arr);
    } else {
      board = this.newGrid(mirror);
    }

    return Promise.resolve(board);
  }

  private static getExclusions(arr: number[][], loc: Location, chkMirror: boolean): number[] {
    let exclude: number[] = arr[loc.xCoord].filter(n => n > 0);
    const col: number[] = this.colExclusions(arr, loc.yCoord);
    const subgrid: number[] = this.subgridExclusions(arr, loc.xStart, loc.yStart);

    if (chkMirror) {
      const mirror: number[] = this.mirrorExclusions(arr, loc);

      exclude = exclude.concat(col, subgrid, mirror);
    } else {
      exclude = exclude.concat(col, subgrid);
    }

    exclude = [...new Set(exclude)];

    return exclude;
  }

  private static colExclusions(arr: number[][], y: number): number[] {
    const exclude = [];

    for (let x = 0; x < 9; x++) {
        if (arr[x][y]) {
          exclude.push(arr[x][y]);
        }
    }

    return exclude;
  }

  private static subgridExclusions(arr: number[][], xN: number, yN: number): number[] {
    const exclude: number[] = [];

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          const val = arr[x + xN][y + yN];

          if (val) {
            exclude.push(val);
          }
        }
    }

    return exclude;
  }

  private static mirrorExclusions(arr: number[][], loc: Location): number[] {
      const exclude: number[] = [];

      if (loc.xStart === 3 && loc.yStart === 0 || loc.xStart === 6 && loc.yStart === 0) {
        const val = arr[loc.yCoord][loc.xCoord];

        if (val) {
          exclude.push(val);
        }
      } else if (loc.xStart === 3 && loc.yStart === 6 || loc.xStart === 6 && loc.yStart === 6) {
        const val = arr[8 - loc.yCoord][8 - loc.xCoord];

        if (val) {
          exclude.push(val);
        }
      } else if (loc.xStart === 6 && loc.yStart === 3) {
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

  private static getNumber(exclude: number[]): number {
    let n = 0;
    const numList: number[] = [];

    for (let x = 1; x < 10; x++) {
      if (!exclude.includes(x)) {
        numList.push(x);
      }
    }

    if (numList.length === 1) {
      n = numList[0];
    } else {
      n = numList[Math.floor(Math.random() * numList.length)];
    }

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
