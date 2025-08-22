import {CardType} from "./types/cardType";
import {CharacterType} from "./types/characterType";
import {TargetedCard} from "./targetedCard";

export class Character {
    cardDeck: CardType[];
    type: CharacterType;
    hp: number;
    dieRoll: number;
    stagger: number;
    selection?: TargetedCard;


    constructor(characterType: CharacterType) {
        this.type = characterType;
        this.cardDeck = [];
        this.hp = this.type.hp;
        this.stagger = this.type.stagger;
    }

    roll() {
        this.dieRoll = Math.floor(Math.random() * (1 + this.type.speedMax - this.type.speedMin)) + this.type.speedMin;
    }

    setSelection(card: CardType, target: number) {
        // TODO verify card is in deck.
        this.selection = new TargetedCard(card, target)
    }
}