import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { MovementService } from '../movement.service';

@Component({
  selector: 'app-play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./play-table.component.css']
})
export class PlayTableComponent implements OnInit {
  
  constructor(private movementService: MovementService) { }

  ngOnInit() {

  }

  allowDrop(data) {
    data.preventDefault();
  }

  dropHere(data){ 
    this.movementService.dropCard(data);
  }

  liftCard(data){
    this.movementService.liftCard(data);
  }

}
