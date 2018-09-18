import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-win-box',
  templateUrl: './win-box.component.html',
  styleUrls: ['./win-box.component.css']
})
export class WinBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  closeThis(){
    let splash = document.getElementById("cover");
    splash.style.display = "none";
    document.location.reload();
  }
}
