import { Injectable } from '@angular/core';
import { MovementService } from './movement.service';
@Injectable({
  providedIn: 'root'
})
export class DistributeService {

  deckDivs;

  constructor(private movementService: MovementService) { }

  getDeck(){
    this.deckDivs=document.getElementById('talon').firstChild;
      return this.deckDivs;
  }

  distributeCards(){
    this.deckDivs = this.getDeck();
    var index = document.getElementById("tableau").childElementCount;
    var margin = 0;
    for(var i = 1; i <= index; i++){
      for(var j = i; j <=index; j++){
        if(i!=1){
          margin = margin + ((i-1)*20);
        }
        var movingcard = this.deckDivs.lastChild;
        var column = document.getElementById("col"+j);
        column.appendChild(movingcard);
        movingcard.style.marginTop = margin + "px";
        movingcard.setAttribute('id',movingcard.classList[2]);
        if(i == j){
          this.movementService.makeLiftableCard(movingcard);
        }
        margin = 0;
      }
    }
    
  }
  
}
