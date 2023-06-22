import { writable } from 'svelte/store';

const searchParams = new URLSearchParams(window.location.search)
const champions = {}

searchParams.forEach((value, key) => {
    champions[key] = value
})

export const draft = writable(champions)

export const selectedChampion = writable(null)