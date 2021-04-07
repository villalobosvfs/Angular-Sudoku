import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BoardComponent } from './board.component';
import { SquareComponent } from '../square/square.component';
import { Board } from 'src/app/models/board';
import { Square } from 'src/app/models/square';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  const mockBoard: Board = new Board(0);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent, SquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    component.board = mockBoard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return clicked square', () => {
    let selectedSquare: Square;

    component.square.subscribe((sqr: Square) => selectedSquare = sqr);

    const button = fixture.debugElement.query(By.css('app-square'));

    button.triggerEventHandler('output', mockBoard.selected);

    expect(selectedSquare).toBe(mockBoard.selected);
  });
});
