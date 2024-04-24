import { draft } from './stores'
import championsNames from '../data/champions.json'

let champions
draft.subscribe((value) => (champions = value))

export function isChampionInDraft(championName: string): boolean {
    for (const champion in champions) {
        if (champions[champion] === championName) {
            return true
        }
    }

    return false
}

export function isStringAChampion(championName: string): boolean {
    for (const champion of championsNames) {
        if (champion.name === championName) {
            return true
        }
    }

    return false
}
