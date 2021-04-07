import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {
  @Input() level: number;
  @Output() output: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (!this.level) {
      this.level = 0;
    }
  }

  onChange(event) {
    this.output.emit(parseInt(event.value, 10));
  }
}
