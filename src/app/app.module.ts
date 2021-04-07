import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select';

import { SquareComponent } from './components/square/square.component';
import { BoardComponent } from './components/board/board.component';
import { GameComponent } from './components/game/game.component';
import { BtnPadComponent } from './components/btn-pad/btn-pad.component';
import { ButtonComponent } from './components/button/button.component';
import { LevelComponent } from './components/level/level.component';
import { GameService } from './services/game.service';
import { UploadComponent } from './components/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
    GameComponent,
    BtnPadComponent,
    ButtonComponent,
    LevelComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
