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
    this.displayWaste();
  }

  liftCard(data){
    this.movementService.liftCard(data);
  }

  checkTalon(){
    var cards = document.getElementById("talon").firstElementChild;
    var waste = document.getElementById("waste");
    if(cards.childElementCount != 0){
      var y = 3;
      var movingCardsId: string[] = [];
      if(cards.childElementCount < 3){ y = cards.childElementCount}
      for(var x = 0; x < y; x++){
        this.movementService.makeLiftableCard(cards.lastChild);
        cards.lastElementChild.setAttribute('id',cards.lastElementChild.classList[1]);
        waste.appendChild(cards.lastChild);
        movingCardsId.push(waste.lastElementChild.id);
      }
      this.moveLogsService.logMoveStack(waste.id, movingCardsId, cards.parentElement.id);
    }else{
      if(waste.childElementCount > 0){
        while(waste.childElementCount != 0){
          var lastWaste: any = waste.lastChild;
          this.movementService.makeUnliftableCard(lastWaste);
          lastWaste.style.margin = "0px";
          cards.appendChild(lastWaste);
        }
        this.moveLogsService.logReshuffle();
      }
    }
    this.displayWaste();
  }

  revertState(card: any){
    card.style.margin = "0px";
  }

  displayWaste(){
    var waste = document.getElementById("waste");
    var waste2 = Array.from(document.getElementById("waste").children);
    for(let card of waste2){
      card.setAttribute('draggable','false');
      this.revertState(card);
    }
    if(waste.childElementCount > 0){
      var usable: any = waste.lastChild;
      this.movementService.makeLiftableCard(usable);
      if(waste.childElementCount >= 3){
       var semi_displayed: any = usable.previousSibling;
       var peeking: any = semi_displayed.previousSibling;
       usable.style.marginLeft = "40px";
       semi_displayed.style.marginLeft = "20px";
      }else if(waste.childElementCount == 2){
       var semi_displayed: any = usable.previousSibling;
       usable.style.marginLeft = "20px";
      }
    }
  }
}
