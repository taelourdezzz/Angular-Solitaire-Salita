import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoveLogsService {

 moveLogs: String[] = [];

  constructor() { }

  logMove(location, card, destination){
    let log: string = location + "|" + card + "|" + destination;
    this.moveLogs.push(log);
    this.displayLog();
  }

  logMoveStack(location, cards: string[], destination){
    let cardString: string = "";
    for(let card of cards){
      cardString = cardString + card + ",";
    }
    let log: string = location + "|" + cardString + "|" + destination;
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
