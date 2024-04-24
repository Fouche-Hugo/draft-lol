<script>
    import ChampionDraft from './ChampionDraft.svelte'
    import champions from '../../data/champions.json'

    let inputText = ''
</script>

<section>
    <div class="search-container">
        <input
            class="text-medium"
            type="text"
            placeholder="Search for a champion"
            bind:value={inputText}
        />
    </div>

    <div class="container-champions">
        {#each champions as champion}
            {#if champion.name.toLowerCase().includes(inputText.toLowerCase())}
                <ChampionDraft championName={champion.name} />
            {/if}
        {/each}
    </div>
</section>

<style lang="postcss">
    section {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        gap: var(--gap-s);
        height: 100%;
    }

    .search-container {
        border-radius: var(--border-radius);
        background: var(--grey);

        input {
            border: none;
            background: transparent;
            padding: var(--gap-s);
            width: 100%;
            height: 40px;
            color: var(--white);
            caret-color: var(--white);

            &:focus {
                outline: none;
            }

            &::placeholder {
                opacity: 0.5;
                color: var(--white);
            }
        }
    }

    .container-champions {
        display: grid;
        grid-template-rows: repeat(auto-fill, 80px);
        grid-template-columns: repeat(auto-fill, 80px);
        flex-grow: 1;
        gap: var(--gap-s);
        max-height: 100%;
        overflow-y: scroll;

        @media screen and (max-width: 830px) {
            grid-template-rows: repeat(auto-fill, 60px);
            grid-template-columns: repeat(auto-fill, 60px);
        }

        @media screen and (max-width: 500px) {
            grid-template-rows: repeat(auto-fill, 40px);
            grid-template-columns: repeat(auto-fill, 40px);
        }

        &::-webkit-scrollbar {
            background: transparent;
            width: 15px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: var(--border-radius);
            background: var(--grey);
        }
    }
</style>
