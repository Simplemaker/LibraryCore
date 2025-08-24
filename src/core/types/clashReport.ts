import {DieType, TargetedDie} from "./dice";

export type ClashTie = {
    dieA: TargetedDie,
    dieB: TargetedDie,
    tie: true;
};

export type ClashWin = {
    dieA: TargetedDie,
    dieB: TargetedDie,
    tie: false;
    type: DieType;
    hpDamage: number;
    staggerDamage: number;
};

export type ClashReport = ClashTie | ClashWin;