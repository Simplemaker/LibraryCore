import {Character} from "./character";
import {CardType} from "./types/cardType";
import {randDie, randInt} from "./utils";
import {TargetedDie} from "./types/dice";
import {enemyIndex, playerIndex, UniversalIndex} from "./types/universalIndex";
import {clash} from "./clash";

export default class Act {
    players: Character[];
    enemies: Character[];

    constructor(players: Character[], enemies: Character[]) {
        this.players = players;
        this.enemies = enemies;
    }

    roll() {
        this.players.forEach(player => player.roll())
        this.enemies.forEach(enemy => enemy.roll())
    }

    assignEnemyCards() {
        this.enemies.forEach(enemy => {
            // Pick a random target.
            if (!enemy.cardDeck || enemy.cardDeck.length === 0) return;
            const index = randInt(this.players.length);
            const cardType = enemy.cardDeck[randInt(enemy.cardDeck.length)];
            enemy.setSelection(cardType, playerIndex(index))
        })
    }

    setCardAndTarget(player: number, enemy: number, card: CardType) {
        this.players[player].setSelection(card, enemyIndex(enemy));
    }

    play() {
        // Organize characters by speed, generate a transcript.

        const playerDice: TargetedDie[] = this.players.flatMap((character, index) => {
            const selection = character.selection;
            if (!selection) return [];
            return selection.dice.map(die => ({
                target: selection.target,
                owner: {type: 'enemy', index},
                type: die.type,
                dieRoll: randDie(die.min, die.max),
                used: false,
                speed: character.speedRoll
            }) as TargetedDie)
        })

        const enemyDice: TargetedDie[] = this.enemies.flatMap((character, index) => {
            const selection = character.selection;
            if (!selection) return [];
            return selection.dice.map(die => ({
                target: selection.target,
                owner: {type: 'player', index},
                type: die.type,
                dieRoll: randDie(die.min, die.max),
                used: false,
                speed: character.speedRoll
            }) as TargetedDie)
        })

        const dieQueue = playerDice.concat(enemyDice)

        while (dieQueue.length > 0) {
            const currentDie = dieQueue.shift();
            if (currentDie.used) continue;

            // Get counter dice
            const counter = dieQueue
                .find(die => die.owner.equals(currentDie.target) && !die.used)

            clash(currentDie, counter)

            if (counter) {
                counter.used = true;
            }
        }
    }

    getCharacter(universalIndex: UniversalIndex){
        if (universalIndex.type === 'player'){
            return this.players[universalIndex.index]
        } else {
            return this.enemies[universalIndex.index]
        }
    }
}