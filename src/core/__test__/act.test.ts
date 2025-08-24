import Act from "../act";
import {Character} from "../character";
import {DieType} from "../types/dice";
import {CardType} from "../types/cardType";
import * as clashModule from "../clash";
import {ClashWin} from "../types/clashReport";

const clashSpy = jest.spyOn(clashModule, 'clash')

describe('Act', ()=>{

    it('Rolls speed dice correctly', ()=> {
        const player = new Character({
            name: "Player",
            speedMin: 5,
            speedMax: 5,
            hp: 100,
            stagger: 100
        })

        const enemy = new Character({
            name: "Enemy",
            speedMin: 4,
            speedMax: 4,
            hp: 50,
            stagger: 100
        })

        const act = new Act([player], [enemy])
        act.roll();
        expect(act.players[0].speedRoll).toBe(5);
        expect(act.enemies[0].speedRoll).toBe(4);
    })

    it('Rolls card dice', ()=> {
        const player = new Character({
            name: "Player",
            speedMin: 5,
            speedMax: 5,
            hp: 100,
            stagger: 100
        })

        const enemy = new Character({
            name: "Enemy",
            speedMin: 4,
            speedMax: 4,
            hp: 50,
            stagger: 100
        })

        const slash: CardType = {
            name: "slash",
            dice: [{
                type: DieType.SLASH,
                min: 5,
                max: 5
            }]
        }

        player.cardDeck = [slash]

        const act = new Act([player], [enemy])
        act.roll();
        expect(act.players[0].speedRoll).toBe(5);
        expect(act.enemies[0].speedRoll).toBe(4);

        act.assignEnemyCards();
        act.setCardAndTarget(0, 0, slash)
        const clashes = act.play()
        expect(clashSpy).toHaveBeenCalled()
        const [dieA, dieB] = clashSpy.mock.calls[0];
        expect(dieA.dieRoll).toBe(5);
        expect(dieB).toBeUndefined();

        expect(clashes).toHaveLength(1);
        expect(clashes[0].tie).toBeFalsy();
        const clash = clashes[0] as ClashWin;
        expect(clash.hpDamage).toBe(5);
        expect(clash.staggerDamage).toBe(5);
    })


})