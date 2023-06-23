import { writable } from 'svelte/store';

const searchParams = new URLSearchParams(window.location.search)
const champions = {}

searchParams.forEach((value, key) => {
    if (key === "infos") return
    champions[key] = value
})

export const draft = writable(champions)

export const selectedChampion = writable(null)

const infos = {"blue": "blue", "red": "red"}
if (searchParams.has("infos")) {
    const infosURL = searchParams.get("infos").split(",")
    infos.blue = infosURL[0]
    infos.red = infosURL[1]
}

export const draftInfo = writable(infos)