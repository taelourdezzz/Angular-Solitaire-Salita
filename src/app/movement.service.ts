import { Injectable } from '@angular/core';
import { Card } from './card';
import { DECK } from './card-data-set';
import { MoveValidationService } from './move-validation.service';
@Injectable({
  providedIn: 'root'
})
export class MovementService {

  deck = DECK;
  constructor(private moveValidationService: MoveValidationService) { }

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
      alert("You Win!");
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
      this.countCards();
    }else if(target.parentElement.id=="tableau" && target != location 
      && this.moveValidationService.checkTableauMove(card.id, target.id)){
      var nxt = card.nextSibling;
      var margin = target.childElementCount;
      if(nxt != null){
        while(card != null){
          card.classList.add("move");
          card.style.marginLeft = "0px";
          card.style.marginTop= (20*margin) + "px";
          card = card.nextSibling;
          margin += 1;
        }
        var movingCards = Array.from(document.getElementsByClassName("move"));
        for(let thiscard of movingCards){
          target.appendChild(thiscard);
          thiscard.classList.remove("move");
        }
      }else{
        var margin = target.childElementCount;
        card.style.marginLeft = "0px";
        card.style.marginTop= (20*margin) + "px";
        target.appendChild(card);
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
