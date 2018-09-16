import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { DECK } from '../card-data-set';
import { NgStyle } from '@angular/common';
import { ShuffleService } from '../shuffle.service';
import { DistributeService } from '../distribute.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {
  
  cards = DECK; 
  shuffledCards;
  constructor(private shuffleService: ShuffleService,
    private distributeService: DistributeService) { }

  shuffleCards(cards){
    // this.shuffledCards = this.shuffleService.shuffle(cards);
    return this.shuffledCards = cards;
  }

  ngOnInit() {
    this.shuffledCards = this.shuffleCards(this.cards);
  }

  onCreate(card: Card) {
    return "url(../../../src/assets/Images/b.png)"
  }

  addClass(card: Card){
    return "card facedown "+ card.id + " " + card.color + " " + card.value + " " + card.suit;
  }

  ngAfterViewInit() {
    this.distributeService.distributeCards();
  }

  moveCard(card){
    card.dataTransfer.setData("text", card.target.id);
  }
}
