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
  card : Card;
  
  constructor() { }

  ngOnInit() {
    let card: any = this.cards;
    console.log(card);
  }

}
