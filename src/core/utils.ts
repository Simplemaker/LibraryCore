
export function randInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function randDie(min: number, max: number) {
    return min + randInt(max - min + 1)
}