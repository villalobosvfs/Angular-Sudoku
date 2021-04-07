import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Button } from '../../models/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() button: Button;
  @Output() num: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.num.emit(this.button.value);
  }
}
