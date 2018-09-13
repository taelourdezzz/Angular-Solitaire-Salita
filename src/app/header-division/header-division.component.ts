import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-division',
  templateUrl: './header-division.component.html',
  styleUrls: ['./header-division.component.css']
})
export class HeaderDivisionComponent implements OnInit {
  
  title = 'Klondike Solitaire';
  constructor() { }

  ngOnInit() {
  }

  onClick(){
    window.location.reload();
  }
}
