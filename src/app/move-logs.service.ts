import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoveLogsService {

 moveLogs: String[] = [];

  constructor() { }

  logMove(location, card, destination, prevCard){
    let log: string = location + "|" + card + "|" + destination + "|" + prevCard;
    this.moveLogs.push(log);
    this.displayLog();
  }

  logMoveStack(location, cards: string[], destination, prevCard){
    let cardString: string = "";
    for(let card of cards){
      cardString = cardString + card + ",";
    }
    let log: string = location + "|" + cardString + "|" + destination + "|" + prevCard;
    this.moveLogs.push(log);
    this.displayLog();
  }

  logReshuffle(){
    this.moveLogs.push("returned");
    this.displayLog();
  }

  displayLog(){
    console.log(this.moveLogs);
  }

}
