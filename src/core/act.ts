import {CharacterType} from "./types/characterType";
import {Character} from "./character";
import {CardType} from "./types/cardType";
import {randInt} from "./utils";

export default class Act {
    players: Character[];
    enemies: Character[];

    constructor(players: CharacterType[], enemies: CharacterType[]) {
        this.players = players.map(p => new Character(p))
        this.enemies = enemies.map(e => new Character(e))
    }

    roll() {
        this.players.forEach(player => player.roll())
        this.enemies.forEach(enemy => enemy.roll())
    }

    assignEnemyCards() {
        this.enemies.forEach(enemy => {
            // Pick a random target.
            const target = randInt(this.players.length);
            const cardIndex = enemy.cardDeck[randInt(enemy.cardDeck.length)];
            enemy.setSelection(cardIndex, target)
        })
    }

    setCardAndTarget(player: number, enemy: number, card: CardType) {
        this.players[player].setSelection(card, enemy);
    }

    play() {
        // Organize characters by speed, generate a transcript.
        const allCharacters = [...this.players, ...this.enemies];
        allCharacters.sort((a, b) => a.dieRoll - b.dieRoll)


    }
}