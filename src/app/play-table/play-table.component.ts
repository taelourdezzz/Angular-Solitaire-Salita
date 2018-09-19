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
      if(cards.childElementCount < 3){ y = cards.childElementCount}
      for(var x = 0; x < y; x++){
        this.movementService.makeLiftableCard(cards.lastChild);
        cards.lastElementChild.setAttribute('id',cards.lastElementChild.classList[1]);
        waste.appendChild(cards.lastChild);
      }
    }else{
      if(waste.childElementCount > 0){
        while(waste.childElementCount != 0){
          var lastWaste: any = waste.lastChild;
          this.movementService.makeUnliftableCard(lastWaste);
          lastWaste.style.margin = "0px";
          cards.appendChild(lastWaste);
        }
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
      this.revertState(card);
    }
    if(waste.childElementCount > 0){
      var usable: any = waste.lastChild;
      this.movementService.makeLiftableCard(usable);
      if(waste.childElementCount >= 3){
       var semi_displayed: any = usable.previousSibling;
       var peeking: any = semi_displayed.previousSibling;
       semi_displayed.setAttribute('draggable','false');
       peeking.setAttribute('draggable','false');
       usable.style.marginLeft = "40px";
       semi_displayed.style.marginLeft = "20px";
      }else if(waste.childElementCount == 2){
       var semi_displayed: any = usable.previousSibling;
       semi_displayed.setAttribute('draggable','false');
       usable.style.marginLeft = "20px";
      }
    }
  }
}
