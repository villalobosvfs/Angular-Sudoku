import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('file', {static: true}) file;
  @Output() game: EventEmitter<number[][]> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onFileSelect(event) {
    const f = new FileReader();
    const flist: FileList = event.target.files;

    f.onload = () => {
      const txt = f.result.toString().trim().replace('\r', '').split('\n');
      const ret: number[][] = [];

      txt.forEach(n => {

        const x: number[] = [];

        n.split(',').forEach(j => {
          const num = parseInt(j, 10);

          if (!isNaN(num) && num >= 0 && num < 10) {
            x.push(num);
          }
        });

        if (x.length === 9) {
          ret.push(x);
        }
      });

      if (ret.length === 9) {
        this.game.emit(ret);
      } else {
        console.log('Error Processing Game');
      }
    };

    Array.from(flist).forEach(file => {
      f.readAsText(file);
    });

  }

  addFiles() {
    this.file.nativeElement.value = '';
    this.file.nativeElement.click();
  }
}
