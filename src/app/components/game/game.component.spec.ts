import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { BoardComponent } from 'src/app/components/board/board.component';
import { LevelComponent } from 'src/app/components/level/level.component';
import { BtnPadComponent } from 'src/app/components/btn-pad/btn-pad.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { SquareComponent } from 'src/app/components/square/square.component';
import { UploadComponent } from '../upload/upload.component';
import { MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameService } from 'src/app/services/game.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let service: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent, BoardComponent, LevelComponent, BtnPadComponent, ButtonComponent, SquareComponent, UploadComponent ],
      imports: [MatSelectModule, BrowserAnimationsModule],
      providers: [GameService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(GameService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
