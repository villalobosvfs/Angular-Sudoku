export class Location {
    xCoord: number;
    yCoord: number;
    xStart: number;
    yStart: number;

    constructor(x: number, y: number) {
        this.xCoord = x;
        this.yCoord = y;

        this.start();
    }

    compare(n: Location) {
        return (n.xCoord === this.xCoord) && (n.yCoord === this.yCoord);
    }

    list() {
        const start = this.start();
        const locList: Location[] = [];

        for (let x = start[0]; x < start[0] + 3; x++) {
          for (let y = start[1]; y < start[1] + 3; y++) {
            locList.push(new Location(x, y));
          }
        }

        for (let n = 0; n < 9; n++) {
           if (locList.findIndex(x => x.compare(new Location(this.xCoord, n))) < 0) {
            locList.push(new Location(this.xCoord, n));
           }

           if (locList.findIndex(x => x.compare(new Location(n, this.yCoord))) < 0) {
            locList.push(new Location(n, this.yCoord));
           }
        }

        return locList;
    }

    start() {
        const strt: number[] = [];
        let q = 0;
        let xN = 0;
        let yN = 0;

        switch (this.xCoord) {
          case 0:
          case 1:
          case 2:
              q = 1;
              break;
          case 3:
          case 4:
          case 5:
              q = 2;
              break;
          case 6:
          case 7:
          case 8:
              q = 3;
              break;
        }

        switch (this.yCoord) {
          case 0:
          case 1:
          case 2:
              switch (q) {
                  case 1:
                      xN = 0;
                      yN = 0;
                      break;
                  case 2:
                      xN = 3;
                      yN = 0;
                      break;
                  case 3:
                      xN = 6;
                      yN = 0;
                      break;
              }
              break;
          case 3:
          case 4:
          case 5:
              switch (q) {
                  case 1:
                      xN = 0;
                      yN = 3;
                      break;
                  case 2:
                      xN = 3;
                      yN = 3;
                      break;
                  case 3:
                      xN = 6;
                      yN = 3;
                      break;
              }
              break;
          case 6:
          case 7:
          case 8:
              switch (q) {
                  case 1:
                      xN = 0;
                      yN = 6;
                      break;
                  case 2:
                      xN = 3;
                      yN = 6;
                      break;
                  case 3:
                      xN = 6;
                      yN = 6;
                      break;
              }
              break;
        }

        strt.push(xN);
        strt.push(yN);

        this.xStart = xN;
        this.yStart = yN;

        return strt;
    }
}
