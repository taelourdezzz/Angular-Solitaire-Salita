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
    window.location.reload();
  }
  
}