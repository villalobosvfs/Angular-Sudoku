import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';
import { Board } from '../models/board';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });

  it('should add a board object', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service.add(new Board(0))).toBeGreaterThan(0);
  });

  it('should return a default board', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service.get()).toBeTruthy();
  });
});
