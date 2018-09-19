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
    let cardId: any = data.dataTransfer.getData("text");
    let card: HTMLElement = document.getElementById(cardId);
    let target: HTMLElement = document.getElementById(data.target.id);
    let tclass = target.classList;
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
    let foundation = Array.from(document.getElementById("foundation").children);
    let total = 0;
    for(let column of foundation){
      total += column.childElementCount;
    }
    if(total == 52){
      let win = document.getElementById("cover");
      win.style.display = "block";
    }
  }

  moveCard(card, target){
    let location: any = card.parentElement;
    let moved: boolean = false;
    let prevCard: string;
    if(target.parentElement.id=="foundation" && card == location.lastChild
      && this.moveValidationService.checkFoundationMove(card.id, target.id)){
        if(card != card.parentElement.firstElementChild){
          prevCard = card.previousSibling.classList.contains("facedown");
        }
      card.style.margin="0px";
      target.appendChild(card);
      moved = true;
      this.countCards();
      this.moveLogsService.logMove(location.id ,card.id,target.id,prevCard);
    }else if(target.parentElement.id=="tableau" && target != location 
      && this.moveValidationService.checkTableauMove(card.id, target.id)){
      let nxt = card.nextSibling;
      let margin = target.childElementCount;
      if(nxt != null){
        while(card != null){
          card.classList.add("move");
          card.style.marginLeft = "0px";
          card.style.marginTop= (20*margin) + "px";
          card = card.nextSibling;
          margin += 1;
        }
        let movingCards = Array.from(document.getElementsByClassName("move"));
        let firstCard = movingCards[0];
        if(firstCard != card.parentElement.firstElementChild){
          let firstCard = movingCards[0];
          prevCard = firstCard.previousElementSibling.classList.contains("facedown").toString();
        }
        let movingCardsId: string[] = [];
        for(let thiscard of movingCards){
          target.appendChild(thiscard);
          thiscard.classList.remove("move");
          movingCardsId.push(thiscard.id);
        }
        if(card != card.parentElement.firstElementChild){
          prevCard = card.previousSibling.classList.contains("facedown");
        }
        this.moveLogsService.logMove(location.id ,card.id,target.id,prevCard);
      }else{
        if(card != card.parentElement.firstElementChild){
          prevCard = card.previousSibling.classList.contains("facedown");
        }
        let margin = target.childElementCount;
        card.style.marginLeft = "0px";
        card.style.marginTop= (20*margin) + "px";
        target.appendChild(card);
        this.moveLogsService.logMove(location.id ,card.id,target.id,prevCard);
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
<<<<<<< HEAD
    let thiscard = document.getElementById(card.id);
=======
>>>>>>> parent of 01bcbda... Final Commit Before Checking
  }

  makeUnliftableCard(card){
    card.classList.add("facedown");
    card.style.backgroundImage = "url(../../../src/assets/Images/b.png)";
    card.setAttribute('draggable', 'false');
  }

  liftCard(data) {
    data.dataTransfer.setData("text", data.target.id);
  }

  revertState(card: any){
    card.style.margin = "0px";
  }

  displayWaste(){
    let waste = document.getElementById("waste");
    let waste2 = Array.from(document.getElementById("waste").children);
    for(let card of waste2){
      this.revertState(card);
    }
    if(waste.childElementCount > 0){
      let usable: any = waste.lastChild;
      this.makeLiftableCard(usable);
      if(waste.childElementCount >= 3){
       let semi_displayed: any = usable.previousSibling;
       let peeking: any = semi_displayed.previousSibling;
       semi_displayed.setAttribute('draggable','false');
       peeking.setAttribute('draggable','false');
       usable.style.marginLeft = "40px";
       semi_displayed.style.marginLeft = "20px";
      }else if(waste.childElementCount == 2){
       let semi_displayed: any = usable.previousSibling;
       semi_displayed.setAttribute('draggable','false');
       usable.style.marginLeft = "20px";
      }
    }
  }
}
