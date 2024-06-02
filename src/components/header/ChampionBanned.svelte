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

    let selectedChampionName
    selectedChampion.subscribe((value) => {
        selectedChampionName = value
    })

    export let championImage: string = ''
    export let banId: number

    function onDrop(
        x: number,
        y: number,
        Operation: DropOperation,
        DataOffered: any,
        DroppableExtras: any,
        DropZoneExtras: any
    ): string {
        let newChampionImage = DataOffered['text/plain']

        if (newChampionImage === championImage) {
            return 'false'
        }

        if (!isStringAChampionImage(newChampionImage)) {
            return 'false'
        }

        championImage = newChampionImage
        draft.set({ ...champions, ['ban' + banId]: championImage })

        return undefined
    }

    function onDropped() {
        if (
            championImage === '' ||
            championImage === undefined ||
            championImage === null
        ) {
            championImage = selectedChampionName
            selectedChampion.set('')
        } else {
            championImage = ''
        }
        draft.set({ ...champions, ['ban' + banId]: championImage })
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
        width: 60px;
        height: 60px;
        overflow: hidden;

        @media screen and (max-width: 830px) {
            width: 40px;
            height: 40px;
        }

        @media screen and (max-width: 380px) {
            width: 30px;
            height: 30px;
        }
    }

    img {
        cursor: pointer;
        aspect-ratio: 1;
        width: 100%;
    }
</style>
