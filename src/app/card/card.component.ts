import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { DECK } from '../card-data-set';
import { NgStyle } from '@angular/common';
import { ShuffleService } from '../shuffle.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  
  cards = DECK; 
  shuffledCards;
  constructor(private shuffleService: ShuffleService) { }

  shuffleCards(cards){
    this.shuffledCards = this.shuffleService.shuffle(cards);
    return this.shuffledCards;
  }

  ngOnInit() {
    this.shuffledCards = this.shuffleCards(this.cards);
    console.log(this.shuffledCards);
  }

  onCreate(card: Card) {
    return "url(../../../src/assets/Images/b.png)"
  }

  addClass(card: Card){
    return "card facedown " + card.id;
  }
}
