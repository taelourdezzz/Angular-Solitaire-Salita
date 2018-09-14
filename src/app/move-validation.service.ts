import { Injectable } from '@angular/core';
import { DECK } from './card-data-set';
import { Card } from './card';
@Injectable({
  providedIn: 'root'
})
export class MoveValidationService {

  deck = DECK;
  card: Card;
  constructor() { }

  checkTableauMove(cardId: string, dest: string) {
    var card = document.getElementById(cardId);
    var destination = document.getElementById(dest);
    var cardVal = 0;
    var cardColor: string;
    for(let thisCard of this.deck){
      if(thisCard.id == cardId){ 
        cardVal = thisCard.value;
        cardColor = thisCard.color;
      }
    }
    if(destination.childElementCount == 0 && cardVal == 13){
      return true;
    }else if(destination.childElementCount > 0){
      var lastCard = destination.lastElementChild;
      var lastChildVal = 0;
      var lastChildColor: string;
      for(let thisCard of this.deck){
        if(thisCard.id == lastCard.id){ 
          lastChildVal = thisCard.value;
          lastChildColor = thisCard.color;
        }
      }
      if(cardColor != lastChildColor && lastChildVal - cardVal == 1){ return true}
    }
  }

  checkFoundationMove(cardId: string, dest: string){
    var card = document.getElementById(cardId);
    var destination = document.getElementById(dest);
    var cardVal = 0;
    var cardSuit: string;
    
    for(let thisCard of this.deck){
      if(thisCard.id == cardId){ 
        cardVal = thisCard.value;
        cardSuit = thisCard.suit;
      }
    }
    if(destination.childElementCount == 0 && cardVal == 1
        && dest == cardSuit){
      return true;
    }else{
      var lastCard = destination.lastElementChild;
      var lastChildVal = 0;
      var lastChildSuit: string;
      if(lastCard != null){
        for(let thisCard of this.deck){
          if(thisCard.id == lastCard.id){ 
            lastChildVal = thisCard.value;
            lastChildSuit = thisCard.suit;
          }
        }
      }
      if(cardSuit == lastChildSuit && cardVal - lastChildVal == 1){ return true}
    }
  }

}
