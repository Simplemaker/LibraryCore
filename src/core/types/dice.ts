import {UniversalIndex} from "./universalIndex";

export enum DieType {
    SLASH, PIERCE, BLUNT, BLOCK, EVADE, COUNTER
}

export type Die = {
    type: DieType
    min: number;
    max: number;
}

export type TargetedDie = {
    owner: UniversalIndex;
    target: UniversalIndex;
    dieRoll: number;
    type: DieType;
    used: boolean;
    speed: number;
}