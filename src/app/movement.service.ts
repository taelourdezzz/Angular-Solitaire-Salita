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
    var location = card.parentElement;
    if(target.parentElement.id=="foundation" && card == location.lastChild){
      card.style.marginTop="0px";
      target.appendChild(card);
      this.makeLiftableCard(location.lastChild);
    }else if(target.parentElement.id=="tableau" && target != location){
      var nxt = card.nextSibling;
      if(nxt != null){
        var last = card.previousSibling;
        console.log(last);
        while(card != last){
          var margin = target.childElementCount;
          card.style.marginTop= (20*margin) + "px";
          target.appendChild(card);
          card = location.lastChild;
        }
      }else{
        var margin = target.childElementCount;
        card.style.marginTop= (20*margin) + "px";
        target.appendChild(card);
      }
      this.makeLiftableCard(location.lastChild);
    }
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
