<script lang="ts">
    import { asDroppable } from 'svelte-drag-and-drop-actions'
    import { draft, selectedChampion } from '../../ts/stores'
    import { isChampionInDraft } from '../../ts/functions'

    export let championName: string

    let disabled = false
    function updateState() {
        disabled = isChampionInDraft(championName)
    }

    let champions
    draft.subscribe((value) => {
        champions = value
        updateState()
    })

    function updateSelectedChampion() {
        selectedChampion.set(championName)
    }
</script>

{#if !disabled}
    <button
        {disabled}
        use:asDroppable={{
            DataToOffer: { 'text/plain': championName },
            Operations: 'copy',
        }}
        on:click={updateSelectedChampion}
        class:selected={championName === $selectedChampion}
    >
        {#if championName === ''}
            <div />
        {:else}
            <img
                src={'/champions/' + championName + '.png'}
                alt={championName}
            />
        {/if}
    </button>
{:else}
    <button
        {disabled}
        on:click={updateSelectedChampion}
    >
        {#if championName === ''}
            <div />
        {:else}
            <img
                src={'/champions/' + championName + '.png'}
                alt={championName}
            />
        {/if}
    </button>
{/if}

<style lang="postcss">
    button {
        cursor: pointer;
        border: none;
        border-radius: var(--border-radius);
        background: var(--grey);
        background: transparent;
        padding: 0;
        width: 80px;
        height: 80px;
        overflow: hidden;

        @media screen and (max-width: 830px) {
            width: 60px;
            height: 60px;
        }

        @media screen and (max-width: 500px) {
            width: 40px;
            height: 40px;
        }

        img {
            aspect-ratio: 1;
            width: 100%;
        }

        &.selected {
            border: 2px solid var(--blue);
        }

        &[disabled] {
            filter: grayscale(100%);
            cursor: not-allowed;
        }
    }
</style>
