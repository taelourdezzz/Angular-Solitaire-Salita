import { Injectable } from '@angular/core';
import { Card } from './card';
import { DECK } from './card-data-set';
@Injectable({
  providedIn: 'root'
})
export class MovementService {

  deck = DECK;
  constructor() { }

  dropCard(data){
    var cardId = data.dataTransfer.getData("text");
    var card = document.getElementById(cardId);
    var target = document.getElementById(data.target.id);
    var tclass = target.classList;
    if(tclass[0] != "slot"){
      target=target.parentElement;
      this.moveCard(card, target);
    }
    else{
      this.moveCard(card, target);
    }
    // if(target.id == "foundation"){
       
    // }
  }

  moveCard(card, target){
    card.style.marginTop="0px";
    var location = card.parentElement;
    target.appendChild(card);
    this.makeLiftableCard(location.lastChild);
  }

  makeLiftableCard(card){
    card.classList.remove("facedown");
    card.style.backgroundImage = "url(../../../src/assets/Images/" + 
      card.classList[1]+".png)";
    card.setAttribute('draggable', 'true');
  }

  liftCard(data) {
    data.dataTransfer.setData("text", data.target.id);
  }
}
