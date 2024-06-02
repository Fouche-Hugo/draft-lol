import { draft } from './stores'
import championsData from '../data/champions.json'
import { encode, decode } from 'base2048'
import Msgpack from 'msgpack-lite'

export function isChampionImageInDraft(championImage: string): boolean {

    let champions
    draft.subscribe((value) => (champions = value))

    for (const champion in champions) {
        if (champions[champion] === championImage) {
            return true
        }
    }

    return false
}

export function isStringAChampionImage(championImage: string): boolean {
    for (const champion of championsData) {
        if (champion.image === championImage) {
            return true
        }
    }

    return false
}

export function decodeDraftLink(searchParams: URLSearchParams): {[key: string]: string} {
    let draftInfos = Msgpack.decode(decode(searchParams.get('draft')))
    let draft = {}

    for(let i = 0; i < 5; i++) {
        let index = draftInfos[i]
        if (index >= 0) {
            console.log(index)
            draft[`b${i}`] = championsData[draftInfos[i]].image
        } else {
            draft[`b${i}`] = ''
        }
    }

    for(let i = 5; i < 10; i++) {
        let index = draftInfos[i]
        if (index >= 0) {
            draft[`r${i-5}`] = championsData[draftInfos[i]].image
        } else {
            draft[`r${i-5}`] = ''
        }
    }

    for(let i = 10; i < 20; i++) {
        let index = draftInfos[i]
        if (index >= 0) {
            draft[`ban${i-10}`] = championsData[draftInfos[i]].image
        } else {
            draft[`ban${i-10}`] = ''
        }
    }

    draft['red'] = draftInfos[20]
    draft['blue'] = draftInfos[21]
    draft['Bans blue'] = draftInfos[22]
    draft['Blue 1'] = draftInfos[23]
    draft['Blue 2'] = draftInfos[24]
    draft['Blue 3'] = draftInfos[25]
    draft['Blue 4'] = draftInfos[26]
    draft['Blue 5'] = draftInfos[27]
    draft['Bans red'] = draftInfos[28]
    draft['Red 1'] = draftInfos[29]
    draft['Red 2'] = draftInfos[30]
    draft['Red 3'] = draftInfos[31]
    draft['Red 4'] = draftInfos[32]
    draft['Red 5'] = draftInfos[33]

    return draft
}

export function encodeDraftLink(draftInfos: {[key: string]: string}): string {
    let draft = []

    for(let i = 0; i < 5; i++) {
        if (draftInfos[`b${i}`] === '' || draftInfos[`b${i}`] === undefined || draftInfos[`b${i}`] === null) {
            draft.push(-1)
        } else {
            draft.push(championsData.findIndex((champion) => champion.image === draftInfos[`b${i}`]))
        }
    }

    for(let i = 0; i < 5; i++) {
        if (draftInfos[`r${i}`] === '' || draftInfos[`r${i}`] === undefined || draftInfos[`r${i}`] === null) {
            draft.push(-1)
        } else {
            draft.push(championsData.findIndex((champion) => champion.image === draftInfos[`r${i}`]))
        }
    }

    for(let i = 0; i < 10; i++) {
        if (draftInfos[`ban${i}`] === '' || draftInfos[`ban${i}`] === undefined || draftInfos[`ban${i}`] === null) {
            draft.push(-1)
        } else {
            draft.push(championsData.findIndex((champion) => champion.image === draftInfos[`ban${i}`]))
        }
    }

    draft.push(draftInfos['red'])
    draft.push(draftInfos['blue'])
    draft.push(draftInfos['Bans blue'])
    draft.push(draftInfos['Blue 1'])
    draft.push(draftInfos['Blue 2'])
    draft.push(draftInfos['Blue 3'])
    draft.push(draftInfos['Blue 4'])
    draft.push(draftInfos['Blue 5'])
    draft.push(draftInfos['Bans red'])
    draft.push(draftInfos['Red 1'])
    draft.push(draftInfos['Red 2'])
    draft.push(draftInfos['Red 3'])
    draft.push(draftInfos['Red 4'])
    draft.push(draftInfos['Red 5'])

    return encode(Msgpack.encode(draft))
}