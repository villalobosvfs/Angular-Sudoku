import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Button } from '../../models/button';

@Component({
  selector: 'app-btn-pad',
  templateUrl: './btn-pad.component.html',
  styleUrls: ['./btn-pad.component.css']
})
export class BtnPadComponent implements OnInit {
  @Input() buttons: Button[];
  @Output() num: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClick(event: number) {
    this.num.emit(event);
  }

}
