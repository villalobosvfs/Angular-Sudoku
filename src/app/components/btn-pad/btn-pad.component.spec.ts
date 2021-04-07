import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BtnPadComponent } from './btn-pad.component';
import { ButtonComponent } from '../button/button.component';
import { Button } from 'src/app/models/button';

describe('BtnPadComponent', () => {
  let component: BtnPadComponent;
  let fixture: ComponentFixture<BtnPadComponent>;
  const mockButtons: Button[] = [new Button(1)];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnPadComponent, ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPadComponent);
    component = fixture.componentInstance;
    component.buttons = mockButtons;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise onClick event when clicked', () => {
    let mockNumber: number;

    component.num.subscribe((num: number) => mockNumber = num);

    const button = fixture.debugElement.query(By.css('app-button'));

    button.triggerEventHandler('num', 1);

    expect(mockNumber).toEqual(1);
  });
});
