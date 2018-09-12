import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { DECK } from '../card-data-set';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  
  cards = DECK; 
  
  constructor() { }

  ngOnInit() {

  }

  onCreate(card: Card) {
    return "url(../../../src/assets/Images/b.png)"
  }

  addClass(card: Card){
    return "card facedown " + card.id;
  }
}
