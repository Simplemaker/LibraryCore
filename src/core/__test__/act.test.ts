import {CharacterType} from "../types/characterType";
import Act from "../act";

describe('Act', ()=>{
    it('loads players and enemies', ()=> {
        const player: CharacterType = {
            name: "Player",
            speedMin: 5,
            speedMax: 5,
            hp: 100,
            stagger: 100
        }

        const enemy: CharacterType = {
            name: "Enemy",
            speedMin: 4,
            speedMax: 4,
            hp: 50,
            stagger: 100
        }

        const act = new Act([player], [enemy])
        act.roll();
        expect(act.players[0].dieRoll).toBe(5);
        expect(act.enemies[0].dieRoll).toBe(4);
    })
})