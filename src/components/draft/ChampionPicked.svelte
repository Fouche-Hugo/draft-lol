<script lang="ts">
    import {
        asDropZone,
        asDroppable,
        type DropOperation,
    } from 'svelte-drag-and-drop-actions'
    import { draft, selectedChampion } from '../../ts/stores'
    import { isStringAChampionImage } from '../../ts/functions'

    let champions
    draft.subscribe((value) => {
        champions = value
    })

    let selectedchampionImage
    selectedChampion.subscribe((value) => {
        selectedchampionImage = value
    })

    export let championImage: string = ''
    export let pickId: number
    export let team: string

    function onDrop(
        x: number,
        y: number,
        Operation: DropOperation,
        DataOffered: any,
        DroppableExtras: any,
        DropZoneExtras: any
    ): string {
        let newchampionImage = DataOffered['text/plain']

        if (newchampionImage === championImage) {
            return 'false'
        }

        if (!isStringAChampionImage(newchampionImage)) {
            return 'false'
        }

        championImage = newchampionImage
        draft.set({ ...champions, [team + pickId]: championImage })

        return undefined
    }

    function onDropped() {
        if (
            championImage === '' ||
            championImage === undefined ||
            championImage === null
        ) {
            championImage = selectedchampionImage
            selectedChampion.set('')
        } else {
            championImage = ''
        }
        draft.set({ ...champions, [team + pickId]: championImage })
    }
</script>

<button
    use:asDropZone={{ TypesToAccept: { 'text/plain': 'all' }, onDrop: onDrop }}
    on:click={onDropped}
>
    {#if championImage === '' || championImage === undefined || championImage === null}
        <div />
    {:else}
        <img
            src={'/champions/' + championImage}
            alt={championImage}
            use:asDroppable={{
                DataToOffer: { 'text/plain': championImage },
                Operations: 'move',
                onDropped: onDropped,
            }}
        />
    {/if}
</button>

<style lang="postcss">
    button {
        border: none;
        border-radius: var(--border-radius);
        background: var(--grey);
        padding: 0;
        width: 100px;
        height: 100px;
        overflow: hidden;

        @media screen and (max-width: 830px) {
            width: 80px;
            height: 80px;
        }

        @media screen and (max-width: 500px) {
            width: 60px;
            height: 60px;
        }
    }

    img {
        cursor: pointer;
        aspect-ratio: 1;
        width: 100%;
    }
</style>
