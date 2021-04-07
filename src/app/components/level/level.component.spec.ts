import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LevelComponent } from './level.component';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LevelComponent', () => {
  let component: LevelComponent;
  let fixture: ComponentFixture<LevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelComponent],
      imports: [MatSelectModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelComponent);
    component = fixture.componentInstance;
    component.level = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should output level number', () => {
    let selectedKey: number;

    component.output.subscribe((num: number) => selectedKey = num);

    const dropdown = fixture.debugElement.query(By.css('mat-select'));

    dropdown.triggerEventHandler('selectionChange', { value: '2'});

    expect(selectedKey).toEqual(2);
  });
});
