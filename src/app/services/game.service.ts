import { Injectable } from '@angular/core';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  history: Board[] = [];
  games: Board[] = [];

  constructor() { }

  add(board: Board) {
    return this.history.push(board.copy());
  }

  get(): Board {
    let board = new Board(0);

    if (this.history.length === 1) {
      board = this.history[0].copy();
    } else if (this.history.length > 1) {
      board = this.history.pop().copy();
    }

    return board;
  }

  getGames(): Board[] {

    return this.games;
  }

  addGame(board: Board) {
    this.games.push(board);
  }
}
