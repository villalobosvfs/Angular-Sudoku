import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SquareComponent } from './square.component';
import { Square } from 'src/app/models/square';
import { Location } from 'src/app/models/location';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;
  const mockSquare: Square = new Square(1, new Location(0, 0), true);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
    component.square = mockSquare;
    component.index = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise onClick event when clicked', () => {
    let selectedSquare: Square;

    component.output.subscribe((sqr: Square) => selectedSquare = sqr);

    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    expect(selectedSquare).toBe(mockSquare);
  });

  it('should raise onKeyPress when Key is pressed', () => {
    let selectedKey: number;

    component.key.subscribe((num: number) => selectedKey = num);

    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('keydown', { key: '1'});

    expect(selectedKey).toEqual(1);
  });
});
