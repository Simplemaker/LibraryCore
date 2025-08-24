import {CardType} from "./types/cardType";
import {CharacterType} from "./types/characterType";
import {TargetedCard} from "./targetedCard";
import {UniversalIndex} from "./types/universalIndex";
import {randDie} from "./utils";

export class Character {
    cardDeck: CardType[];
    type: CharacterType;
    hp: number;
    speedRoll: number;
    stagger: number;
    selection?: TargetedCard;


    constructor(characterType: CharacterType) {
        this.type = characterType;
        this.cardDeck = [];
        this.hp = this.type.hp;
        this.stagger = this.type.stagger;
    }

    roll() {
        this.speedRoll = randDie(this.type.speedMin, this.type.speedMax)
    }

    setSelection(card: CardType, target: UniversalIndex) {
        // TODO verify card is in deck.
        this.selection = {
            ...card, target
        }
    }
}