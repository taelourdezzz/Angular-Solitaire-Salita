import { Injectable } from '@angular/core';
import { Card } from './card';
import { DECK } from './card-data-set';
import { MoveValidationService } from './move-validation.service';
import { MoveLogsService } from './move-logs.service';
@Injectable({
  providedIn: 'root'
})
export class MovementService {

  deck = DECK;
  constructor(private moveValidationService: MoveValidationService,
    private moveLogsService: MoveLogsService) { }

  dropCard(data){
    var cardId = data.dataTransfer.getData("text");
    var card = document.getElementById(cardId);
    var target = document.getElementById(data.target.id);
    var tclass = target.classList;
    if(tclass[0] != "slot"){
      target=target.parentElement;
      this.moveCard(card, target);
    }else if(card.parentElement.id == "waste"){
      if(card == card.parentElement.lastChild){
        this.moveCard(card, target);
      }
    }else{
      this.moveCard(card, target);
    }
  }

  countCards(){
    var foundation = Array.from(document.getElementById("foundation").children);
    var total = 0;
    for(let column of foundation){
      total += column.childElementCount;
    }
    if(total == 52){
      var win = document.getElementById("cover");
      win.style.display = "block";
    }
  }

  moveCard(card, target){
    var location = card.parentElement;
    var moved: boolean = false;
    if(target.parentElement.id=="foundation" && card == location.lastChild
      && this.moveValidationService.checkFoundationMove(card.id, target.id)){
      card.style.margin="0px";
      target.appendChild(card);
      moved = true;
      this.moveLogsService.logMove(target.id, card.id, location.id);
      this.countCards();
    }else if(target.parentElement.id=="tableau" && target != location 
      && this.moveValidationService.checkTableauMove(card.id, target.id)){
      var nxt = card.nextSibling;
      var margin = target.childElementCount;
      if(nxt != null && (card.parentElement.id != "waste")){
        while(card != null){
          card.classList.add("move");
          card.style.marginLeft = "0px";
          card.style.marginTop= (20*margin) + "px";
          card = card.nextSibling;
          margin += 1;
        }
        var movingCards = Array.from(document.getElementsByClassName("move"));
        var movingCardsId: string[] = [];
        for(let thiscard of movingCards){
          target.appendChild(thiscard);
          movingCardsId.push(thiscard.id);
          thiscard.classList.remove("move");
        }
        this.moveLogsService.logMoveStack(target.id, movingCardsId, location.id);
      }else{
        if(card == card.parentElement.lastChild){
          var margin = target.childElementCount;
          card.style.marginLeft = "0px";
          card.style.marginTop= (20*margin) + "px";
          target.appendChild(card);
          this.moveLogsService.logMove(target.id, card.id, location.id);
        }
      }
      moved = true;
    }
    if(location.parentElement.id == "tableau" 
        && location.childElementCount !=0 && moved){
      this.makeLiftableCard(location.lastChild);
    }
  }

  makeLiftableCard(card){
    card.classList.remove("facedown");
    card.style.backgroundImage = "url(../../../src/assets/Images/" + 
      card.classList[1]+".png)";
    card.setAttribute('draggable', 'true');
    var thiscard = document.getElementById(card.id);
  }

  makeUnliftableCard(card){
    card.classList.add("facedown");
    card.style.backgroundImage = "url(../../../src/assets/Images/b.png)";
    card.setAttribute('draggable', 'false');
  }

  liftCard(data) {
    data.dataTransfer.setData("text", data.target.id);
  }
}
