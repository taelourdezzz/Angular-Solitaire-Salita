import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { MovementService } from '../movement.service';
import { MoveLogsService } from '../move-logs.service';
@Component({
  selector: 'app-play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./play-table.component.css']
})
export class PlayTableComponent implements OnInit {
  
  constructor(private movementService: MovementService,
    private moveLogsService: MoveLogsService) { }

  ngOnInit() {

  }

  allowDrop(data) {
    data.preventDefault();
  }

  dropHere(data){ 
    this.movementService.dropCard(data);
    this.movementService.displayWaste();
  }

  liftCard(data){
    this.movementService.liftCard(data);
  }

  checkTalon(){
    let cards = document.getElementById("talon").firstElementChild;
    let waste = document.getElementById("waste");
    if(cards.childElementCount != 0){
      let y = 3;
      let movingCardsId: string[] = [];
      if(cards.childElementCount < 3){ y = cards.childElementCount}
      for(let x = 0; x < y; x++){
        this.movementService.makeLiftableCard(cards.lastChild);
        cards.lastElementChild.setAttribute('id',cards.lastElementChild.classList[1]);
        movingCardsId.push(cards.lastElementChild.id);
        waste.appendChild(cards.lastChild);
      }
      this.moveLogsService.logMoveStack(cards.parentElement.id ,movingCardsId,waste.id);
    }else{
      if(waste.childElementCount > 0){
        while(waste.childElementCount != 0){
          let lastWaste: any = waste.lastChild;
          this.movementService.makeUnliftableCard(lastWaste);
          lastWaste.style.margin = "0px";
          cards.appendChild(lastWaste);
        }
        this.moveLogsService.logReshuffle();
      }
    }
    this.movementService.displayWaste();
  }

}
