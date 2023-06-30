<script lang="ts">
    import {
        asDropZone,
        asDroppable,
        type DropOperation,
    } from 'svelte-drag-and-drop-actions'
    import { draft, selectedChampion } from '../../ts/stores'
    import { isStringAChampion } from '../../ts/functions'

    let champions
    draft.subscribe((value) => {
        champions = value
    })

    let selectedChampionName
    selectedChampion.subscribe((value) => {
        selectedChampionName = value
    })

    export let championName: string = ""
    export let banId: number

    function onDrop(
        x: number,
        y: number,
        Operation: DropOperation,
        DataOffered: any,
        DroppableExtras: any,
        DropZoneExtras: any
    ): string {
        let newChampionName = DataOffered['text/plain']

        if (newChampionName === championName) {
            return 'false'
        }

        if (!isStringAChampion(newChampionName)) {
            return 'false'
        }

        championName = newChampionName
        draft.set({ ...champions, ['ban' + banId]: championName })

        return undefined
    }

    function onDropped() {
        if (championName === '' || championName === undefined || championName === null) {
            championName = selectedChampionName
            selectedChampion.set('')
        } else {
            championName = ''
        }
        draft.set({ ...champions, ['ban' + banId]: championName })
    }
</script>

<button
    use:asDropZone={{ TypesToAccept: { 'text/plain': 'all' }, onDrop: onDrop }}
    on:click={onDropped}
>
    {#if championName === '' || championName === undefined || championName === null}
        <div />
    {:else}
        <img
            src={'/champions/' + championName + '.png'}
            alt={championName}
            use:asDroppable={{
                DataToOffer: { 'text/plain': championName },
                Operations: 'move',
                onDropped: onDropped,
            }}
        />
    {/if}
</button>

<style lang="postcss">
    button {
        background: var(--grey);
        width: 60px;
        height: 60px;
        border-radius: var(--border-radius);
        overflow: hidden;
        border: none;
        padding: 0;

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
        aspect-ratio: 1;
        width: 100%;
        cursor: pointer;
    }
</style>
