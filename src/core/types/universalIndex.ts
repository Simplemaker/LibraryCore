
type IndexType = 'player'|'enemy';

export class UniversalIndex {
    type: IndexType;
    index: number;

    constructor(type: IndexType, index: number) {
        this.type = type;
        this.index = index;
    }

    equals(other: UniversalIndex) {
        return this.type === other.type && this.index === other.index;
    }
}

export function playerIndex(index: number) {
    return new UniversalIndex('player', index)
}

export function enemyIndex(index: number) {
    return new UniversalIndex('enemy', index)
}