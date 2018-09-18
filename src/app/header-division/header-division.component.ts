import { Component, OnInit } from '@angular/core';
import { MoveLogsService} from '../move-logs.service';
import { MovementService } from '../movement.service';
import { PlayTableComponent } from '../play-table/play-table.component';
@Component({
  selector: 'app-header-division',
  templateUrl: './header-division.component.html',
  styleUrls: ['./header-division.component.css']
})
export class HeaderDivisionComponent implements OnInit {
  
  title = 'Klondike Solitaire';
  constructor( private moveLogsService: MoveLogsService, 
    private movementService: MovementService) { }

  ngOnInit() {
  }

  onClick(){
    document.location.reload();
  }
  
  onClickUndo(){
    let last: number = this.moveLogsService.moveLogs.length - 1;
    let lastMove: String = this.moveLogsService.moveLogs[last];
    if(last != -1){
      if(lastMove == "returned"){
        let cards = document.getElementById("talon").firstElementChild;
        let waste = document.getElementById("waste");
        while(cards.childElementCount != 0){
          this.movementService.makeLiftableCard(cards.lastElementChild);
          waste.appendChild(cards.lastElementChild);
        }
        this.movementService.displayWaste();
        this.moveLogsService.moveLogs.pop();
      }else{
        let divisions: string[] = lastMove.split("|");
        let cards: string[] = divisions[1].split(",");
        if(cards.length > 1){cards.pop();}
        if(divisions[0] == "talon"){
          let talon = document.getElementById("talon").firstElementChild;
          cards = cards.reverse();
          for(let card of cards){
            let thiscard = document.getElementById(card);
            this.movementService.makeUnliftableCard(thiscard);
            this.movementService.revertState(thiscard);
            talon.appendChild(thiscard);
          }
          this.moveLogsService.moveLogs.pop();
          this.movementService.displayWaste();
        }else{
          let slot = document.getElementById(divisions[0]);
          if(divisions[3] == "true"){
            this.movementService.makeUnliftableCard(slot.lastChild);
          }
          for(let card of cards){
            let thiscard = document.getElementById(card);
            if(divisions[0] == "foundation"){
              thiscard.style.margin="0px";
              slot.appendChild(thiscard);
            }else if(divisions[0] == "waste"){
              thiscard.style.margin="0px";
              slot.appendChild(thiscard);
              this.movementService.displayWaste();
            }else{
              let margin = slot.childElementCount;
              thiscard.style.marginLeft="0px";
              thiscard.style.marginTop= margin*20 + "px";
              slot.appendChild(thiscard);
            }
          }
          this.moveLogsService.moveLogs.pop();
        }
      }
    }
    console.log(this.moveLogsService.displayLog());
  }
}