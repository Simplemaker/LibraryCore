import {CardType} from "./types/cardType";


export class TargetedCard {
    private cardType: CardType;
    private target: number;


    constructor(cardType: CardType, target: number) {
        this.cardType = cardType;
        this.target = target;
    }
}