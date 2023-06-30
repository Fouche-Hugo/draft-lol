import { writable } from 'svelte/store';
import {encode, decode } from 'base2048';
import Msgpack from 'msgpack-lite';

const searchParams = new URLSearchParams(window.location.search)
let draftInfos = {}

if (searchParams.has("draft")) {
    draftInfos = Msgpack.decode(decode(searchParams.get("draft")))
} else {
    draftInfos['red'] = 'red'
    draftInfos['blue'] = 'blue'
    draftInfos['Bans blue'] = ''
    draftInfos['Blue 1'] = ''
    draftInfos['Blue 2'] = ''
    draftInfos['Blue 3'] = ''
    draftInfos['Blue 4'] = ''
    draftInfos['Blue 5'] = ''
    draftInfos['Bans red'] = ''
    draftInfos['Red 1'] = ''
    draftInfos['Red 2'] = ''
    draftInfos['Red 3'] = ''
    draftInfos['Red 4'] = ''
    draftInfos['Red 5'] = ''
}

export const draft = writable(draftInfos)

export const selectedChampion = writable(null)

export const editingMode = writable(false)