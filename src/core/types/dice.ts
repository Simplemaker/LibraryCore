
export enum DieType {
    SLASH, PIERCE, BLUNT, BLOCK, EVADE, COUNTER
}

export type Die = {
    type: DieType
    min: number;
    max: number;
}

export type RolledDie = {
    type: DieType;
    roll: number;
}