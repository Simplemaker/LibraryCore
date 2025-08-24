import {CardType} from "./types/cardType";
import {UniversalIndex} from "./types/universalIndex";


export type TargetedCard = CardType & {
    target: UniversalIndex;
}