import {TargetedDie} from "./types/dice";
import {ClashReport} from "./types/clashReport";

/**
 * Simulates a clash between two unused dice. `dieB` may be undefined in a one-sided clash.
 * @param dieA
 * @param dieB
 */
export function clash(dieA: TargetedDie, dieB: TargetedDie) {

    const difference = dieA.dieRoll - (dieB?.dieRoll??0);

    let clashReport: ClashReport = {
        dieA, dieB, tie: true
    }

    if (difference > 0) {
        // Die A wins!
        clashReport = {
            hpDamage: difference, staggerDamage: difference, type: dieA.type,
            dieA, dieB, tie: false
        }
    } else if (difference < 0) {
        clashReport = {
            hpDamage: -difference, staggerDamage: -difference, type: dieB?.type,
            dieA, dieB, tie: false
        }
    }

    return clashReport;
}