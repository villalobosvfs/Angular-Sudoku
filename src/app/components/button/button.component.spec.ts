import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';
import { Button } from 'src/app/models/button';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  const mockButton: Button = new Button(1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.button = mockButton;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise onClick event when clicked', () => {
    let selectedNum: number;

    component.num.subscribe((num: number) => selectedNum = num);

    const button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    expect(selectedNum).toBe(mockButton.value);
  });
});
