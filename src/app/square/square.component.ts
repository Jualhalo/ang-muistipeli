import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
  @Input() value: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

  constructor() { }

  ngOnInit(): void {
  }

}
